import {
  Circle,
  FileDown,
  MoveUpRight,
  RectangleHorizontal,
  SquarePen,
  Undo,
  Redo,
  OctagonX,
  Hand,
} from "lucide-react";
import { FEATURES, hasAccess } from "../../../constants";
import { UserSettingsContext } from "../../../providers/UserSettingsContext";
import { useContext } from "react";
import Tooltip from "../../Tooltip";

const ToolBar = ({
  action,
  setAction,
  fillColor,
  setFillColor,
  handleExport,
  undo,
  redo,
  clearAll,
  clearCurrentPage,
  whiteboarding,
  noteboarding,
  isDrawingMode,
  setIsDrawingMode,
  isPdfScrollable,
}) => {
  const { role } = useContext(UserSettingsContext);

  const hasAnnotationAccess = hasAccess(
    role,
    "features",
    FEATURES.START_WHITEBOARDING
  );
  const onlyFileDownShown =
    !(whiteboarding || hasAnnotationAccess) && !noteboarding;
  const hasIcons =
    whiteboarding ||
    hasAnnotationAccess ||
    hasAccess(role, "features", FEATURES.DOWNLOAD_PAGE);

  const tools = [
    { id: "SCRIBBLE", icon: SquarePen, size: "1.7rem", label: "Scribble" },
    { id: "ARROW", icon: MoveUpRight, size: "1.7rem", label: "Arrow" },
    {
      id: "RECTANGLE",
      icon: RectangleHorizontal,
      size: "2rem",
      label: "Rectangle",
    },
    { id: "CIRCLE", icon: Circle, size: "1.7rem", label: "Circle" },
  ];

  const getButtonClass = (toolId) =>
    action === toolId
      ? "bg-violet-300 p-1 rounded"
      : "p-1 hover:bg-violet-100 rounded";

  return (
    <div className={`absolute bottom-0 z-50 w-full md:py-2 flex justify-center md:justify-start`}>
      <div
        className={`flex items-center gap-2 py-.5 md:py-2 px-3 ${
          hasAnnotationAccess && noteboarding
            ? "md:mr-auto md:ml-2"
            : whiteboarding
            ? "md:mr-auto md:ml-2"
            : noteboarding
            ? " md:mr-auto md:ml-2"
            : onlyFileDownShown
            ? "md:mr-auto md:ml-2"
            : "mx-auto"
        } w-fit ${hasIcons ? "border shadow-lg rounded-lg bg-white" : ""}`}
      >
        {(whiteboarding || hasAnnotationAccess) && (
          <>
            {isPdfScrollable && (
              <Tooltip content="Move">
                <button
                  className={getButtonClass("SELECT")}
                  onClick={() => setAction("SELECT")}
                >
                  <Hand size="1.7rem" />
                </button>
              </Tooltip>
            )}
            {tools.map(({ id, icon: Icon, size, label }) => (
              <Tooltip key={id} content={label}>
                <button
                  key={id}
                  className={getButtonClass(id)}
                  onClick={() => setAction(id)}
                >
                  <Icon size={size} />
                </button>
              </Tooltip>
            ))}
          </>
        )}
        {/* <button onClick={undo}>
          <Undo size={"1.5rem"} />
        </button>
        <button onClick={redo}>
          <Redo size={"1.5rem"} />
        </button> */}
        {(whiteboarding || hasAnnotationAccess) && (
          <Tooltip content="Erase">
            <button onClick={clearCurrentPage}>
              <OctagonX size={"1.5rem"} />
            </button>
          </Tooltip>
        )}
        {hasAccess(role, "features", FEATURES.DOWNLOAD_PAGE) && (
          <Tooltip content="Download">
            <button onClick={handleExport}>
              <FileDown size={"1.5rem"} />
            </button>
          </Tooltip>
        )}
        {hasAnnotationAccess && noteboarding && (
          <button
            onClick={() => setIsDrawingMode(!isDrawingMode)}
            className="text-sm text-blue-800 px-2 py-1 rounded bg-blue-300 border-blue-400 border"
          >
            {isDrawingMode ? "Resize" : "Draw"}
          </button>
        )}
        {(whiteboarding || hasAnnotationAccess) && (
          <Tooltip content="Color Change">
            <input
              className="w-6 h-6 cursor-pointer"
              type="color"
              value={fillColor}
              onChange={(e) => setFillColor(e.target.value)}
              style={{
                borderRadius: "100%",
                border: "none",
                padding: "0",
                margin: "0",
              }}
            />
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default ToolBar;
