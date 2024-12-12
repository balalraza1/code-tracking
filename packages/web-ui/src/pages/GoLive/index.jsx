import GoLiveComponent from "../../components/GoLive";
import BroadcastProvider from "../../providers/BroadcastContext";
import BroadcastLayoutProvider from "../../providers/BroadcastLayoutContext";
import BroadcastMixerProvider from "../../providers/BroadcastMixerContext";
import LocalMediaProvider from "../../providers/LocalMediaContext";
import VirtualBackgroundProvider from "../../providers/VirtualBackgroundContext";
import { Provider as StreamManagerActionsProvider } from "../../providers/StreamManagerActions";
import { PollProvider } from "../../providers/PollContext";

export default function GoLive() {
  return (
    <LocalMediaProvider>
      <VirtualBackgroundProvider>
        <BroadcastProvider>
          <BroadcastMixerProvider>
            <BroadcastLayoutProvider>
              <StreamManagerActionsProvider>
                <PollProvider>
                  <GoLiveComponent />
                </PollProvider>
              </StreamManagerActionsProvider>
            </BroadcastLayoutProvider>
          </BroadcastMixerProvider>
        </BroadcastProvider>
      </VirtualBackgroundProvider>
    </LocalMediaProvider>
  );
}
