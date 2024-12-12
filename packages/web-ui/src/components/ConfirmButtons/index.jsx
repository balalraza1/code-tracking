import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { DialogContext } from "../../providers/ModalContext";

export default function ConfirmButtons({ onConfirm, onCancel }) {
  const { closeDialog } = useContext(DialogContext);

  const handleConfirm = () => {
    closeDialog();
    onConfirm();
  };

  const handleCancel = () => {
    closeDialog();
    onCancel();
  };

  return (
    <div className="flex flex-row justify-between gap-2">
      <Button type="primary" variant="default" onClick={handleConfirm}>
        Leave
      </Button>

      <Button type="primary" variant="outlined" onClick={handleCancel}>
        Cancel
      </Button>
    </div>
  );
}
