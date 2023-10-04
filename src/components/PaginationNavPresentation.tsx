import { useCallback } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface ButtonPagination {
  content: React.ReactNode | number;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
}

const Button2 = ({ content, onClick, active, disabled }: ButtonPagination) => {
  console.log(content);
  return (
    <button
      className={`flex flex-col cursor-pointer items-center justify-center w-9 h-9 shadow-[0_4px_10px_rgba(0,0,0,0.03)] text-sm font-normal transition-colors rounded-lg
             ${active
          ? 'bg-primary text-white dark:bg-white dark:text-primary'
          : 'bg-white dark:bg-primary dark:text-white text-black'
        }
             `}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
};

const PaginationNav = ({
  gotoPage,
  canPreviousPage,
  canNextPage,
  pageCount,
  pageIndex,
  pageRows,
}: any) => {
  const renderPageLinks = useCallback(() => {
    pageCount = Math.ceil(pageCount);
    pageRows = Math.ceil(pageRows);
    if (pageCount === 0) return null;
    // const visiblePageButtonCount = 3;
    const visiblePageButtonCount = 3;
    let numberOfButtons =
      pageCount < visiblePageButtonCount ? pageCount : visiblePageButtonCount;
    const pageIndices = [pageIndex];
    numberOfButtons--;
    [...Array(numberOfButtons)].forEach((_item, itemIndex) => {
      const pageNumberBefore = pageIndices[0] - 1;
      const pageNumberAfter = pageIndices[pageIndices.length - 1] + 1;
      if (
        pageNumberBefore >= 0 &&
        (itemIndex < numberOfButtons / 2 || pageNumberAfter > pageCount - 1)
      ) {
        pageIndices.unshift(pageNumberBefore);
      } else {
        pageIndices.push(pageNumberAfter);
      }
    });
    return pageIndices.map((pageIndexToMap) => (
      <li key={pageIndexToMap}>
        <Button2
          content={pageIndexToMap + 1}
          onClick={() => gotoPage(pageIndexToMap)}
          active={pageIndex === pageIndexToMap}
        />
      </li>
    ));
  }, [pageCount, pageIndex]);
  return (
    <ul className="flex gap-2">
      <li>
        <Button2
          content={
            <div className="flex ml-1">
              <FaChevronLeft size="0.6rem" />
              <FaChevronLeft size="0.6rem" className="-translate-x-1/2" />
            </div>
          }
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        />
      </li>
      {renderPageLinks()}
      <li>
        <Button2
          content={
            <div className="flex ml-1">
              <FaChevronRight size="0.6rem" />
              <FaChevronRight size="0.6rem" className="-translate-x-1/2" />
            </div>
          }
          onClick={() => gotoPage(Math.round(pageCount) - 1)}
          disabled={!canNextPage}
        />
      </li>
    </ul>
  );
};

export default PaginationNav;
