import React, { Fragment, useState } from "react";
import { HMSPeer, HMSRoleName } from "@100mslive/react-sdk";
import { HorizontalDivider } from "../../../Divider";
import { Box, Flex } from "../../../Layout";
import { ParticipantList } from "../Footer/ParticipantList";
import BreakoutRoomsList, { BreakoutRoomDetails } from "./BreakoutRoomsList";
import CreateBreakoutRoomButton from "./CreateBreakoutRoomButton";
import SelectedParticipantsList from "./SelectedParticipantsList";

const BreakoutRoom = ({
  setActiveRole,
  offStageRoles = [],
}: {
  offStageRoles: HMSRoleName[];
  setActiveRole: (role: string) => void;
}) => {
  const [breakoutRoomDetails, setBreakoutRoomDetails] = useState<
    BreakoutRoomDetails[]
  >([]);
  const [selectedParticipants, setSelectedParticipants] = useState<HMSPeer[]>(
    []
  );

  return (
    <Fragment>
      <Flex
        direction="column"
        css={{
          height: "100%",
          pb: "$12",
          overflowX: "hidden",
          overflowY: "auto",
          gap: "$4",
          backgroundColor: "$surface_dim",
        }}
      >
        <Box
          css={{
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <BreakoutRoomsList breakoutRoomDetails={breakoutRoomDetails} />
        </Box>
        <Box
          css={{
            flex: "1 0 0",
            minHeight: "$100",
            mb: 0,
            pb: 0,
          }}
        >
          <ParticipantList
            offStageRoles={offStageRoles}
            onActive={setActiveRole}
            setSelectedParticipants={setSelectedParticipants}
            selectedParticipants={selectedParticipants}
            noBorderBottomRadius={!!selectedParticipants?.length}
          />
        </Box>
        {selectedParticipants.length !== 0 ? (
          <Fragment>
            <Box css={{ mt: "-$4" }}>
              <HorizontalDivider css={{ m: 0 }} />
              <SelectedParticipantsList
                selectedParticipants={selectedParticipants}
              />
            </Box>
            <Box
              css={{
                position: "absolute",
                bottom: 0,
                right: "$10",
                width: "calc(100% - $16)",
              }}
            >
              <CreateBreakoutRoomButton
                selectedParticipants={selectedParticipants}
                setBreakoutRoomDetails={setBreakoutRoomDetails}
              />
            </Box>
          </Fragment>
        ) : null}
      </Flex>
    </Fragment>
  );
};

export default BreakoutRoom;
