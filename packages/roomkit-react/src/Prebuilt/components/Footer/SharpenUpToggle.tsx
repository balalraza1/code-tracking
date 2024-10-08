import React, { useCallback, useEffect, useRef, useState } from "react";
import { useHMSActions } from "@100mslive/react-sdk";
import { NoEntryIcon, RefreshIcon, RocketIcon } from "@100mslive/react-icons";
import { Box } from "../../../Layout";
import { Tooltip } from "../../../Tooltip";
import { useHMSPrebuiltContext } from "../../AppContext";
import IconButton from "../../IconButton";
import { ToastConfig } from "../Toast/ToastConfig";
import { ToastManager } from "../Toast/ToastManager";
import { QuizState } from "../../common/constants";

export const SharpenUpToggle = () => {
  const hmsActions = useHMSActions();

  const { launchQuiz, endQuiz } = useHMSPrebuiltContext();
  // active room id use used to store room id of the launched quiz
  const activeRoomId = useRef("");
  const [sharpenUpState, setSharpenUpLaunched] = useState<
    QuizState.LAUNCH_QUIZ | QuizState.END_QUIZ | QuizState.RELAUNCH_QUIZ
  >();

  const emitQuizStatus = useCallback(async () => {
    if (
      sharpenUpState === QuizState.END_QUIZ ||
      sharpenUpState === QuizState.RELAUNCH_QUIZ
    ) {
      try {
        const { responseBody = [] } =
          launchQuiz &&
          typeof launchQuiz === "function" &&
          (await launchQuiz());

        if (responseBody && responseBody.length === 0) {
          ToastManager.addToast(
            ToastConfig.SHARPENUP_LAUNCH.single(
              "No quiz available to launch. Please create a quiz."
            )
          );
          setSharpenUpLaunched(undefined);
          return;
        }

        // Take the latest quiz assuming it is the one that is currently running
        const latestQuiz = responseBody[responseBody.length - 1];

        let msgPayload =
          sharpenUpState === QuizState.END_QUIZ
            ? "LAUNCH_QUIZ:"
            : "RELAUNCH_QUIZ:";

        msgPayload += JSON.stringify({
          room_id: latestQuiz.roomId,
          room_type: latestQuiz.roomType,
          predefined_room_id: latestQuiz.preDefinedRoomId,
        });

        activeRoomId.current = latestQuiz.roomId;

        await hmsActions.sendBroadcastMessage(msgPayload);
      } catch (error) {
        console.error("Error ending quiz", error);
      }
    } else if (sharpenUpState === QuizState.LAUNCH_QUIZ) {
      for (let i = 0; i < 3; i++) {
        try {
          await hmsActions.sendBroadcastMessage(QuizState.END_QUIZ);
        } catch (error) {
          console.error("Error ending quiz, attempt", i + 1, error);
        }
        await new Promise((res) => setTimeout(res, 2000)); // Wait for 2 seconds before retrying
      }
      endQuiz && endQuiz({ roomId: activeRoomId.current, status: "false" });
    }
  }, [hmsActions, sharpenUpState, launchQuiz, endQuiz, setSharpenUpLaunched]);

  useEffect(() => {
    emitQuizStatus();
  }, [emitQuizStatus, sharpenUpState]);

  return (
    <Box
      css={{
        position: "relative",
        display: "flex",
        gap: "$2",
      }}
    >
      <Tooltip
        key="shapen-up"
        title={`${
          sharpenUpState === QuizState.LAUNCH_QUIZ ||
          sharpenUpState === undefined
            ? "Launch Quiz"
            : "End Quiz"
        }`}
      >
        <IconButton
          onClick={() => {
            setSharpenUpLaunched((prev) =>
              prev === undefined || prev === QuizState.LAUNCH_QUIZ
                ? QuizState.END_QUIZ
                : QuizState.LAUNCH_QUIZ
            );
          }}
          data-testid="sharpen_up_btn"
        >
          {sharpenUpState === QuizState.LAUNCH_QUIZ ||
          sharpenUpState === undefined ? (
            <RocketIcon />
          ) : (
            <NoEntryIcon />
          )}
        </IconButton>
      </Tooltip>
      {(sharpenUpState === QuizState.END_QUIZ ||
        sharpenUpState === QuizState.RELAUNCH_QUIZ) && (
        <Tooltip key="shapen-up-relaunch" title="Relaunch Quiz">
          <IconButton
            onClick={() => {
              setSharpenUpLaunched((prev) =>
                prev === QuizState.RELAUNCH_QUIZ
                  ? QuizState.END_QUIZ
                  : QuizState.RELAUNCH_QUIZ
              );
            }}
            data-testid="sharpen_up_btn"
          >
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
};
