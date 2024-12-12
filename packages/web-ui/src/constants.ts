// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import ng from "./assets/Ngenux_logo.jpeg";
import bg1 from "./assets/bg1.avif";
import bg2 from "./assets/bg2.avif";
import bg3 from "./assets/bg3.avif";
import bg4 from "./assets/bg4.avif";
import bg5 from "./assets/bg5.avif";
import bg6 from "./assets/bg6.avif";

export const AVATARS = [
  {
    name: "bear",
    src: "https://d39ii5l128t5ul.cloudfront.net/assets/animals_square/bear.png",
  },
  {
    name: "bird",
    src: "https://d39ii5l128t5ul.cloudfront.net/assets/animals_square/bird.png",
  },
  {
    name: "bird2",
    src: "https://d39ii5l128t5ul.cloudfront.net/assets/animals_square/bird2.png",
  },
  {
    name: "dog",
    src: "https://d39ii5l128t5ul.cloudfront.net/assets/animals_square/dog.png",
  },
  {
    name: "giraffe",
    src: "https://d39ii5l128t5ul.cloudfront.net/assets/animals_square/giraffe.png",
  },
  {
    name: "hedgehog",
    src: "https://d39ii5l128t5ul.cloudfront.net/assets/animals_square/hedgehog.png",
  },
  {
    name: "hippo",
    src: "https://d39ii5l128t5ul.cloudfront.net/assets/animals_square/hippo.png",
  },
];

export const STICKERS = [
  {
    name: "cute",
    src: "https://d39ii5l128t5ul.cloudfront.net/assets/chat/v1/sticker-1.png",
  },
  {
    name: "angry",
    src: "https://d39ii5l128t5ul.cloudfront.net/assets/chat/v1/sticker-2.png",
  },
  {
    name: "sad",
    src: "https://d39ii5l128t5ul.cloudfront.net/assets/chat/v1/sticker-3.png",
  },
  {
    name: "happy",
    src: "https://d39ii5l128t5ul.cloudfront.net/assets/chat/v1/sticker-4.png",
  },
  {
    name: "surprised",
    src: "https://d39ii5l128t5ul.cloudfront.net/assets/chat/v1/sticker-5.png",
  },
  {
    name: "cool",
    src: "https://d39ii5l128t5ul.cloudfront.net/assets/chat/v1/sticker-6.png",
  },
  {
    name: "love",
    src: "https://d39ii5l128t5ul.cloudfront.net/assets/chat/v1/sticker-7.png",
  },
  {
    name: "rocket",
    src: "https://d39ii5l128t5ul.cloudfront.net/assets/chat/v1/sticker-8.png",
  },
  {
    name: "confetti",
    src: "https://d39ii5l128t5ul.cloudfront.net/assets/chat/v1/sticker-9.png",
  },
  {
    name: "camera",
    src: "https://d39ii5l128t5ul.cloudfront.net/assets/chat/v1/sticker-10.png",
  },
];

export enum CHAT_EVENTS {
  "RAISE_HAND_REQUEST" = "RAISE_HAND_REQUEST",
  "RAISE_HAND_APPROVE" = "RAISE_HAND_APPROVE",
  "RAISE_HAND_REJECT" = "RAISE_HAND_REJECT",
  "LOWER_HAND_REQUEST" = "LOWER_HAND_REQUEST",
  "REQUEST_APPROVED" = "REQUEST_APPROVED",
  "LEAVE_STAGE" = "LEAVE_STAGE",
}

export enum USER_ROLES {
  MODERATOR = "MODERATOR",
  TEACHER = "TEACHER",
  STUDENT = "STUDENT",
}

