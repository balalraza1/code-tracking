import { Toaster } from "@/components/ui/toaster";
import Layout from "../../layout";
import DialogProvider from "../../providers/ModalContext";
import UserSettingsProvider from "../../providers/UserSettingsContext";
import UserDetailsProvider from "../../providers/UserDetailsProvider";
import Modal from "../../components/Modal";
import LocalMediaProvider from "../../providers/LocalMediaContext";
import StageProvider from "../../providers/StageContext";

const IVSPlayer = () => {
  return (
    <LocalMediaProvider>
      <StageProvider>
        <DialogProvider>
          <UserDetailsProvider>
            <UserSettingsProvider>
              <div className="w-full h-full">
                <Toaster />
                <Layout />
                <Modal />
              </div>
            </UserSettingsProvider>
          </UserDetailsProvider>
        </DialogProvider>
      </StageProvider>
    </LocalMediaProvider>
  );
};

export default IVSPlayer;
