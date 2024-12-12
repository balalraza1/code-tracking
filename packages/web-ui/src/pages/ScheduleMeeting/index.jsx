import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import {
  createScheduledMeeting,
  updateScheduledMeeting,
} from "../../api/scheduledMeetings";
import { UserSettingsContext } from "../../providers/UserSettingsContext";
import { useLocation } from "react-router-dom";
import { DialogContext } from "../../providers/ModalContext";
import Login from "../../components/Login";

// Extend dayjs with plugins
dayjs.extend(utc);
dayjs.extend(timezone);

const ScheduleMeeting = () => {
  const { username, authToken } = useContext(UserSettingsContext);
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const { openDialog } = useContext(DialogContext);

  const [meetingData, setMeetingData] = useState(() => {
    if (location.state?.meetingDetails) {
      setIsEditing(true);
      const { meetingDetails } = location.state;
      return {
        title: meetingDetails.topic,
        date: dayjs(meetingDetails.date).format("YYYY-MM-DD"),
        scheduleStartTime: dayjs(meetingDetails.startTime).format("HH:mm"),
        scheduleEndTime: dayjs(meetingDetails.endTime).format("HH:mm"),
        timezone: meetingDetails.timezone,
        sessionId: meetingDetails.sessionId,
        host: meetingDetails.host,
        participants: meetingDetails.participants,
      };
    } else {
      return {
        title: `${username}'s Meeting`,
        date: dayjs().format("YYYY-MM-DD"),
        scheduleStartTime: dayjs()
          .hour(dayjs().hour() + 1)
          .minute(0)
          .format("HH:mm"),
        scheduleEndTime: dayjs()
          .hour(dayjs().hour() + 1)
          .minute(0)
          .add(1, "hour")
          .format("HH:mm"),
        timezone: dayjs.tz.guess(),
        host: username,
        participants: "",
      };
    }
  });

  useEffect(() => {
    (!username || !authToken) &&
      openDialog({
        header: "Login to access",
        // description:
        //   "Sign in now to start your live broadcast. Access and adjust your streaming settings in the 'Settings' ",
        content: <Login />,
      });
  }, [openDialog]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMeetingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      title,
      date,
      scheduleStartTime,
      scheduleEndTime,
      timezone,
      host,
      participants,
    } = meetingData;

    // Combine date with scheduleStartTime and scheduleEndTime
    const startDateTime = `${date}T${scheduleStartTime}`;
    const endDateTime = `${date}T${scheduleEndTime}`;

    // Create dayjs objects with the combined date and time in the selected timezone
    const startDayjs = dayjs.tz(startDateTime, timezone);
    const endDayjs = dayjs.tz(endDateTime, timezone);

    // Format the times in the selected timezone
    // const formattedStartTime = startDayjs.format("YYYY-MM-DDTHH:mm:ss");
    // const formattedEndTime = endDayjs.format("YYYY-MM-DDTHH:mm:ss");

    // Prepare the payload
    const payload = {
      topic: title,
      startTime: startDayjs.format(),
      endTime: endDayjs.format(),
      timezone,
      status: "scheduled",
      sessionId: isEditing ? meetingData.sessionId : null,
      host,
      participants: participants.split(",").map((email) => email.trim()),
    };
    let scheduledSessionId;
    if (isEditing) {
      await updateScheduledMeeting({
        meetingId: location.state.meetingDetails.id,
        ...payload,
      });
      scheduledSessionId = location.state.meetingDetails.id;
    } else {
      const { result } = await createScheduledMeeting(payload);
      scheduledSessionId = result.scheduledSessionId;
    }

    // if (!isEditing) {
    // const meetingId = Math.random().toString(36).substring(7);
    // TODO - does not work for Customer integration
    const url = `/meeting/h/${scheduledSessionId}/JWT/ID`;
    // setMeetingUrl(url);
    window.location.href = url;
    // }
    setIsEditing(false);
  };

  return (
    <div className="w-full px-4 py-6 sm:px-6 md:px-8 lg:px-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="space-y-1 mb-4 sm:mb-0">
          <h2 className="text-2xl font-semibold tracking-tight">
            Schedule Session
          </h2>
        </div>
      </div>
      {/* {isEditing && ( */}
      <div className="bg-white shadow-md rounded px-4 sm:px-6 md:px-8 pt-6 pb-8 mb-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Meeting Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={meetingData.title}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            <div className="w-full sm:w-1/3">
              <label
                htmlFor="date"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={meetingData.date}
                min={dayjs().format("YYYY-MM-DD")}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="w-full sm:w-1/3">
              <label
                htmlFor="scheduleStartTime"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Start Time
              </label>
              <input
                type="time"
                id="scheduleStartTime"
                name="scheduleStartTime"
                value={meetingData.scheduleStartTime}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="w-full sm:w-1/3">
              <label
                htmlFor="scheduleEndTime"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                End Time
              </label>
              <input
                type="time"
                id="scheduleEndTime"
                name="scheduleEndTime"
                value={meetingData.scheduleEndTime}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div className="w-full sm:w-1/3">
              <label
                htmlFor="timezone"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Timezone
              </label>
              <select
                id="timezone"
                name="timezone"
                value={meetingData.timezone}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                {Intl.supportedValuesOf("timeZone").map((tz) => (
                  <option key={tz} value={tz}>
                    {tz}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="w-full sm:w-1/3">
            <label
              htmlFor="host"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Host
            </label>
            <input
              type="text"
              id="host"
              name="host"
              value={meetingData.host}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
              disabled
            />
          </div>
          <div className="w-full sm:w-2/3">
            <label
              htmlFor="participants"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Participants
            </label>
            <input
              type="text"
              id="participants"
              name="participants"
              value={meetingData.participants}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full sm:w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {isEditing ? "Update Meeting" : "Schedule Meeting"}
          </Button>
        </form>
      </div>
      {/* )} */}
    </div>
  );
};

export default ScheduleMeeting;
