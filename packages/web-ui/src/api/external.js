const externalBaseUrl = process.env.REACT_APP_EXTERNAL_API_BASE_URL;

const externalUnauthFetch = async ({ url, method = "GET", body, signal }) => {
  let result, error;

  try {
    const response = await fetch(url, {
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
      method,
      signal,
    });

    let data;
    if (response.status !== 204) {
      data = await response.json();
    }

    if (response.ok) {
      result = data || "SUCCESS";
    } else {
      // API Errors
      error = data || "ERROR";
    }
  } catch (err) {
    // Other Errors
    error = err;
  }

  if (error) console.error(error);

  return { result, error };
};

const externalAuthFetch = async (
  { url, method = "GET", body = {}, signal },
  token
) => {
  let result, error;

  try {
    const bodyPayload = JSON.stringify({
      ...body,
    });

    const response = await fetch(url, {
      ...(method !== "GET" ? { body: bodyPayload } : {}),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method,
      signal,
    });

    let data;
    if (response.status !== 204) {
      data = await response.json();
    }

    if (response.ok) {
      result = data || "SUCCESS";
    } else {
      // API Errors
      error = data || "ERROR";
    }
  } catch (err) {
    // Other Errors
    error = err;
  }

  return { result, error };
};

export const loginExternal = async ({ email, password }) => {
  return await externalUnauthFetch({
    url: `${externalBaseUrl}/ivs/login`,
    method: "POST",
    body: {
      email,
      password,
    },
  });
};

export const getUserInfoByIdExternal = async (userId, token) => {
  return await externalAuthFetch(
    {
      url: `${externalBaseUrl}/ivs/userInfoById/${userId}`,
      method: "GET",
    },
    token
  );
};

export const validateTokenExternal = async (token) => {
  return await externalAuthFetch({
    url: `${externalBaseUrl}/ivs/validate`,
    method: "POST",
    body: {
      token,
    },
  });
};