export const FEATURES = {
  VIEW_CHAT: "VIEW_CHAT",
  SEND_MESSAGE: "SEND_MESSAGE",
  DELETE_MESSAGE: "DELETE_MESSAGE",
  REPLY_TO_MESSAGE: "REPLY_TO_MESSAGE",
  RAISE_HAND: "RAISE_HAND",
  INVITE_TO_STAGE: "INVITE_TO_STAGE",
  PRIVATE_MESSAGE: "PRIVATE_MESSAGE",
  REMOVE_PARTICIPANT: "REMOVE_PARTICIPANT",
  PARTICIPANT_LIST_COUNT: "PARTICIPANT_LIST_COUNT",
  MODIFY_AV_CONTROLS: "MODIFY_AV_CONTROLS",
  SEE_UPCOMING_SESSIONS: "SEE_UPCOMING_SESSIONS",
  JOIN_CLASS_SESSIONS: "JOIN_CLASS_SESSIONS",
  JOIN_BROADCAST: "JOIN_BROADCAST",
  START_BROADCAST: "START_BROADCAST",
  STOP_BROADCAST: "STOP_BROADCAST",
  START_CLASS_SESSION: "START_CLASS_SESSION",
  STOP_CLASS_SESSION: "STOP_CLASS_SESSION",
  SCHEDULE_MEETING: "SCHEDULE_MEETING",
  CANCEL_MEETING: "CANCEL_MEETING",
  DELETE_MEETING: "DELETE_MEETING",
  UPDATE_MEETING: "UPDATE_MEETING",
  JOIN_MEETING: "JOIN_MEETING",
  START_MEETING: "START_MEETING",
  ADD_VIRTUAL_BACKGROUND: "ADD_VIRTUAL_BACKGROUND",
  REMOVE_VIRTUAL_BACKGROUND: "REMOVE_VIRTUAL_BACKGROUND",
  START_BREAKOUT_ROOM: "START_BREAKOUT_ROOM",
  STOP_BREAKOUT_ROOM: "STOP_BREAKOUT_ROOM",
  NOTICE: "NOTICE",
  POLL: "POLL",
  QUIZ: "QUIZ",
  MIC_CONTROL: "MIC_CONTROL",
  CAMERA_CONTROL: "CAMERA_CONTROL",
  START_WHITEBOARDING: "START_WHITEBOARDING",
  STOP_WHITEBOARDING: "STOP_WHITEBOARDING",
  START_SCREENSHARE: "START_SCREENSHARE",
  STOP_SCREENSHARE: "STOP_SCREENSHARE",
  UPLOAD_PDF: "UPLOAD_PDF",
  PAGINATION: "PAGINATION",
  ANNOTATE_SHAPES: "ANNOTATE_SHAPES",
  ANNOTATE_SCRIBBLE: "ANNOTATE_SCRIBBLE",
  CLEAR_ANNOTATIONS: "CLEAR_ANNOTATIONS",
  DOWNLOAD_PAGE: "DOWNLOAD_PAGE",
  CHANGE_COLOR: "CHANGE_COLOR",
  PLAY_RECORDING: "PLAY_RECORDING",
  RECORDING_DETAILS: "RECORDING_DETAILS",
  MUTE_ALL: "MUTE_ALL",
};

