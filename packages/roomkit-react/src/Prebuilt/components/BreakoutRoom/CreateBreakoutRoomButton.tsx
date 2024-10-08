import React, { useState } from "react";
import { HMSPeer } from "@100mslive/react-sdk";
import { Button } from "../../../Button";
import { useHMSPrebuiltContext } from "../../AppContext";

interface CreateBreakoutRoomButtonProps {
  selectedParticipants: HMSPeer[];
  setBreakoutRoomDetails: (s: any) => void;
}
const CreateBreakoutRoomButton = ({
  selectedParticipants,
  setBreakoutRoomDetails,
}: CreateBreakoutRoomButtonProps) => {
  const [loading, setLoading] = useState(false);
  const { sessionId = "", createBreakoutRoom } = useHMSPrebuiltContext();
  return (
    <Button
      css={{
        mt: "$2",
        backgroundColor: "$secondary_dim",
        color: "$on_primary_high",
        w: "100%",
      }}
      variant={{ standard: "primary" }}
      disabled={selectedParticipants.length === 0}
      loading={loading}
      onClick={async () => {
        if (createBreakoutRoom && typeof createBreakoutRoom === "function") {
          try {
            setLoading(true);
            const breakoutRooms = await createBreakoutRoom(
              sessionId,
              selectedParticipants
            );

            setBreakoutRoomDetails((prev) => [
              ...prev,
              ...breakoutRooms.breakout_room_details,
            ]);
          } catch (e) {
            console.error("Error while creating breakout room", e);
          } finally {
            setLoading(false);
          }
        }
      }}
    >
      Create Break Room
    </Button>
  );
};

export default CreateBreakoutRoomButton;
