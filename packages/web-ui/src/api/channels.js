import { apiBaseUrl, unauthFetch } from "./utils";

export const getLiveChannels = () =>
  unauthFetch({ url: `${apiBaseUrl}/channels/getLiveChannels` });
