import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Outlet, useOutletContext, useParams } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import {
  getUserInfoByIdExternal,
  validateTokenExternal,
} from "../api/external";
import { UserSettingsContext } from "./UserSettingsContext";
import { getToken } from "../api/session";

const ExternalAuthContext = createContext(null);
ExternalAuthContext.displayName = "ExternalAuthContext";

const InvalidToken = () => (
  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
    <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
      <div className="flex flex-col items-center">
        <div className="text-gray-600 text-center mb-6">
          <div className="mb-2">Your meeting link has expired.</div>
          <div>
            Please contact support at{" "}
            <a
              href="mailto:contact@ngenux.com"
              className="text-blue-500 hover:underline"
            >
              contact@ngenux.com
            </a>
          </div>
        </div>

        <a
          href={process.env.REACT_APP_REDIRECT_URL}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
        >
          Go to Home
        </a>
      </div>
    </div>
  </div>
);
export const ExternalAuthProvider = () => {
  const { token, externalUserId } = useParams();
  // const [jwtToken, setJwtToken] = useLocalStorage("externalJwtToken", "", true);
  const { setUsername, authToken, setAuthToken, setRole } =
    useContext(UserSettingsContext);
  const outletCtx = useOutletContext();
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const validateToken = useCallback(
    async (token) => {
      if(token === "JWT" && externalUserId === "ID") { // TODO CONFIGURATION
        setRole(window.location.href.includes("/h/") ? "TEACHER" : "STUDENT");
        setAuthToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJJVlMgSldUIFRva2VuIElzc3VlciIsImlhdCI6MTczMDAzMjIwMywiZXhwIjoxNzYxNTY4MjAzLCJhdWQiOiJodHRwczovL25nZW51eC5jb20iLCJzdWIiOiJpemp1biIsImdpdmVuTmFtZSI6IlN0dWRlbnQiLCJzdXJuYW1lIjoiU3R1ZGVudCIsImVtYWlsIjoibmloYWx5YmFpZ0BuZ2VudXguY29tIiwicm9sZSI6IlRFQUNIRVIiLCJ1c2VybmFtZSI6Iml6anVuIn0.OZ1HnKcW0UxHvLzYzu1C7Aln4R58lq5Nbj1fMKT8Qqk"); // TODO magic token
        setIsTokenValid(true);
        setIsLoading(false);
        return;
      }
      if (!token || !externalUserId) return;
      setIsLoading(true);
      const { result } = await validateTokenExternal(token);
      if (result?.message === "Token is valid") {
        // setJwtToken(token);

        const {
          result: { data: externalUser },
        } = await getUserInfoByIdExternal(externalUserId, token);
        setUsername(externalUser.user_name.replaceAll(" ", "_"));
        setRole(externalUser.role.toUpperCase() ?? "STUDENT");
        const {
          result: { token: authToken },
        } = await getToken({
          username: externalUser.user_name.replaceAll(" ", "_"),
          sub: externalUser.user_name.replaceAll(" ", "_"),
          role: externalUser.role.toUpperCase() ?? "STUDENT",
          givenName: "",
          surname: "",
          email: externalUser.email,
        });

        setAuthToken(authToken);
        setIsTokenValid(true);
      } else {
        console.error("Invalid token");
        setIsTokenValid(false);
      }
      setIsLoading(false);
    },
    [externalUserId, setUsername, setRole, setAuthToken]
  );

  useEffect(() => {
    validateToken(decodeURIComponent(token));
  }, [token, validateToken]);

  const value = useMemo(
    () => ({
      token,
      // jwtToken,
      // setJwtToken,
    }),
    [token]
  );
  if (isLoading) {
    return null;
  }

  if (!authToken) {
    return (
      <ExternalAuthContext.Provider
        value={value}
      ></ExternalAuthContext.Provider>
    );
  }

  return (
    <ExternalAuthContext.Provider value={value}>
      {isTokenValid ? <Outlet context={outletCtx} /> : <InvalidToken />}
    </ExternalAuthContext.Provider>
  );
};

export const useExternalAuth = () => useContext(ExternalAuthContext);

export default ExternalAuthProvider;
