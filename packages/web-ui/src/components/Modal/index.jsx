import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { useContext, useEffect, useState } from "react";
import { DialogContext } from "../../providers/ModalContext";

export default function Modal() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { isOpen, modalProps, closeDialog, openDialog } =
    useContext(DialogContext);
  const { header, description, content, footer } = modalProps;

  useEffect(() => {
    setIsOpenModal(isOpen);
  }, [isOpen]);
  
  return (
    <Dialog
      open={isOpenModal}
      onOpenChange={(state) => (state ? openDialog() : closeDialog())}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{header}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {content}
        <DialogFooter>{footer}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
