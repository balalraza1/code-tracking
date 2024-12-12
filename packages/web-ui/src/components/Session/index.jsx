import { Podcast, Radio } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../../shadcn/components/ui/card";
import { useCallback, useContext } from "react";
import dayjs from "dayjs";
import { USER_ROLES } from "../../constants";
import { UserSettingsContext } from "../../providers/UserSettingsContext";
export default function Sessions({
  header,
  description,
  noHeader,
  noDescription,
  type = "Broadcast",
  sessions = [],
  loading = false,
}) {
  let navigate = useNavigate();
  const { role } = useContext(UserSettingsContext);

  const handleNavigate = useCallback(
    (session) => {
      if (!session) return;

      const basePath =
        session.sessionType === "Broadcast" || session.isStageBroadcast
          ? "/livesession/"
          : "/stagesession/";

      navigate(`${basePath}${session.id}/waiting-room`);
    },
    [navigate]
  );

  const OngoingSessions = ({ sessions }) => {
    return sessions?.map((session) => (
      <div
        key={session.id}
        className="p-2"
        onClick={() => handleNavigate(session)}
      >
        <Card>
          <CardContent className="grid items-center justify-center md:p-6 h-40">
            <div className="text-2xl font-semibold">{session?.username}</div>
            <div className="">
              Started:{" "}
              {new Date(session?.startTime * 1000).toLocaleDateString()},{" "}
              {new Date(session?.startTime * 1000).toLocaleTimeString()}
            </div>
          </CardContent>
        </Card>
      </div>
    ));
  };

  const UpcomingSessions = ({ sessions }) => {
    const roleParam = (() => {
      switch (role) {
        case USER_ROLES.STUDENT:
          return "s";
        case USER_ROLES.TEACHER:
          return "h";
        default:
          return "s";
      }
    })();
    return sessions?.map((session) => (
      <div
        key={session.id}
        className="p-2"
        onClick={() => {
          window.location.href = `/meeting/${roleParam}/${session.id}`;
        }}
      >
        <Card>
          <CardContent className="grid items-center justify-center md:p-6 h-40">
            <div className="text-2xl font-semibold">{session?.topic}</div>
            {/* Host: {session?.hostUsername} */}
            <div className="text-sm">
              {/* Starts: {dayjs(session?.startTime).toString()} */}
              Starts:{" "}
              {dayjs(session?.startTime)
                .tz(session?.timezone)
                .format("DD/MM/YYYY hh:mm A")}{" "}
              IST
            </div>
            <div className="">
              Duration:{" "}
              {dayjs(session?.endTime).diff(
                dayjs(session?.startTime),
                "minute"
              )}{" "}
              minutes
            </div>
          </CardContent>
        </Card>
      </div>
    ));
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-y-1 p-2 ">
          <h2 className="text-2xl font-semibold tracking-tight">
            {header} ({sessions?.length})
          </h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>

      {sessions?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-4 py-2 md:py-4">
          {type !== "Upcoming" ? (
            <OngoingSessions sessions={sessions} />
          ) : (
            <UpcomingSessions sessions={sessions} />
          )}
        </div>
      ) : (
        <div className="grid py-4">
          <div className="flex w-full shrink-0 items-center justify-center rounded-md border border-dashed p-6">
            <div className="mx-auto flex max-w-[800px] flex-col items-center justify-center text-center">
              {type === "Broadcast" ? (
                <Radio size={64} />
              ) : (
                <Podcast size={64} />
              )}
              <h3 className="mt-4 text-lg font-semibold">
                {!loading ? noHeader : "Loading"}
              </h3>
              <p className="mb-4 mt-2 text-sm text-muted-foreground">
                {!loading ? noDescription : ""}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
