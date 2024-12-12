import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const NavigationBlockContext = createContext();

export const NavigationBlockProvider = ({ children }) => {
  const [isBlocking, setIsBlocking] = useState(false);
  const [isAttemptingToNavigate, setIsAttemptingToNavigate] = useState(false);
  const [confirmNavigate, setConfirmNavigate] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const attemptNavigation = useCallback(
    (to) => {
      setIsAttemptingToNavigate(true);
      if (isBlocking && to !== location.pathname) {
        setConfirmNavigate(to);
      } else {
        navigate(to);
        setIsAttemptingToNavigate(false);
      }
    },
    [isBlocking, isAttemptingToNavigate, navigate, location.pathname]
  );

  const confirmNavigation = useCallback(() => {
    if (confirmNavigate) {
      setIsBlocking(false);
      navigate(confirmNavigate);
      setConfirmNavigate(null);
      setIsAttemptingToNavigate(false);
    }
  }, [confirmNavigate, navigate]);

  const cancelNavigation = useCallback(() => {
    setConfirmNavigate(null);
    setIsAttemptingToNavigate(false);
  }, []);

  return (
    <NavigationBlockContext.Provider
      value={{
        isBlocking,
        setIsBlocking,
        attemptNavigation,
        confirmNavigation,
        cancelNavigation,
        isAttemptingToNavigate,
        setIsAttemptingToNavigate
      }}
    >
      {children}
    </NavigationBlockContext.Provider>
  );
};