const rolePermissions = {
  [USER_ROLES.MODERATOR]: {
    features: {
      [FEATURES.VIEW_CHAT]: true,
      [FEATURES.SEND_MESSAGE]: true,
      [FEATURES.DELETE_MESSAGE]: true,
      [FEATURES.REPLY_TO_MESSAGE]: true,
      [FEATURES.RAISE_HAND]: true,
      [FEATURES.INVITE_TO_STAGE]: true,
      [FEATURES.PRIVATE_MESSAGE]: true,
      [FEATURES.REMOVE_PARTICIPANT]: true,
      [FEATURES.PARTICIPANT_LIST_COUNT]: true,
      [FEATURES.MODIFY_AV_CONTROLS]: true,
      [FEATURES.SEE_UPCOMING_SESSIONS]: true,
      [FEATURES.JOIN_CLASS_SESSIONS]: true,
      [FEATURES.JOIN_BROADCAST]: true,
      [FEATURES.START_BROADCAST]: true,
      [FEATURES.STOP_BROADCAST]: true,
      [FEATURES.START_CLASS_SESSION]: true,
      [FEATURES.STOP_CLASS_SESSION]: true,
      [FEATURES.SCHEDULE_MEETING]: true,
      [FEATURES.CANCEL_MEETING]: true,
      [FEATURES.DELETE_MEETING]: true,
      [FEATURES.UPDATE_MEETING]: true,
      [FEATURES.JOIN_MEETING]: true,
      [FEATURES.START_MEETING]: true,
      [FEATURES.ADD_VIRTUAL_BACKGROUND]: true,
      [FEATURES.REMOVE_VIRTUAL_BACKGROUND]: true,
      [FEATURES.START_BREAKOUT_ROOM]: true,
      [FEATURES.STOP_BREAKOUT_ROOM]: true,
      [FEATURES.NOTICE]: true,
      [FEATURES.POLL]: true,
      [FEATURES.QUIZ]: true,
      [FEATURES.MIC_CONTROL]: true,
      [FEATURES.CAMERA_CONTROL]: true,
      [FEATURES.START_WHITEBOARDING]: true,
      [FEATURES.STOP_WHITEBOARDING]: true,
      [FEATURES.START_SCREENSHARE]: true,
      [FEATURES.STOP_SCREENSHARE]: true,
      [FEATURES.UPLOAD_PDF]: true,
      [FEATURES.PAGINATION]: true,
      [FEATURES.ANNOTATE_SHAPES]: true,
      [FEATURES.ANNOTATE_SCRIBBLE]: true,
      [FEATURES.CLEAR_ANNOTATIONS]: true,
      [FEATURES.DOWNLOAD_PAGE]: true,
      [FEATURES.CHANGE_COLOR]: true,
      [FEATURES.PLAY_RECORDING]: true,
      [FEATURES.RECORDING_DETAILS]: true,
      [FEATURES.MUTE_ALL]: true,
    },
  },
  [USER_ROLES.TEACHER]: {
    features: {
      [FEATURES.VIEW_CHAT]: true,
      [FEATURES.SEND_MESSAGE]: true,
      [FEATURES.DELETE_MESSAGE]: true,
      [FEATURES.REPLY_TO_MESSAGE]: true,
      [FEATURES.RAISE_HAND]: true,
      [FEATURES.INVITE_TO_STAGE]: true,
      [FEATURES.PRIVATE_MESSAGE]: true,
      [FEATURES.REMOVE_PARTICIPANT]: true,
      [FEATURES.PARTICIPANT_LIST_COUNT]: true,
      [FEATURES.MODIFY_AV_CONTROLS]: true,
      [FEATURES.SEE_UPCOMING_SESSIONS]: true,
      [FEATURES.JOIN_CLASS_SESSIONS]: true,
      [FEATURES.JOIN_BROADCAST]: true,
      [FEATURES.START_BROADCAST]: true,
      [FEATURES.STOP_BROADCAST]: true,
      [FEATURES.START_CLASS_SESSION]: true,
      [FEATURES.STOP_CLASS_SESSION]: true,
      [FEATURES.SCHEDULE_MEETING]: true,
      [FEATURES.CANCEL_MEETING]: true,
      [FEATURES.DELETE_MEETING]: true,
      [FEATURES.UPDATE_MEETING]: true,
      [FEATURES.JOIN_MEETING]: true,
      [FEATURES.START_MEETING]: true,
      [FEATURES.ADD_VIRTUAL_BACKGROUND]: true,
      [FEATURES.REMOVE_VIRTUAL_BACKGROUND]: true,
      [FEATURES.START_BREAKOUT_ROOM]: true,
      [FEATURES.STOP_BREAKOUT_ROOM]: true,
      [FEATURES.NOTICE]: true,
      [FEATURES.POLL]: true,
      [FEATURES.QUIZ]: true,
      [FEATURES.MIC_CONTROL]: true,
      [FEATURES.CAMERA_CONTROL]: true,
      [FEATURES.START_WHITEBOARDING]: true,
      [FEATURES.STOP_WHITEBOARDING]: true,
      [FEATURES.START_SCREENSHARE]: true,
      [FEATURES.STOP_SCREENSHARE]: true,
      [FEATURES.UPLOAD_PDF]: true,
      [FEATURES.PAGINATION]: true,
      [FEATURES.ANNOTATE_SHAPES]: true,
      [FEATURES.ANNOTATE_SCRIBBLE]: true,
      [FEATURES.CLEAR_ANNOTATIONS]: true,
      [FEATURES.DOWNLOAD_PAGE]: true,
      [FEATURES.CHANGE_COLOR]: true,
      [FEATURES.PLAY_RECORDING]: true,
      [FEATURES.RECORDING_DETAILS]: true,
      [FEATURES.MUTE_ALL]: true,
    },
  },
  [USER_ROLES.STUDENT]: {
    features: {
      [FEATURES.VIEW_CHAT]: true,
      [FEATURES.SEND_MESSAGE]: true,
      [FEATURES.DELETE_MESSAGE]: true,
      [FEATURES.REPLY_TO_MESSAGE]: true,
      [FEATURES.RAISE_HAND]: true,
      [FEATURES.INVITE_TO_STAGE]: true,
      [FEATURES.PRIVATE_MESSAGE]: true,
      [FEATURES.REMOVE_PARTICIPANT]: true,
      [FEATURES.PARTICIPANT_LIST_COUNT]: true,
      [FEATURES.MODIFY_AV_CONTROLS]: true,
      [FEATURES.SEE_UPCOMING_SESSIONS]: true,
      [FEATURES.JOIN_CLASS_SESSIONS]: true,
      [FEATURES.JOIN_BROADCAST]: true,
      [FEATURES.START_BROADCAST]: true,
      [FEATURES.STOP_BROADCAST]: true,
      [FEATURES.START_CLASS_SESSION]: true,
      [FEATURES.STOP_CLASS_SESSION]: true,
      [FEATURES.SCHEDULE_MEETING]: true,
      [FEATURES.CANCEL_MEETING]: true,
      [FEATURES.DELETE_MEETING]: true,
      [FEATURES.UPDATE_MEETING]: true,
      [FEATURES.JOIN_MEETING]: true,
      [FEATURES.START_MEETING]: true,
      [FEATURES.ADD_VIRTUAL_BACKGROUND]: true,
      [FEATURES.REMOVE_VIRTUAL_BACKGROUND]: true,
      [FEATURES.START_BREAKOUT_ROOM]: true,
      [FEATURES.STOP_BREAKOUT_ROOM]: true,
      [FEATURES.NOTICE]: true,
      [FEATURES.POLL]: true,
      [FEATURES.QUIZ]: true,
      [FEATURES.MIC_CONTROL]: true,
      [FEATURES.CAMERA_CONTROL]: true,
      [FEATURES.START_WHITEBOARDING]: false,
      [FEATURES.STOP_WHITEBOARDING]: false,
      [FEATURES.START_SCREENSHARE]: false,
      [FEATURES.STOP_SCREENSHARE]: false,
      [FEATURES.UPLOAD_PDF]: true,
      [FEATURES.PAGINATION]: true,
      [FEATURES.ANNOTATE_SHAPES]: true,
      [FEATURES.ANNOTATE_SCRIBBLE]: true,
      [FEATURES.CLEAR_ANNOTATIONS]: true,
      [FEATURES.DOWNLOAD_PAGE]: true,
      [FEATURES.CHANGE_COLOR]: true,
      [FEATURES.PLAY_RECORDING]: true,
      [FEATURES.RECORDING_DETAILS]: true,
      [FEATURES.MUTE_ALL]: false,
    },
  },
};

