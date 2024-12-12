import { useState, useEffect, useCallback } from "react";
import { Rnd } from "react-rnd";
import { X, Maximize2, Minimize2 } from "lucide-react";
import FilePreview from "./FilePreview";
import useDebouncedCallback from "beautiful-react-hooks/useDebouncedCallback";
import debounce from "../../../helper/debounce";

const SingleNote = ({
  id,
  idx,
  noteData = {},
  onDelete,
  onUpdate,
  onSetActive,
  isActive,
  isDrawingMode,
}) => {
  const initialWidth = noteData.width || 200;
  const initialHeight = noteData.height || 200;
  const expandedWidth = noteData.maxWidth; // Define the expanded width
  const expandedHeight = noteData.maxHeight; // Define the expanded height
  // const zIndex = noteData.zIndex; // Define the zIndex

  const [currentPage, setCurrentPage] = useState(noteData.currentPage || 1);
  const [isExpanded, setIsExpanded] = useState(false);
  const [size, setSize] = useState({
    width: initialWidth,
    height: initialHeight,
  });
  const [position, setPosition] = useState({
    x: noteData.x || 0,
    y: noteData.y || 0,
  });
  const [prevPosition, setPrevPosition] = useState(position);
  const [prevSize, setPrevSize] = useState(size);

  useEffect(() => {
    if (size.width === expandedWidth && size.height === expandedHeight) {
      setIsExpanded(true);
    } else {
      setIsExpanded(false);
    }
  }, [size]);

  // const debouncedOnUpdate = useDebouncedCallback((id, updatedNoteData) => {
  //   onUpdate(id, updatedNoteData);
  //   // setTimeout(() => {
  //   //   onUpdate(id, updatedNoteData);
  //   // }, 150);
  // }, 150);

  const handleDelete = () => {
    onDelete(id);
    //  onUpdate(id, null);
  };

  const debouncedOnUpdate = useCallback(
    debounce((id, updatedNoteData) => {
      onUpdate(id, updatedNoteData);
      // setTimeout(() => {
      //   onUpdate(id, updatedNoteData);
      // }, 150);
    }, 150),
    []
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    const updatedNoteData = { ...noteData, currentPage: page };
    // debouncedOnUpdate(id, updatedNoteData);
    onUpdate(id, updatedNoteData);
  };

  const handleExpand = () => {
    setIsExpanded(true);
    setPrevPosition(position); // Save the current position before expanding
    setPrevSize(size); // Save the current size before expanding
    setSize({ width: expandedWidth, height: expandedHeight });
    setPosition({ x: 0, y: 0 }); // Move to (0, 0) when expanding
    //debouncedOnUpdate(id, {
    onUpdate(id, {
      ...noteData,
      width: expandedWidth,
      height: expandedHeight,
      x: 0,
      y: 0,
    });
  };

  const handleMinimize = () => {
    setIsExpanded(false);
    setSize(prevSize); // Restore the previous size
    setPosition(prevPosition); // Restore the previous position
    // debouncedOnUpdate(id, {
    onUpdate(id, {
      ...noteData,
      width: prevSize.width,
      height: prevSize.height,
      x: prevPosition.x,
      y: prevPosition.y,
    });
  };

  return (
    <Rnd
      key={id}
      className={`border-2 border-blue-400 rounded-md shadow-md ${
        !isDrawingMode ? `border-blue-500 border-4` : ""
      }`}
      size={{
        width: size.width,
        height: size.height,
      }}
      position={position}
      default={{
        x: noteData.x,
        y: noteData.y,
        width: initialWidth,
        height: initialHeight,
      }}
      bounds="parent"
      minWidth={200} // Set minimum width
      minHeight={200} // Set minimum height
      onDragStart={(e, d) => {
        d.node.style.zIndex = !isDrawingMode
          ? isActive
            ? 40
            : 21 + idx
          : isActive
          ? 10
          : 1 + idx;
      }}
      onDragStop={(e, d) => {
        setPosition({ x: d.x, y: d.y });
        d.node.style.zIndex = !isDrawingMode
          ? isActive
            ? 40
            : 21 + idx
          : isActive
          ? 40
          : 1 + idx;
        // debouncedOnUpdate(id, { ...noteData, x: d.x, y: d.y });
        onUpdate(id, { ...noteData, x: d.x, y: d.y });
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        const newWidth = Math.max(ref.offsetWidth, 200);
        const newHeight = Math.max(ref.offsetHeight, 200);
        setSize({ width: newWidth, height: newHeight });
        setPosition(position);
        //  debouncedOnUpdate(id, {
        onUpdate(id, {
          ...noteData,
          width: newWidth,
          height: newHeight,
          ...position,
        });
      }}
      style={{
        zIndex: !isDrawingMode
          ? isActive
            ? 40
            : 21 + idx
          : isActive
          ? 10
          : 1 + idx,
      }}
      onClick={() => onSetActive(id)}
    >
      <div
        className="flex flex-col h-full border border-solid"
        id={`id-${id}-${JSON.stringify(isDrawingMode)}`}
      >
        <div className={`bg-blue-400 px-2 flex justify-between items-center`}>
          <div className="pb-2">
            <p className={`text-sm`}>
              {noteData.fileName
                ? `${noteData.fileName.substring(0, 30)}${
                    noteData.fileName.length > 30 ? "..." : ""
                  }`
                : "Untitled"}
              {`   [PDF]`}
              {/* [{!isDrawingMode ? 20 + zIndex : isActive ? 1 + zIndex : zIndex}] */}
              {/* [{JSON.stringify(isDrawingMode)}] [{JSON.stringify(isActive)}]  */}
              {/* [{idx}] */}
            </p>
          </div>
          {!!isDrawingMode ? (
            <div className="flex space-x-1">
              <button></button>
            </div>
          ) : (
            <div className="flex space-x-1">
              {isExpanded ? (
                <button onClick={handleMinimize} title="Minimize">
                  <Minimize2 size={16} className="text-gray-800" />
                </button>
              ) : (
                <button onClick={handleExpand} title="Expand">
                  <Maximize2 size={16} className="text-gray-800" />
                </button>
              )}
              <button onClick={handleDelete} title="Close">
                <X size={16} className="text-gray-800" />
              </button>
            </div>
          )}
        </div>

        <div className="bg-blue-200 flex-grow overflow-hidden">
          {noteData.pdfFile && (
            <FilePreview
              id={noteData.id}
              pdfFile={noteData.pdfFile}
              setNumPages={(index, numPages) => {
                const updatedNoteData = { ...noteData, numPages };
                onUpdate(id, updatedNoteData);
              }}
              onRenderPage={noteData.onRenderPage}
              width={size.width}
              height={size.height}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              setActiveTile={onSetActive}
              isDrawingMode={isDrawingMode}
            />
          )}
        </div>
      </div>
    </Rnd>
  );
};

export default SingleNote;
