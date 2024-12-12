import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../../shadcn/components/ui/pagination";

export default function PaginationComponent({
  currentPage,
  numPages,
  navigatePage,
}) {
  const isFirstPage = parseInt(currentPage) === 1;
  const isLastPage = parseInt(currentPage) === numPages;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => !isFirstPage && navigatePage(parseInt(currentPage) - 1)}
            disabled={isFirstPage}
            className={isFirstPage ? "cursor-not-allowed" : "cursor-pointer"}
          ></PaginationPrevious>
        </PaginationItem>
        <PaginationItem>
          <span className="text-sm text-center flex justify-center items-center">
            {currentPage}
          </span>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            onClick={() => !isLastPage && navigatePage(parseInt(currentPage) + 1)}
            disabled={isLastPage}
            className={isLastPage ? "cursor-not-allowed" : "cursor-pointer"}
          ></PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
