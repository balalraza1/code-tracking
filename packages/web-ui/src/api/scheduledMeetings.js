import { apiBaseUrl, authFetch } from "./utils";

export const createScheduledMeeting = async ({
  topic,
  startTime,
  endTime,
  timezone,
  status,
  sessionId,
  host,
  participants,
}) =>
  await authFetch({
    url: `${apiBaseUrl}/scheduledMeetings/createScheduledMeeting`,
    method: "POST",
    body: {
      topic,
      startTime,
      endTime,
      timezone,
      status,
      sessionId,
      host,
      participants,
    },
  });

export const getScheduledMeetingsByUser = async () =>
  await authFetch({
    url: `${apiBaseUrl}/scheduledMeetings/getScheduledMeetingsByUser`,
    method: "GET",
  });

export const deleteScheduledMeeting = async (meetingId) =>
  await authFetch({
    url: `${apiBaseUrl}/scheduledMeetings/deleteScheduledMeeting`,
    method: "POST",
    body: { meetingId },
  });

export const updateScheduledMeeting = async ({
  meetingId,
  topic,
  startTime,
  endTime,
  timezone,
  status,
  sessionId,
  host,
  participants,
}) =>
  await authFetch({
    url: `${apiBaseUrl}/scheduledMeetings/updateScheduledMeeting`,
    method: "POST",
    body: {
      meetingId,
      topic,
      startTime,
      endTime,
      timezone,
      status,
      sessionId,
      host,
      participants,
    },
  });

export const getScheduledMeeting = async (meetingId, authToken) =>
  await authFetch({
    url: `${apiBaseUrl}/scheduledMeetings/getScheduledMeeting`,
    method: "POST",
    body: { meetingId },
    authToken,
  });
