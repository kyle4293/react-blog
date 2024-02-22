// Pagination.js

import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const goToPage = (pageNumber) => {
    onPageChange(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li key={i} className={currentPage === i ? 'active' : null}>
          <button onClick={() => goToPage(i)}>{i}</button>
        </li>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="pagination-container">
        <div className="pagination">
        <ul>
            <li>
            <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
            </li>
            {renderPageNumbers()}
            <li>
            <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
            </li>
        </ul>
        </div>
    </div>  
  );
}

export default Pagination;
