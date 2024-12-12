import { apiBaseUrl, authFetch, unauthFetch } from "./utils";

const controller = new AbortController();
const signal = controller.signal;

export const startSession = async (sessionType, groupId, parentId) =>
  await authFetch({
    url: `${apiBaseUrl}/session/startSession`,
    method: "POST",
    body: {
      sessionType,
      stageGroupId: groupId ?? "",
      parentId: parentId ?? "",
    },
    signal,
  });

export const getToken = async (data) =>
  await unauthFetch({
    url: `${apiBaseUrl}/session/getToken`,
    method: "POST",
    body: data,
    signal,
  });

export const getLiveStages = async () =>
  await unauthFetch({ url: `${apiBaseUrl}/session/getLiveStages` });

export const endSession = async (sessionId) =>
  await authFetch({
    url: `${apiBaseUrl}/session/endSession`,
    method: "POST",
    body: { sessionId },
    signal,
  });

export const getSessionDetails = async (sessionId) =>
  await unauthFetch({
    url: `${apiBaseUrl}/session/getSession`,
    method: "POST",
    body: { sessionId },
    signal,
  });

export const enableStageBroadcast = async (sessionId) =>
  await authFetch({
    url: `${apiBaseUrl}/session/toggleStageBroadcast`,
    method: "POST",
    body: { sessionId, isStageBroadcast: true },
    signal,
  });

export const disableStageBroadcast = async (sessionId) =>
  await authFetch({
    url: `${apiBaseUrl}/session/toggleStageBroadcast`,
    method: "POST",
    body: { sessionId, isStageBroadcast: false },
    signal,
  });

export const startRecording = async (sessionId, sessionType) =>
  await authFetch({
    url: `${apiBaseUrl}/session/startRecording`,
    method: "POST",
    body: { sessionId, sessionType },
    signal,
  });

export const stopRecording = async (sessionId, sessionType) =>
  await authFetch({
    url: `${apiBaseUrl}/session/stopRecording`,
    method: "POST",
    body: { sessionId, sessionType },
    signal,
  });

export const addParticipant = async (sessionId, username) => {
  return await authFetch({
    url: `${apiBaseUrl}/session/addParticipant`,
    method: "POST",
    body: { sessionId, username },
    signal,
  });
};

export const removeParticipant = async (sessionId, username) => {
  return await authFetch({
    url: `${apiBaseUrl}/session/removeParticipant`,
    method: "POST",
    body: { sessionId, username },
    signal,
  });
};
