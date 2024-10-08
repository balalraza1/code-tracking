import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { HMSPrebuilt, HMSPrebuiltOptions, HMSPrebuiltProps } from ".";

export default {
  title: "UI Components/Prebuilt",
  component: HMSPrebuilt,
  argTypes: {
    roomCode: { control: { type: "text" }, defaultValue: "" },
    logo: { control: { type: "object" }, defaultValue: "" },
    typography: { control: { type: "object" }, defaultValue: "Roboto" },
    options: { control: { type: "object" }, defaultValue: {} },
    createBreakoutRoom: { control: { type: "function" }, defaultValue: null },
    launchQuiz: { control: { type: "function" }, defaultValue: null },
    endQuiz: { control: { type: "function" }, defaultValue: null },
  },
} as Meta<typeof HMSPrebuilt>;

const PrebuiltRoomCodeStory: StoryFn<typeof HMSPrebuilt> = ({
  roomCode = "",
  logo,
  themes,
  typography,
  options,
  enableBreakoutRooms,
  rolesToCreateBreakoutRooms,
  createBreakoutRoom,
  launchQuiz,
  endQuiz,
}: HMSPrebuiltProps) => {
  return (
    <HMSPrebuilt
      roomCode={roomCode}
      logo={logo}
      options={options}
      themes={themes}
      typography={typography}
      enableBreakoutRooms={enableBreakoutRooms}
      rolesToCreateBreakoutRooms={rolesToCreateBreakoutRooms}
      createBreakoutRoom={createBreakoutRoom}
      launchQuiz={launchQuiz}
      endQuiz={endQuiz}
    />
  );
};

export const Example = PrebuiltRoomCodeStory.bind({});
const endpoints: HMSPrebuiltOptions["endpoints"] = {
  roomLayout: process.env.STORYBOOK_ROOM_LAYOUT_ENDPOINT,
  tokenByRoomCode: process.env.STORYBOOK_TOKEN_BY_ROOM_CODE_ENDPOINT,
  init: process.env.STORYBOOK_INIT_API_ENDPOINT,
};

const hasEndpoints = Object.values(endpoints).some((val) => !!val);

const createBreakoutRoom = (sessionId: string, selectedParticipants: any[]) => {
  console.log("Create breakout room called", sessionId, selectedParticipants);
  return {
    session_id: sessionId,
    breakout_room_details: [
      {
        breakout_room_id: "6645e9eaf1f141ce73bca22a",
        participants: ["abc", "def"],
        timestamp: 1715854450,
        room_code_details: selectedParticipants.map((participant) => ({
          room_code: participant?.role?.includes("teacher")
            ? "pvi-xfhr-wsp"
            : "lbl-dnab-ppt",
          status: "active",
          role: participant?.roleName,
          id: participant?.id,
          name: participant?.name,
        })),
      },
    ],
  };
};

const launchQuiz = () => {
  return new Promise((resolve) => {
    resolve([
      {
        roomId: "2PLYDP",
        preDefinedRoomId: "5d9efc43-a290-40ce-98a1-785c136426e1",
        batchType: null,
        roomName: "W01.M15.S1: How Smart is YouTube?",
        batchId: "2785cf42-012a-4f3d-ab5a-a50fcfae3954",
        batchSessionId: "7dfc4457-375f-4201-8244-951686e06b30",
        roomType: "ASSESSMENT",
        roomAccess: "PRIVATE",
        classId: "UKG-1",
        questionsCategories: null,
        noOfQuestions: 15,
        duration: 15,
        hintView: false,
        solutionView: true,
        reattemptAllowed: false,
        canGoBack: true,
        instantAnswer: false,
        hostId: "content.quiz@expinfi.com",
        hostType: "TRAINER",
        publishStatus: true,
        isActive: true,
        musicAllowed: false,
        liveRanking: false,
        paperDetails: null,
        authorId: "content.quiz@expinfi.com",
        launchTime: "2024-05-25T06:00:04.919+00:00",
        authorType: "TRAINER",
        banner:
          "https://video.bhanzu.com/assessment/c3b5b3bd-31fe-4906-90f0-c621e1baf77c.png",
        timestamp: "2024-05-25T06:00:01.538+00:00",
        userAttemptedCount: null,
        moduleId: null,
      },
    ]);
  });
};

const endQuiz = () => {
  console.log("End Quiz");
};

Example.args = {
  roomCode: process.env.STORYBOOK_SAMPLE_ROOM_CODE,
  options: {
    userName: "",
    userId: "",
    endpoints: hasEndpoints ? endpoints : undefined,
    sessionId: "",
    studentAppURL: "https://app.bhanzu.com",
  },
  typography: {
    font_family: "Roboto",
  },
  enableBreakoutRooms: true,
  rolesToCreateBreakoutRooms: ["teacher"],
  createBreakoutRoom,
  launchQuiz,
  endQuiz,
  screens: {
    conferencing: {
      default: {
        elements: {
          chat: {
            is_overlay: false,
          },
        },
      },
    },
  },
};
