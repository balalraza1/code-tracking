import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { DialogContext } from "../../providers/ModalContext";

const Logout = ({ onCancel, onConfirm }) => {
  const { closeDialog } = useContext(DialogContext);

  return (
    <div className="pt-6 flex justify-between">
      <Button
        type="primary"
        variant="secondary"
        fullWidth={true}
        onClick={onCancel}
      >
        Cancel
      </Button>
      <Button
        type="primary"
        variant="default"
        fullWidth={true}
        onClick={onConfirm}
      >
        Confirm
      </Button>
    </div>
  );
};

export default Logout;
