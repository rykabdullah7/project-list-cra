
import React from 'react';

function Table({ children }) {
  return (
    <table width="100%" className="table-hover custom-table">
      <tbody className="custom-tbody">
        {children}
      </tbody>
    </table>
  );
}

export default Table;
