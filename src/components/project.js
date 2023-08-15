
import React from 'react';
import { FaStar } from 'react-icons/fa';
import styled from 'styled-components';

const StyledTableRow = styled.tr`
  display: ${({ hidden }) => (hidden ? 'none' : 'table-row')};
`;

function Project({ project, onStarClick, onHideClick }) {

    
  
  
    return (
        <StyledTableRow hidden={project.hidden}>
            <td>
                <span>{project.name}</span>
                <button
                    type="button"
                    className={`star ${project.isStarred ? 'starred' : 'star-button'}`}
                    onClick={onStarClick}
                >
                    <FaStar size={30} className="star-icon pb-2" />
                </button>
                <button
                    className="btn btn-primary hid"
                    onClick={onHideClick}
                >
                    Hide
                </button>
            </td>
        </StyledTableRow>
    )
}

export default Project;