// TODO need to move this inside Auth Context
export function hasAccess(userRole: String, type: String, name: String) {
  if (
    !rolePermissions[`${userRole}`] ||
    !rolePermissions[`${userRole}`][type]
  ) {
    return false;
  }

  return !!rolePermissions[`${userRole}`][type][name];
}

export const userRolesToDisplay = [
  {
    label: "Student",
    value: USER_ROLES.STUDENT,
  },
  {
    label: "Teacher",
    value: USER_ROLES.TEACHER,
  },
  {
    label: "Moderator",
    value: USER_ROLES.MODERATOR,
  },
];

export const STREAM_ACTION_NAME = {
  QUIZ: "quiz",
  CELEBRATION: "celebration",
  NOTICE: "notice",
  POLL: "poll",
  PRODUCT: "product",
  AMAZON_PRODUCT: "amazon_product",
};

export const EXTRA_TIME_TO_WAIT_FOR_END_POLL_EVENT = 2000; // ms
export const LOCALSTORAGE_ENABLED_STREAM_ACTIONS = [
  STREAM_ACTION_NAME.QUIZ,
  STREAM_ACTION_NAME.CELEBRATION,
  STREAM_ACTION_NAME.NOTICE,
  STREAM_ACTION_NAME.PRODUCT,
  STREAM_ACTION_NAME.POLL,
];

export const QUIZ_DATA_KEYS = {
  QUESTION: "question",
  ANSWERS: "answers",
  CORRECT_ANSWER_INDEX: "correctAnswerIndex",
  DURATION: "duration",
};

export const PRODUCT_DATA_KEYS = {
  TITLE: "title",
  PRICE: "price",
  IMAGE_URL: "imageUrl",
  DESCRIPTION: "description",
};

export const POLL_DATA_KEYS = {
  QUESTION: "question",
  ANSWERS: "answers",
  DURATION: "duration",
};

export const NOTICE_DATA_KEYS = {
  TITLE: "title",
  MESSAGE: "message",
  DURATION: "duration",
};

