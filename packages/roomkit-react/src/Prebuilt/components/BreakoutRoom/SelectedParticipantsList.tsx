import React from "react";
import { HMSPeer } from "@100mslive/react-sdk";
import { Box } from "../../../Layout";
import { Text } from "../../../Text";
import Chip from "../Chip";
import { PaddedBox } from "./BreakoutRoomsList";

const SelectedParticipantsList = ({
  selectedParticipants,
}: {
  selectedParticipants?: HMSPeer[];
}) => {
  const peerNameMaxWidth = 200;

  return (
    <PaddedBox
      css={{
        pt: "$4",
        backgroundColor: "$surface_default",
        borderRadius: "$1",
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        pb: "$8",
      }}
    >
      <Text variant="xs" css={{ color: "$secondary_bright" }}>
        Selected participants
      </Text>
      <Box
        css={{
          display: "flex",
          gap: "$2",
          mt: "$2",
        }}
      >
        {selectedParticipants?.map((peer) => (
          <Chip
            key={peer.id}
            content={peer.name}
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
      </Box>
    </PaddedBox>
  );
};

export default SelectedParticipantsList;
