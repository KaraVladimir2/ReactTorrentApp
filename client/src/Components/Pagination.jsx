import React from "react";

const Pagination = ({ postsLen, totalPages, page, changePage }) => {
  const getPagesArray = (totalPages) => {
    let result = [];
    for (let i = 0; i < totalPages; i++) {
      result.push(i + 1);
    }
    return result;
  };

  let pagesArray = getPagesArray(totalPages);

  if (!postsLen) {
    return;
  }
  return (
    <div className="page-wrapper">
      {pagesArray.map((p) => (
        <span
          onClick={() => changePage(p)}
          key={p}
          className={page === p ? "page page-current" : "page"}
        >
          {p}
        </span>
      ))}
    </div>
  );
};

export default Pagination;
