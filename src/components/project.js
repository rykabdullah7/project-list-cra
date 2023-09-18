
import React from 'react';
import { FaStar } from 'react-icons/fa';
import styled from 'styled-components';
import  Button  from 'react-bootstrap/Button';


const StyledTableRow = styled.tr`
  display: ${({ hidden }) => (hidden ? 'none' : 'table-row')};
`;

function Project({ project, onStarClick, onHideClick }) {

    return (
        
            <StyledTableRow hidden={project.hidden}>
                <td className='row px-5  py-3'>
                    <div className='container'>
                        <div className='id px-4'>{project.projectId}</div>
                        <div className='name'>{project.name}</div>
                        <div className='budget'>{project.budget}</div>
                        <div className='timeline'>{project.timeline}</div>
                        <div className='description'>{project.description}</div>
                        <div className='hide-btn px-3'>
                            <Button
                                className="hid"
                                onClick={onHideClick}
                            >
                                Hide
                            </Button>
                        </div>
                        <div className='star-btn px-3'>
                            <button
                                className={`star ${project.isStarred ? 'starred' : 'star-button'}`}
                                onClick={onStarClick}
                            >
                                <FaStar size={30} className="star-icon pb-2" />
                            </button></div>
                        
                    </div>

                </td>
            </StyledTableRow>
        

    )
}

export default Project;

