import styled from 'styled-components';
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { media } from '../commonStyles';

function DeleteBtn({onClick}) {
    return (
        <StyledBtnWrapper 
            onClick={onClick} 
            role="button" 
            aria-label="delete"
            title="Delete"
        >
            <FontAwesomeIcon icon={faTrashAlt} />
        </StyledBtnWrapper>
    )
}

export default DeleteBtn

const StyledBtnWrapper = styled.span`
    font-size: 1rem;
    background-color: transparent;
    cursor: pointer;
    @media(min-width: ${media.medium}) {
        font-size: 1rem;
    }
`