export const AMAZON_PRODUCT_DATA_KEYS = {
  SELECTED_PRODUCT_INDEX: "selectedProductIndex",
  SELECTED_SORT_CATEGORY: "selectedSortCategory",
  KEYWORD: "keyword",
  PRODUCT_CHOICE: "productChoice",
  PRODUCT_OPTIONS: "productOptions",
  PRODUCT_PAGE_NUMBER: "productPageNumber",
};

export const STREAM_MANAGER_ACTION_LIMITS = {
  [STREAM_ACTION_NAME.QUIZ]: {
    [QUIZ_DATA_KEYS.ANSWERS]: {
      min: 3, // count
      max: 5, // count
      maxCharLength: 128, // TENTATIVE
    },
    [QUIZ_DATA_KEYS.QUESTION]: { maxCharLength: 256 }, // TENTATIVE
    [QUIZ_DATA_KEYS.DURATION]: { min: 5, max: 30 }, // seconds
  },
  [STREAM_ACTION_NAME.PRODUCT]: {
    [PRODUCT_DATA_KEYS.TITLE]: { maxCharLength: 32 },
    [PRODUCT_DATA_KEYS.PRICE]: { maxCharLength: 10 },
    [PRODUCT_DATA_KEYS.IMAGE_URL]: { maxCharLength: 256 }, // TENTATIVE
    [PRODUCT_DATA_KEYS.DESCRIPTION]: { maxCharLength: 256 },
  },
  [STREAM_ACTION_NAME.NOTICE]: {
    [NOTICE_DATA_KEYS.TITLE]: { maxCharLength: 24 },
    [NOTICE_DATA_KEYS.MESSAGE]: { maxCharLength: 256 },
    [NOTICE_DATA_KEYS.DURATION]: { min: 5, max: 30 }, // seconds
  },
  [STREAM_ACTION_NAME.CELEBRATION]: {},
  [STREAM_ACTION_NAME.AMAZON_PRODUCT]: {
    [AMAZON_PRODUCT_DATA_KEYS.KEYWORD]: { maxCharLength: 150 },
  },
  [STREAM_ACTION_NAME.POLL]: {
    [POLL_DATA_KEYS.ANSWERS]: {
      min: 2, // count
      max: 5, // count
      maxCharLength: 40,
    },
    [POLL_DATA_KEYS.QUESTION]: { maxCharLength: 256 }, // TENTATIVE
    [POLL_DATA_KEYS.DURATION]: { min: 10, max: 120 }, // seconds
  },
};

export const DEFAULT_CELEBRATION_DURATION = 10; // seconds

export const DEFAULT_SELECTED_SORT_CATEGORY = "Relevance";
export const CHANNEL_DATA_REFRESH_INTERVAL = 5000; // 5 seconds

export const CHAT_MESSAGE_EVENT_TYPES = {
  SEND_MESSAGE: "SEND_MESSAGE",
  START_POLL: "START_POLL",
  END_POLL: "END_POLL",
  SUBMIT_VOTE: "SUBMIT_VOTE",
  SEND_VOTE_STATS: "SEND_VOTE_STATS",
  HEART_BEAT: "HEART_BEAT",
};
export const CHAT_LOG_LEVELS = {
  DEBUG: "debug",
  INFO: "info",
  ERROR: "error",
};
export const MAX_RECONNECT_ATTEMPTS = 7;

export const backgrounds = [ng, bg1, bg2, bg3, bg4, bg5, bg6];

// export const backgrounds = [
//   "https://plus.unsplash.com/premium_photo-1677474827615-31ea6fa13efe?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   "https://images.unsplash.com/photo-1558274803-5addf237d6dd?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   "https://images.unsplash.com/photo-1558882224-dda166733046?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   "https://images.unsplash.com/photo-1562664377-709f2c337eb2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
// ];

export const MAX_STAGE_PARTICIPANTS = 12;

export const DEFAULT_ASPECT_RATIO = 16 / 9;
export const DRAW_ACTIONS = {
  SELECT: "SELECT",
  RECTANGLE: "RECTANGLE",
  CIRCLE: "CIRCLE",
  SCRIBBLE: "SCRIBBLE",
  ARROW: "ARROW",
};
export const PROFILE_COLORS = [
  "blue",
  "green",
  "lavender",
  "purple",
  "salmon",
  "turquoise",
  "yellow",
];
