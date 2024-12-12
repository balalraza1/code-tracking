import { memo, useEffect, useState, useRef, useContext } from "react";
import { Document, Page } from "react-pdf";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnnotationContext } from "../../../providers/AnnotationContext";

const FilePreview = memo(
  ({
    pdfFile,
    setNumPages,
    currentPage,
    width,
    height,
    onRenderPage,
    onPageChange,
    id,
    setActiveTile,
    isDrawingMode,
  }) => {
    const [isRendered, setIsRendered] = useState(false);
    const [numPages, setNumPagesState] = useState(null);
    const { clearAll } = useContext(AnnotationContext);
    const [page, setPage] = useState(null);

    useEffect(() => {
      setIsRendered(true);
    }, [pdfFile]);

    const handleScroll = () => {
      onPageRender(page);
      setActiveTile(id);
    };

    const onDocumentLoadSuccess = ({ numPages }) => {
      setNumPages(id, numPages);
      setNumPagesState(numPages);
    };

    const onDocumentLoadError = (error) => {
      console.error("Error loading document: ", error.message);
    };

    const onPageRender = (page) => {
      if (onRenderPage) {
        onRenderPage(page, currentPage);
        setPage(page);
      }
    };

    const goToPreviousPage = () => {
      if (currentPage > 1) {
        onPageChange(currentPage - 1);
        clearAll();
      }
    };

    const goToNextPage = () => {
      if (currentPage < numPages) {
        onPageChange(currentPage + 1);
        clearAll();
      }
    };
    const isFirstPage = currentPage <= 1;
    const isLastPage = currentPage >= numPages;
    return (
      //   <ScrollArea
      //     className="flex flex-col overflow-x-auto w-full h-full"
      //     ref={scrollRef}
      //     id="Scroll-area"
      //   >
      <div
        className="w-full h-full overflow-auto relative flex"
        onScroll={handleScroll}
      >
        {pdfFile && isRendered && (
          <Document
            file={pdfFile}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            className="pdf-document"
          >
            <Page
              pageNumber={currentPage}
              width={width}
              height={height}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              onRenderSuccess={onPageRender}
            />
          </Document>
        )}

        {!isDrawingMode && (
          <div className="absolute inset-0 flex justify-between items-center px-2">
            {!isFirstPage ? (
              <button
                onClick={goToPreviousPage}
                disabled={isFirstPage}
                className={`bg-blue-400 hover:bg-blue-500 text-white p-2 rounded-full ${
                  isFirstPage ? "cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                <ChevronLeft className="w-3 h-3" strokeWidth={2} />
              </button>
            ) : (
              <span></span>
            )}
            {isLastPage ? (
              <span></span>
            ) : (
              <button
                onClick={goToNextPage}
                disabled={isLastPage}
                className={`bg-blue-400 hover:bg-blue-500 text-white p-2 rounded-full ${
                  isLastPage ? "cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                <ChevronRight className="w-3 h-3" strokeWidth={2} />
              </button>
            )}
          </div>
        )}
      </div>
      //   </ScrollArea>
    );
  }
);

export default FilePreview;
