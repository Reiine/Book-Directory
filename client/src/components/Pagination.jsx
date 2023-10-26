import React, { useState } from 'react';

function Pagination({ totalItems, itemsPerPage, setCurrentPageIndex="1" }) {
  const [focusedButton, setFocusedButton] = useState(0);

  const handleButtonClick = (index) => {
    setCurrentPageIndex(index + 1);
  };

  const handleButtonFocus = (index) => {
    setFocusedButton(index);
  };

  return (
    <div className="pagination-cover">
      {Array.from({ length: Math.ceil(totalItems / itemsPerPage) }, (_, index) => (
        <button
          key={index}
          onClick={() => handleButtonClick(index)}
          className={focusedButton === index ? 'focused-button': ''}
          onFocus={() => handleButtonFocus(index)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
}

export default Pagination;
