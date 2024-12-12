import StageComponent from "../../components/Stage";
import LocalMediaProvider from "../../providers/LocalMediaContext";
import { StageBroadcastProvider } from "../../providers/StageBroadcastContext";
import StageProvider from "../../providers/StageContext";
import StageLayoutProvider from "../../providers/StageLayoutContext";
import { Provider as StreamManagerActionsProvider } from "../../providers/StreamManagerActions";
import AnnotationProvider from "../../providers/AnnotationContext";
import ModalProvider from "../../providers/ModalContext";
import VirtualBackgroundProvider from "../../providers/VirtualBackgroundContext";
import { PollProvider } from "../../providers/PollContext";

export default function StageContainer() {
  return (
    <LocalMediaProvider>
      <StageProvider>
        <StageBroadcastProvider>
          <AnnotationProvider>
            <VirtualBackgroundProvider>
              <StageLayoutProvider>
                <StreamManagerActionsProvider>
                  <PollProvider>
                    <StageComponent />
                  </PollProvider>
                </StreamManagerActionsProvider>
              </StageLayoutProvider>
            </VirtualBackgroundProvider>
          </AnnotationProvider>
        </StageBroadcastProvider>
      </StageProvider>
    </LocalMediaProvider>
  );
}
