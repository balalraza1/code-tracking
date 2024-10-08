import { styled } from "../../../Theme";

const FixedNotificationContainer = styled("div", {
  position: "fixed",
  top: 0,
  width: "100%",
  textAlign: "center",
  backgroundColor: "$alert_warning",
  color: "$primary_medium",
  fontSize: "$lg",
  zIndex: 1000,
});

export default FixedNotificationContainer;
