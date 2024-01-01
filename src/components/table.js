
import React from 'react';
import Table from 'react-bootstrap/Table';

function ProjectsTable({ children }) {
  return (
    <Table striped hover width="100%" className="custom-table">

      <tbody className="custom-tbody">
        <td className='row head px-5 py-3'>
          <div className='container'>
            <div className='id px-4'>ID</div>
            <div className='name'>Name</div>
            <div className='budget'>Budget</div>
            <div className='timeline'>Timeline</div>
            <div className='description'>Description</div>
            <div className=''></div>
            <div></div>
          </div>
        </td>
        {children}
      </tbody>
    </Table>
  );
}

export default ProjectsTable;
