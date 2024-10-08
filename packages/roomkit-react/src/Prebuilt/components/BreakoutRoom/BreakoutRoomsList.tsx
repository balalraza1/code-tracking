import React from "react";
import {
  selectLocalPeerID,
  useCustomEvent,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";
import { Accordion } from "../../../Accordion";
import { Button } from "../../../Button";
import { HorizontalDivider } from "../../../Divider";
import { Box, Flex } from "../../../Layout";
import { Text } from "../../../Text";
import { CSS } from "../../../Theme";
import Chip from "../Chip";
import { ToastConfig } from "../Toast/ToastConfig";
import { ToastManager } from "../Toast/ToastManager";
import {
  BREAKOUT_ROOM_CODE,
  CREATE_BREAKOUT_ROOM,
} from "../../common/constants";

export interface RoomCodeDetail {
  customerUserId: string;
  role: string;
  name: string;
  room_code: string;
  status: string;
  id: string;
}

export interface BreakoutRoomDetails {
  breakout_room_id: string;
  participants: string[];
  timestamp: number;
  room_code_details: RoomCodeDetail[];
}
interface BreakoutRoomsListProps {
  breakoutRoomDetails: BreakoutRoomDetails[];
}

const BreakoutRoomsList = ({ breakoutRoomDetails }: BreakoutRoomsListProps) => {
  const hmsActions = useHMSActions();
  const localPeerId = useHMSStore(selectLocalPeerID);

  const peerNameMaxWidth = 150;

  const { sendEvent } = useCustomEvent({
    type: CREATE_BREAKOUT_ROOM,
  });

  const moveToRoom = async (roomDetails: RoomCodeDetail) => {
    const authToken = await hmsActions.getAuthTokenByRoomCode({
      roomCode: roomDetails.room_code,
    });

    try {
      await hmsActions.leave();
      await hmsActions.join({ userName: roomDetails.name, authToken });
      ToastManager.addToast(ToastConfig.BREAK_ROOM.single("Joined Break Room"));

      sessionStorage.setItem(BREAKOUT_ROOM_CODE, roomDetails.room_code);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Flex
      direction="column"
      css={{
        gap: "$8",
        overflowY: "auto",
        overflowX: "hidden",
        backgroundColor: "$surface_default",
        borderRadius: "$1",
        pr: "$10",
        mr: "-$10",
        mt: "$8",
        flex: "1 1 0",
        "& > div:empty ~ .emptyParticipants": {
          display: "flex",
        },
      }}
    >
      <Box>
        <PaddedBox>
          <Text variant="md" css={{ color: "$on_surface_low", m: "$6 0 $3" }}>
            Breakout rooms
          </Text>
        </PaddedBox>
        <HorizontalDivider css={{ mt: "$2", mb: 0 }} />
      </Box>
      <PaddedBox>
        {!breakoutRoomDetails?.length ? (
          <Flex justify="center" align="center" css={{ p: "$8", mt: "-$8" }}>
            <Text variant="sub2" css={{ color: "$secondary_bright" }}>
              No breakout rooms created
            </Text>
          </Flex>
        ) : (
          breakoutRoomDetails?.map((room, index) => (
            <Accordion.Root
              key={room.breakout_room_id}
              type="single"
              collapsible
            >
              <Accordion.Item
                value={room.breakout_room_id}
                css={{
                  "&:hover .role_actions": { visibility: "visible" },
                  mb: "$8",
                }}
              >
                <Accordion.Header
                  iconStyles={{ c: "$on_surface_high" }}
                  css={{
                    textTransform: "capitalize",
                    p: "$6 $8",
                    fontSize: "$sm",
                    fontWeight: "$semiBold",
                    c: "$on_surface_medium",
                    borderRadius: "$1",
                    border: "1px solid $border_bright",
                    '&[data-state="open"]': {
                      borderBottomLeftRadius: 0,
                      borderBottomRightRadius: 0,
                    },
                  }}
                >
                  <Text
                    variant="sm"
                    css={{ fontWeight: "$bold" }}
                  >{`Breakout room - ${index + 1}`}</Text>
                </Accordion.Header>
                <Accordion.Content
                  contentStyles={{
                    border: "1px solid $border_bright",
                    borderTop: "none",
                    borderBottomLeftRadius: "$1",
                    borderBottomRightRadius: "$1",
                    p: "$8",
                  }}
                >
                  <Text variant="xs" css={{ color: "$secondary_bright" }}>
                    Participants
                  </Text>
                  <Flex
                    align="center"
                    css={{
                      display: "row",
                      gap: "$4",
                      flexWrap: "wrap",
                      mt: "$2",
                    }}
                  >
                    {room.room_code_details.map((participant) => (
                      <Chip
                        key={participant.customerUserId}
                        content={participant.name}
                        backgroundColor="$surface_bright"
                        textColor="$on_surface_high"
                        css={{
                          maxWidth: peerNameMaxWidth,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          borderRadius: "$1",
                          p: "$1 $4",
                        }}
                        textCss={{
                          fontWeight: "$regular",
                        }}
                      />
                    ))}
                  </Flex>
                  <Flex css={{ display: "flex", justifyContent: "end" }}>
                    <Button
                      css={{
                        mt: "$2",
                        backgroundColor: "$secondary_dim",
                        color: "$on_primary_high",
                        fontSize: "$sm",
                        p: "$2 $8",
                      }}
                      variant={{ standard: "primary" }}
                      onClick={async () => {
                        // Move all participants to their respective rooms
                        for (const roomDetails of room.room_code_details) {
                          if (roomDetails.id === localPeerId) continue;
                          sendEvent(
                            {
                              roomDetails,
                            },
                            { peerId: roomDetails.id }
                          );
                        }
                        // Move local peer to their respective room
                        const localPeerRoomDetails =
                          room.room_code_details.find(
                            (room) => room.id === localPeerId
                          );
                        if (localPeerRoomDetails)
                          await moveToRoom(localPeerRoomDetails);
                      }}
                    >
                      Launch
                    </Button>
                  </Flex>
                </Accordion.Content>
              </Accordion.Item>
            </Accordion.Root>
          ))
        )}
      </PaddedBox>
    </Flex>
  );
};

export const PaddedBox = ({
  children,
  css,
}: {
  children: React.ReactNode;
  css?: CSS;
}) => <Box css={{ p: "0 $8", ...css }}>{children}</Box>;

export default BreakoutRoomsList;
