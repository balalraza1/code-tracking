import React, { createContext, useCallback, useState, useMemo } from "react";
import useContextHook from "../hooks/useContextHook";

const DialogContext = createContext();
DialogContext.displayName = 'Modal';

export const MODAL_TYPE = {
  STREAM_MANAGER_ACTION: 'STREAM_MANAGER_ACTION'
};

const DialogProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalProps, setModalProps] = useState({
    header: "",
    description: "",
    content: null,
    footer: null,
  });

  const openDialog = useCallback((props = {}) => {
    console.log(props)
    setModalProps(props);
    setIsOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setModalProps({
      header: "",
      description: "",
      content: null,
      footer: null,
    });
    setIsOpen(false);
  }, []);

  const contextValue = useMemo(
    () => ({
      isOpen,
      modalProps,
      openDialog,
      closeDialog,
    }),
    [isOpen, modalProps, openDialog, closeDialog]
  );

  return (
    <DialogContext.Provider value={contextValue}>
      {children}
    </DialogContext.Provider>
  );
};
export default DialogProvider;
export { DialogContext };
export const useModal = () => useContextHook(DialogContext);
