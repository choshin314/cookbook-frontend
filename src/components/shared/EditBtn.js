import styled from 'styled-components';
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { media } from '../commonStyles';

function EditBtn({onClick}) {
    return (
        <StyledBtnWrapper 
            onClick={onClick} 
            role="button" 
            aria-label="edit"
            title="Edit"
        >
            <FontAwesomeIcon icon={faEdit} />
        </StyledBtnWrapper>
    )
}

export default EditBtn

const StyledBtnWrapper = styled.span`
    font-size: 1rem;
    background-color: transparent;
    cursor: pointer;
    @media(min-width: ${media.medium}) {
        font-size: 1rem;
    }
`