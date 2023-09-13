
import React from 'react';
import Table from 'react-bootstrap/Table';

function ProjectsTable({ children }) {
  return (
    <Table  hover width="100%" className="custom-table">
      <tbody className="custom-tbody">
        {children}
      </tbody>
    </Table>
  );
}

export default ProjectsTable;
