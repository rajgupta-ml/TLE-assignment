import { useRef, useState } from "react";

const usePagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  let totalPages = useRef(0);
  const itemsPerPage = 5;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages.current) {
      setCurrentPage(page);
    }
  };

  const getPaginatedPages = () => {
    const page = [];
    const maxPagesToShow = 10;
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(
      totalPages.current,
      startPage + maxPagesToShow - 1,
    );

    if (startPage > 1) {
      page.push(1);
      if (startPage > 2) {
        page.push("...");
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      page.push(i);
    }
    if (endPage < totalPages.current) {
      if (endPage < totalPages.current - 1) {
        page.push("...");
      }
      page.push(totalPages.current);
    }
    return page;
  };

  return {
    currentPage,
    itemsPerPage,

    totalPages: totalPages,
    handlePageChange,
    getPaginatedPages,
  };
};

export default usePagination;
