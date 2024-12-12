import { useContext, useEffect, useState } from "react";
import { getLiveChannels } from "../../api/channels";
import { getLiveStages } from "../../api/session";
import Sessions from "../../components/Session";
import { useLocation, useNavigate } from "react-router-dom";
import { UserSettingsContext } from "../../providers/UserSettingsContext";
import NgLogo from "../../assets/Ng-Logo.png";
import { getScheduledMeetingsByUser } from "../../api/scheduledMeetings";
import DialogProvider from "../../providers/ModalContext";
import { DialogContext } from "../../providers/ModalContext";
import Login from "../../components/Login";

export default function Dashboard() {
  const [broadcasts, setBroadcasts] = useState([]);
  const [liveClasses, setLiveClasses] = useState([]);
  const [upcomingSchedules, setUpcomingSchedules] = useState([]);
  const [loadingChannels, setLoadingChannels] = useState(false);
  const [loadingStages, setLoadingStages] = useState(false);
  const [loadingSchedules, setLoadingSchedules] = useState(false);
  const { openDialog, closeDialog } = useContext(DialogContext);
  const { setAuthToken, authToken, username } = useContext(UserSettingsContext);
  const location = useLocation();
  let navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const logoutQuery = searchParams.get("logout");
  if (logoutQuery) {
    setAuthToken(null);
    navigate(`/`);
  }

  useEffect(() => {
    (!username || !authToken) &&
      openDialog({
        header: "Login",
        description:
          "Login in now to start your live broadcast. Access and adjust your streaming settings in the 'Settings' ",
        content: <Login />,
      });
  }, [openDialog]);

  useEffect(() => {
    const fetchLiveChannels = async () => {
      setLoadingChannels(true);
      try {
        const { result } = await getLiveChannels();
        if (result?.channels?.length) {
          setBroadcasts(
            result.channels.filter(
              (channel) => channel.sessionType === "Broadcast"
            )
          );
        } else {
          setBroadcasts([]);
        }
      } catch (error) {
        console.error("Failed to fetch live channels:", error);
      } finally {
        setLoadingChannels(false);
      }
    };

    const fetchLiveStages = async () => {
      setLoadingStages(true);
      try {
        const { result } = await getLiveStages();

        if (result?.stages?.length) {
          setLiveClasses(
            result.stages.filter(
              (channel) =>
                channel.sessionType === "LiveClass" && channel.parentId === ""
            )
          );
        } else {
          setLiveClasses([]);
        }
      } catch (error) {
        console.error("Failed to fetch live stages:", error);
      } finally {
        setLoadingStages(false);
      }
    };

    const fetchUpcomingSchedules = async () => {
      setLoadingSchedules(true);
      try {
        const { result } = await getScheduledMeetingsByUser();
        if (result?.length) {
          setUpcomingSchedules(result);
        } else {
          setUpcomingSchedules([]);
        }
      } catch (error) {
        console.error("Failed to fetch live stages:", error);
      } finally {
        setLoadingSchedules(false);
      }
    };

    fetchLiveChannels();
    fetchLiveStages();
    fetchUpcomingSchedules();
  }, []);
  return (
    <DialogProvider>
      <>
        <div className="top-0 absolute right-0 px-4 md:px-0 py-3">
          <p className="text-xs text-muted-foreground ml-1">Powered By:</p>
          <img src={NgLogo} width={150} alt="Ngenux Logo" />
        </div>
        <div className="w-full items-center justify-center px-4 md:px-12 py-3 md:py-6 pt-16 md:pt-8 lg:pt-0">
          <Sessions
            header="Live Broadcasts"
            description="Stay connected with real-time broadcast events. Streaming now."
            noHeader="No Live Broadcasts Available"
            noDescription="Currently, there are no live broadcast events streaming. Check back later for updates and stay tuned for future live sessions."
            sessions={broadcasts}
            loading={loadingChannels}
          />
        </div>
        <div className="w-full items-center justify-center px-4 md:px-12 py-3 md:py-6">
          <Sessions
            header="Live Podcasts and Classes"
            description="Engage with experts and communities in real-time. Updated with new sessions regularly."
            noHeader="No Live Podcasts or Classes"
            noDescription="At the moment, there are no live podcasts or classes scheduled. Please revisit soon for new and upcoming sessions to engage with experts and communities in real-time."
            type="LiveClass"
            loading={loadingStages}
            sessions={liveClasses}
          />
        </div>
        <div className="w-full items-center justify-center px-4 md:px-12 py-3 md:py-6">
          <Sessions
            header="Upcoming Sessions"
            description="Find upcoming sessions and stay informed about upcoming events."
            noHeader="No Upcoming Sessions"
            noDescription="At the moment, there are no live podcasts or classes scheduled. Please revisit soon for new and upcoming sessions to engage with experts and communities in real-time."
            type="Upcoming"
            loading={loadingSchedules}
            sessions={upcomingSchedules}
          />
        </div>
      </>
    </DialogProvider>
  );
}
