import React, { Suspense, useCallback, useEffect } from "react";
import {
  ConferencingScreen,
  DefaultConferencingScreen_Elements,
  HLSLiveStreamingScreen_Elements,
} from "@100mslive/types-prebuilt";
import { match } from "ts-pattern";
import {
  selectIsConnectedToRoom,
  selectLocalPeerRoleName,
  selectPeersByRole,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";
import FullPageProgress from "../components/FullPageProgress";
import { InsetTile } from "../components/InsetTile";
import { GridLayout } from "../components/VideoLayouts/GridLayout";
import { Box, Flex } from "../../Layout";
// @ts-ignore: No implicit Any
import { EmbedView } from "./EmbedView";
// @ts-ignore: No implicit Any
import { PDFView } from "./PDFView";
import SidePane from "./SidePane";
// @ts-ignore: No implicit Any
import { WaitingView } from "./WaitingView";
import { CaptionsViewer } from "../plugins/CaptionsViewer";
// @ts-ignore: No implicit Any
import {
  usePDFConfig,
  useUrlToEmbed,
  useWaitingViewerRole,
  // @ts-ignore: No implicit Any
} from "../components/AppData/useUISettings";
import { useTrainerEvents } from "../components/hooks/useTrainerEvents";
import {
  useLandscapeHLSStream,
  useMobileHLSStream,
  useSharpenUp,
  // eslint-disable-next-line import/namespace
} from "../common/hooks";
import {
  SESSION_STORE_KEY,
  STUDENT_ROLE_NAME,
  TEACHER_ROLE_NAME,
  TRAINER_ALREADY_PRESENT,
  TRAINER_JOINED_ROOM,
  TRAINER_LEFT_ROOM,
  TRAINER_NOT_PRESENT,
} from "../common/constants";

// @ts-ignore: No implicit Any
const HLSView = React.lazy(() => import("./HLSView"));

export const VideoStreamingSection = ({
  screenType,
  elements,
  hideControls = false,
  showControls,
}: {
  screenType: keyof ConferencingScreen;
  elements:
    | DefaultConferencingScreen_Elements
    | HLSLiveStreamingScreen_Elements;
  hideControls: boolean;
  showControls?: () => void;
}) => {
  const trainerEvent = useTrainerEvents();
  const localPeerRole = useHMSStore(selectLocalPeerRoleName);
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const trainer = useHMSStore(selectPeersByRole(TEACHER_ROLE_NAME))[0];

  const hmsActions = useHMSActions();
  const waitingViewerRole = useWaitingViewerRole();
  const urlToIframe = useUrlToEmbed();
  const pdfAnnotatorActive = usePDFConfig();
  const isMobileHLSStream = useMobileHLSStream();
  const isLandscapeHLSStream = useLandscapeHLSStream();

  const { launchSharpenUp, quizLink } = useSharpenUp();

  useEffect(() => {
    if (launchSharpenUp && showControls) {
      showControls();
    }
  }, [launchSharpenUp, showControls]);

  const toggleAVControls = useCallback(async () => {
    const trainerNotPresent =
      trainerEvent === TRAINER_LEFT_ROOM ||
      trainerEvent === TRAINER_NOT_PRESENT;
    const trainerPresent =
      trainerEvent === TRAINER_JOINED_ROOM ||
      trainerEvent === TRAINER_ALREADY_PRESENT;
    const isStudent = localPeerRole === STUDENT_ROLE_NAME;

    if (isStudent) {
      if (trainerNotPresent) {
        await hmsActions.setLocalAudioEnabled(false);
        await hmsActions.setLocalVideoEnabled(false);
      }
      if (trainerPresent) {
        await hmsActions.setLocalAudioEnabled(true);
        await hmsActions.setLocalVideoEnabled(true);
      }
    }
  }, [hmsActions, localPeerRole, trainerEvent]);

  // // Disable Audio and Video while student is waiting for the trainer to join
  useEffect(() => {
    toggleAVControls();
  }, [toggleAVControls]);

  useEffect(() => {
    if (!isConnected) {
      return;
    }
    hmsActions.sessionStore.observe([
      SESSION_STORE_KEY.PINNED_MESSAGES,
      SESSION_STORE_KEY.SPOTLIGHT,
      SESSION_STORE_KEY.CHAT_STATE,
      SESSION_STORE_KEY.CHAT_MESSAGE_BLACKLIST,
      SESSION_STORE_KEY.CHAT_PEER_BLACKLIST,
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, hmsActions]);

  if (!localPeerRole) {
    // we don't know the role yet to decide how to render UI
    return null;
  }

  return (
    <Suspense fallback={<FullPageProgress />}>
      <Flex
        css={{
          size: "100%",
          position: "relative",
          gap: isMobileHLSStream || isLandscapeHLSStream ? "0" : "$4",
        }}
        direction={match<Record<string, boolean>, "row" | "column">({
          isLandscapeHLSStream,
          isMobileHLSStream,
        })
          .with({ isLandscapeHLSStream: true }, () => "row")
          .with({ isMobileHLSStream: true }, () => "column")
          .otherwise(() => "row")}
      >
        {match({
          screenType,
          localPeerRole,
          pdfAnnotatorActive,
          urlToIframe,
          launchSharpenUp,
          trainerEvent,
        })
          .with(
            {
              screenType: "hls_live_streaming",
            },
            () => <HLSView />
          )
          .when(
            ({ localPeerRole }) => localPeerRole === waitingViewerRole,
            () => <WaitingView screenType={screenType} />
          )
          .when(
            ({ trainerEvent }) =>
              (trainerEvent === TRAINER_LEFT_ROOM ||
                trainerEvent === TRAINER_NOT_PRESENT) &&
              localPeerRole === STUDENT_ROLE_NAME,
            () => <WaitingView screenType={screenType} />
          )
          .when(
            ({ pdfAnnotatorActive }) => !!pdfAnnotatorActive,
            () => <PDFView />
          )
          .when(
            ({ urlToIframe }) => !!urlToIframe,
            () => <EmbedView />
          )
          .when(
            ({ launchSharpenUp }) => launchSharpenUp,
            () => {
              return (
                <Box
                  css={{
                    flex: "1 1 0",
                    height: "100%",
                    maxHeight: "100%",
                    position: "relative",
                    "&:empty": { display: "none" },
                    overflowY: "clip",
                  }}
                >
                  <InsetTile peerId={trainer?.id} />
                  <iframe
                    title="Live-Session | Student Dashboard."
                    allow="camera *;microphone *;display-capture *"
                    src={quizLink}
                    style={{
                      height: "100%",
                      width: "100%",
                      border: 0,
                    }}
                  ></iframe>
                </Box>
              );
            }
          )

          .otherwise(() => {
            return (
              // @ts-ignore
              <GridLayout
                {...(elements as DefaultConferencingScreen_Elements)
                  ?.video_tile_layout?.grid}
              />
            );
          })}
        <CaptionsViewer />
        <Box
          css={{
            flex: match({ isLandscapeHLSStream, isMobileHLSStream })
              .with({ isLandscapeHLSStream: true }, () => "1  1 0")
              .with({ isMobileHLSStream: true }, () => "2 1 0")
              .otherwise(() => undefined),
            position: "relative",
            height: !isMobileHLSStream ? "100%" : undefined,
            maxHeight: "100%",
            "&:empty": { display: "none" },
            overflowY: "clip",
          }}
        >
          <SidePane
            screenType={screenType}
            // @ts-ignore
            tileProps={
              (elements as DefaultConferencingScreen_Elements)
                ?.video_tile_layout?.grid
            }
            hideControls={hideControls}
          />
        </Box>
      </Flex>
    </Suspense>
  );
};
