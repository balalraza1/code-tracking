import Linkify from "linkify-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../shadcn/components/ui/alert";
import { X } from "lucide-react";

export default function NoticeCard({ title, message, onCloseAlertClick }) {
  return (
    <Alert variant="success" className="p-2 bg-white text-dark shadow-xl">
      <span className="float-right cursor-pointer">
        <X onClick={onCloseAlertClick} size={18} />
      </span>
      <AlertTitle className="text-xl font-bold">{title}</AlertTitle>
      <AlertDescription>
        <Linkify
          options={{
            ignoreTags: ["script", "style"],
            nl2br: true,
            rel: "noopener noreferrer",
            target: "_blank",
          }}
        >
          {message}
        </Linkify>
      </AlertDescription>
    </Alert>
  );
}
