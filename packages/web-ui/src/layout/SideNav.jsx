import { useContext, useState } from "react";
import {
  LayoutDashboard,
  Radio,
  Podcast,
  Disc,
  LogOutIcon,
  Menu,
  X,
  CalendarClock,
} from "lucide-react";
import Tooltip from "../components/Tooltip";
import { DialogContext } from "../providers/ModalContext";
import CustomNavLink from "../components/CustomNavLink";
import Logout from "../components/Logout";
import { UserSettingsContext } from "../providers/UserSettingsContext";
import { USER_ROLES } from "../constants";

const navigation = [
  { name: "Dashboard", href: "/", icon: <LayoutDashboard /> },
  { name: "Go Live", href: "/golive", icon: <Radio /> },
  { name: "Real Time Class", href: "/stage", icon: <Podcast /> },
  { name: "Schedule New Meeting", href: "/schedule", icon: <CalendarClock /> },
  { name: "Recordings", href: "/recordings", icon: <Disc /> },
  { name: "Logout", href: "/?logout=true", icon: <LogOutIcon /> },
];

const Sidebar = () => {
  const { username, authToken, role } = useContext(UserSettingsContext);
  const { openDialog, closeDialog } = useContext(DialogContext);
  const [isOpen, setIsOpen] = useState(false);
  const onCancel = () => {
    closeDialog();
  };

  const onConfirm = () => {
    window.location.href = "/?logout=true";
  };

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogoutClick = () => {
    openDialog({
      header: "Are you sure you want to logout",
      description: "Logging out will clear all your session data",
      content: <Logout onCancel={onCancel} onConfirm={onConfirm} />,
    });
  };

  return (
    <div
      className={`fixed top-0 left-0 bottom-0 transition-width duration-300 text-black ${
        isOpen ? "w-1/2 bg-gray-500" : "w-24 md:bg-gray-500"
      }`}
    >
      <div className="flex flex-col justify-between h-full">
        <nav
          className={`flex flex-col ${
            isOpen ? "items-start sm:items-center" : "items-center"
          }`}
        >
          <div className="flex md:hidden w-full">
            <button
              className={`flex w-10 h-10 ${
                isOpen
                  ? "items-center justify-center"
                  : "items-start justify-start"
              }`}
              onClick={handleToggleMenu}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          <div
            className={`px-2 flex flex-col ${
              !isOpen ? "items-center" : "items-start w-full"
            } lg:flex lg:items-start`}
          >
            {navigation.map((item) =>
              isOpen ? (
                <span key={item.name}>
                  {item.name === "Logout" ? (
                    <a
                      href="#"
                      className={`flex items-center ${
                        isOpen ? "justify-start" : "justify-center"
                      }  p-2 text-base font-normal rounded-lg text-white hover:bg-gray-700 my-2 w-full ${
                        !isOpen ? "hidden md:flex" : "sm:hidden"
                      }`}
                      onClick={handleLogoutClick}
                    >
                      {item.icon}
                      <span
                        className={`ml-2 ${
                          isOpen ? "block" : "hidden"
                        } sm:hidden`}
                      >
                        {item.name}
                      </span>
                    </a>
                  ) : (item.name === "Real Time Class" ||
                      item.name === "Go Live") &&
                    role === USER_ROLES.STUDENT ? null : (
                    <CustomNavLink
                      to={item.href}
                      className={`flex items-center ${
                        isOpen ? "justify-start" : "justify-center"
                      } p-2 text-base font-normal rounded-lg text-white hover:bg-gray-700 my-2 w-full ${
                        !isOpen ? "hidden md:block" : "block md:hidden"
                      }`}
                      activeClassName="bg-gray-400"
                    >
                      {item.icon}
                      <span
                        className={`ml-2 ${
                          isOpen ? "block" : "hidden"
                        } block md:hidden`}
                      >
                        {item.name}
                      </span>
                    </CustomNavLink>
                  )}
                </span>
              ) : (
                <Tooltip content={item.name} position="right" key={item.name}>
                  {item.name === "Logout" ? (
                    <a
                      href="#"
                      className={`flex items-center ${
                        isOpen ? "justify-start" : "justify-center"
                      }  p-2 text-base font-normal rounded-lg text-white hover:bg-gray-700 my-2 w-full ${
                        !isOpen ? "hidden md:flex" : "sm:hidden"
                      }`}
                      onClick={handleLogoutClick}
                    >
                      {item.icon}
                      <span
                        className={`ml-2 ${
                          isOpen ? "block" : "hidden"
                        } sm:hidden`}
                      >
                        {item.name}
                      </span>
                    </a>
                  ) : (item.name === "Real Time Class" ||
                      item.name === "Go Live") &&
                    role === USER_ROLES.STUDENT ? null : (
                    <span>
                      <CustomNavLink
                        to={item.href}
                        className={`flex items-center ${
                          isOpen ? "justify-start" : "justify-center"
                        } p-2 text-base font-normal rounded-lg text-white hover:bg-gray-700 my-2 w-full ${
                          !isOpen ? "hidden md:block" : "block md:hidden"
                        }`}
                        activeClassName="bg-gray-400"
                      >
                        {item.icon}
                        <span
                          className={`ml-2 ${
                            isOpen ? "block" : "hidden"
                          } block md:hidden`}
                        >
                          {item.name}
                        </span>
                      </CustomNavLink>
                    </span>
                  )}
                </Tooltip>
              )
            )}{" "}
          </div>
        </nav>
        {!!authToken && (
          <div
            className={`py-4 flex flex-col ${
              isOpen ? "items-start ml-2" : "items-center"
            }`}
          >
            <Tooltip content={username} position="right" key={username}>
              <div
                className={`relative inline-flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full  ${
                  !isOpen ? "hidden md:flex" : "flex md:hidden"
                }`}
              >
                <span className="font-medium text-gray-600 dark:text-gray-300">
                  {username.charAt(0) + username.charAt(1)}
                </span>
                {role === USER_ROLES.TEACHER && (
                  <span className="top-0 left-7 absolute w-4 h-4 bg-blue-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                )}
              </div>
            </Tooltip>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
