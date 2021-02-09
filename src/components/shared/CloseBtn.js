import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

export default function CloseBtn({onClick, size="1rem"}) {
    return (
        <StyledBtn 
            onClick={onClick}
            aria-label="close"
            aria-role="button"
            size={size}
        >
            <FontAwesomeIcon icon={faTimes} />
        </StyledBtn>
    )
}


const StyledBtn = styled.div`
    font-size: ${p => p.size};
    position: absolute;
    top: 1rem;
    right: 1rem;
    cursor: pointer;
`