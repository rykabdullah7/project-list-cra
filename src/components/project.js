
import React from 'react';
import { FaStar } from 'react-icons/fa';
import styled from 'styled-components';

const StyledTableRow = styled.tr`
  display: ${({ hidden }) => (hidden ? 'none' : 'table-row')};
`;

function Project({ project, onStarClick, onHideClick }) {

    return (
        
            <StyledTableRow hidden={project.hidden}>
                <td className='row'>
                    <div className='container'>
                        <td className='id'>{project.projectId}</td>
                        <td className='name'>{project.name}</td>
                        <td className='budget'>{project.budget}</td>
                        <td className='timeline'>{project.timeline}</td>
                        <td className='description'>{project.description}</td>
                        <td>
                            <button
                                type="button"
                                className={`star ${project.isStarred ? 'starred' : 'star-button'}`}
                                onClick={onStarClick}
                            >
                                <FaStar size={30} className="star-icon pb-2" />
                            </button></td>
                        <td>
                            <button
                                className="btn btn-primary hid"
                                onClick={onHideClick}
                            >
                                Hide
                            </button>
                        </td>
                    </div>

                </td>
            </StyledTableRow>
        

    )
}

export default Project;
