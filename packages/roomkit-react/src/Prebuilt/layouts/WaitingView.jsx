import React from "react";
import Lottie from "react-lottie";
import { LeaveRoom } from "../components/Leave/LeaveRoom";
import { Box, Flex } from "../../Layout";
import { Text } from "../../Text";

export const WaitingView = React.memo(({ screenType }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: require("./waiting.json"),
  };

  return (
    <Box
      css={{
        overflow: "hidden",
        w: "96%",
        maxWidth: "96%",
        h: "100%",
        m: "auto",
        background: "$surface_default",
        borderRadius: "$3",
      }}
      data-testid="waiting_view"
    >
      <Flex
        align="center"
        direction="column"
        css={{
          w: "$96",
          textAlign: "center",
          margin: "auto",
          h: "100%",
          justifyContent: "center",
          gap: "$8",
        }}
      >
        <Lottie height={200} width={200} options={defaultOptions} />
        <Flex
          direction="column"
          css={{
            w: "$80",
            p: "$1",
            gap: "$4",
            alignItems: "center",
          }}
        >
          <Text color="white" variant="h6" css={{ "@md": { fontSize: "$md" } }}>
            Please wait
          </Text>
          <Text
            color="$on_surface_medium"
            css={{ mt: "$4", "@md": { fontSize: "$sm" } }}
          >
            Sit back and relax till Trainer let you in.
          </Text>
          <LeaveRoom screenType={screenType} />
        </Flex>
      </Flex>
    </Box>
  );
});
