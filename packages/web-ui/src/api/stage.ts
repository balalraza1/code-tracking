import { apiBaseUrl, authFetch } from "./utils";

const controller = new AbortController();
const signal = controller.signal;

export const createStage = async (data) =>
  await authFetch({
    url: `${apiBaseUrl}/stage/createStage`,
    method: "POST",
    body: data,
    signal,
  });

export const joinStage = async (data) =>
  await authFetch({
    url: `${apiBaseUrl}/stage/joinStage`,
    method: "POST",
    body: data,
    signal,
  });

export const disconnectStage = async (data) =>
  await authFetch({
    url: `${apiBaseUrl}/stage/disconnectStage`,
    method: "POST",
    body: data,
    signal,
  });

export const deleteStage = async (data) =>
  await authFetch({
    url: `${apiBaseUrl}/stage/deleteStage`,
    method: "POST",
    body: data,
    signal,
  });

export const startRecording = async (data) =>
  await authFetch({
    url: `${apiBaseUrl}/stage/startRecording`,
    method: "POST",
    body: data,
    signal,
  });

export const stopRecording = async (data) =>
  await authFetch({
    url: `${apiBaseUrl}/stage/stopRecording`,
    method: "POST",
    body: data,
    signal,
  });

export const getActiveStageParticipants = async (data) =>
  await authFetch({
    url: `${apiBaseUrl}/stage/getStageParticipants`,
    method: "POST",
    body: data,
    signal,
  });

export const getParticipantLogs = async (data) =>
  await authFetch({
    url: `${apiBaseUrl}/stage/getParticipantLogs`,
    method: "POST",
    body: data,
    signal,
  });
