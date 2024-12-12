import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import StageSession from "../pages/StageSession";
import { ShieldQuestion } from "lucide-react";
import { Provider as ViewerStreamActionsProvider } from "../providers/ViewerStreamActions";
import Meeting from "../components/Meeting";
import ExternalAuthProvider from "../providers/ExternalAuthProvider";
import LiveSession from "../pages/LiveSession";
import GoLive from "../pages/GoLive";
import Stage from "../pages/Stage";
import Recordings from "../pages/Recordings";
import PlayRecording from "../pages/PlayRecording";
import ScheduleMeeting from "../pages/ScheduleMeeting";
import WaitingRoom from "../components/WaitingRoom";

function AppRouter() {
  return (
    <Routes>
      <Route element={<ViewerStreamActionsProvider />}>
        <Route path="/livesession/:sessionId" element={<LiveSession />} />
        <Route path="/stagesession/:sessionId" element={<StageSession />} />
        <Route
          path="/stagesession/:sessionId/waiting-room"
          element={<WaitingRoom />}
        />
        <Route
          path="/stagesession/:sessionId/parentId/:parentId"
          element={<StageSession />}
        />
      </Route>
      <Route element={<ExternalAuthProvider />}>
        <Route
          path="/meeting/h/:meetingId/:token/:externalUserId"
          element={<Meeting />}
        />
        <Route
          path="/meeting/s/:meetingId/:token/:externalUserId"
          element={<Meeting />}
        />
      </Route>
      <Route path="/golive" element={<GoLive />} />
      <Route path="/stage" element={<Stage />}/>
      <Route path="/schedule" element={<ScheduleMeeting />}/>
      <Route path="/recordings" element={<Recordings />} />
      <Route path='/play-recording' element={<PlayRecording />} />
      <Route path="/" element={<Dashboard/>} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
const NotFoundPage = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="flex w-[500px] shrink-0 items-center justify-center rounded-md border border-dashed p-6">
        <div className="mx-auto flex max-w-[800px] flex-col items-center justify-center text-center">
          <ShieldQuestion size={64} />
          <h3 className="mt-4 text-lg font-semibold">404 Not Found</h3>
          <p className="mb-4 mt-2 text-sm text-muted-foreground">
            The page you're looking for does not exist.
          </p>
        </div>
      </div>
    </div>
  );
};
export default AppRouter;
