import { apiBaseUrl, authFetch } from "./utils";

const controller = new AbortController();
const signal = controller.signal;

export const getChatLogs = async (sessionId) =>
  // @ts-ignore
  await authFetch({
    url: `${apiBaseUrl}/chat/getChatLogs`,
    method: "POST",
    body: { sessionId },
    signal,
  });
