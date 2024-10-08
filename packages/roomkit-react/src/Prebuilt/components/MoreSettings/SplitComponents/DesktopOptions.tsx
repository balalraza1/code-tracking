import React, { Fragment, useState } from "react";
import {
  ConferencingScreen,
  DefaultConferencingScreen_Elements,
  HLSLiveStreamingScreen_Elements,
} from "@100mslive/types-prebuilt";
import { selectLocalPeerID, useHMSStore } from "@100mslive/react-sdk";
import {
  HamburgerMenuIcon,
  QuizActiveIcon,
  QuizIcon,
  SettingsIcon,
} from "@100mslive/react-icons";
import { Dropdown, Text, Tooltip } from "../../../..";
import IconButton from "../../../IconButton";
// @ts-ignore: No implicit any
import { RoleChangeModal } from "../../RoleChangeModal";
// @ts-ignore: No implicit any
import SettingsModal from "../../Settings/SettingsModal";
// @ts-ignore: No implicit any
import StartRecording from "../../Settings/StartRecording";
// @ts-ignore: No implicit any
import { StatsForNerds } from "../../StatsForNerds";
// @ts-ignore: No implicit any
import { BulkRoleChangeModal } from "../BulkRoleChangeModal";
// @ts-ignore: No implicit any
import { FullScreenItem } from "../FullScreenItem";
import { MuteAllModal } from "../MuteAllModal";
import { usePollViewToggle } from "../../AppData/useSidepane";
import { useShowPolls } from "../../AppData/useUISettings";
// @ts-ignore: No implicit any
import { useDropdownList } from "../../hooks/useDropdownList";
import { useUnreadPollQuizPresent } from "../../hooks/useUnreadPollQuizPresent";

const MODALS = {
  CHANGE_NAME: "changeName",
  SELF_ROLE_CHANGE: "selfRoleChange",
  MORE_SETTINGS: "moreSettings",
  START_RECORDING: "startRecording",
  DEVICE_SETTINGS: "deviceSettings",
  STATS_FOR_NERDS: "statsForNerds",
  BULK_ROLE_CHANGE: "bulkRoleChange",
  MUTE_ALL: "muteAll",
  EMBED_URL: "embedUrl",
};

export const DesktopOptions = ({
  screenType,
}: {
  elements: DefaultConferencingScreen_Elements &
    HLSLiveStreamingScreen_Elements;
  screenType: keyof ConferencingScreen;
}) => {
  const localPeerId = useHMSStore(selectLocalPeerID);
  const [openModals, setOpenModals] = useState(new Set());
  const { showPolls } = useShowPolls();
  const togglePollView = usePollViewToggle();
  const { unreadPollQuiz, setUnreadPollQuiz } = useUnreadPollQuizPresent();

  useDropdownList({ open: openModals.size > 0, name: "MoreSettings" });

  const updateState = (modalName: string, value: boolean) => {
    setOpenModals((modals) => {
      const copy = new Set(modals);
      if (value) {
        // avoiding extra set state trigger which removes currently open dialog by clearing set.
        copy.clear();
        copy.add(modalName);
      } else {
        copy.delete(modalName);
      }
      return copy;
    });
  };

  return (
    <Fragment>
      <Dropdown.Root
        open={openModals.has(MODALS.MORE_SETTINGS)}
        onOpenChange={(value) => updateState(MODALS.MORE_SETTINGS, value)}
        modal={false}
      >
        <Tooltip title="More options">
          <Dropdown.Trigger asChild data-testid="more_settings_btn">
            <IconButton>
              <HamburgerMenuIcon />
            </IconButton>
          </Dropdown.Trigger>
        </Tooltip>

        <Dropdown.Content
          sideOffset={5}
          align="end"
          css={{
            py: "$0",
            maxHeight: "unset",
            "@md": { w: "$64" },
            "div[role='separator']:first-child": {
              display: "none",
            },
          }}
        >
          <FullScreenItem />
          {/* polls and quizes */}
          {showPolls && (
            <Dropdown.Item
              onClick={() => {
                togglePollView();
                // setOpenOptionsSheet(false);
                setUnreadPollQuiz(false);
              }}
              data-testid="polls_btn"
            >
              {unreadPollQuiz ? <QuizActiveIcon /> : <QuizIcon />}
              <Text variant="sm" css={{ ml: "$4", color: "$on_surface_high" }}>
                Polls & Quizzes
              </Text>
            </Dropdown.Item>
          )}
          <Dropdown.ItemSeparator css={{ mx: 0 }} />
          <Dropdown.Item
            onClick={() => updateState(MODALS.DEVICE_SETTINGS, true)}
            data-testid="device_settings_btn"
          >
            <SettingsIcon />
            <Text variant="sm" css={{ ml: "$4" }}>
              Settings
            </Text>
          </Dropdown.Item>
        </Dropdown.Content>
      </Dropdown.Root>
      {openModals.has(MODALS.BULK_ROLE_CHANGE) && (
        <BulkRoleChangeModal
          onOpenChange={(value: boolean) =>
            updateState(MODALS.BULK_ROLE_CHANGE, value)
          }
        />
      )}
      {openModals.has(MODALS.MUTE_ALL) && (
        <MuteAllModal
          onOpenChange={(value: boolean) => updateState(MODALS.MUTE_ALL, value)}
        />
      )}

      {openModals.has(MODALS.START_RECORDING) && (
        <StartRecording
          open
          onOpenChange={(value: boolean) =>
            updateState(MODALS.START_RECORDING, value)
          }
        />
      )}
      {openModals.has(MODALS.DEVICE_SETTINGS) && (
        <SettingsModal
          open
          onOpenChange={(value: boolean) =>
            updateState(MODALS.DEVICE_SETTINGS, value)
          }
          screenType={screenType}
        />
      )}
      {openModals.has(MODALS.STATS_FOR_NERDS) && (
        <StatsForNerds
          open
          onOpenChange={(value: boolean) =>
            updateState(MODALS.STATS_FOR_NERDS, value)
          }
        />
      )}
      {openModals.has(MODALS.SELF_ROLE_CHANGE) && (
        <RoleChangeModal
          peerId={localPeerId}
          onOpenChange={(value: boolean) =>
            updateState(MODALS.SELF_ROLE_CHANGE, value)
          }
        />
      )}
      {/* {openModals.has(MODALS.EMBED_URL) && (
        <EmbedUrlModal onOpenChange={value => updateState(MODALS.EMBED_URL, value)} />
      )} */}
    </Fragment>
  );
};
