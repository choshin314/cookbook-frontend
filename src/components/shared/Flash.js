
import { connect } from 'react-redux'
import styled, {css} from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faInfoCircle as info, 
    faCheckCircle as success, 
    faExclamationCircle as warning,
    faTimes as close 
} from '@fortawesome/free-solid-svg-icons'

import { clearFlash } from '../../redux/actions/flashActions'

function Flash({ type, message, clear }) {
    return (
        <StyledFigure type={type}>
            <IconWrapper type={type}>
                <FontAwesomeIcon icon={success}/>
            </IconWrapper>
            <FlashHeader>{type}</FlashHeader>
            <FlashContent>
               {message}
            </FlashContent>
            <CloseBtn aria-role="button" title="close message" onClick={clear}>
                <FontAwesomeIcon icon={close} />
            </CloseBtn>
        </StyledFigure>
    )
}

export default connect(null, { clear: clearFlash })(Flash);

const accent = css`
    ${p => {
        switch(p.type) {
            case "success": return 'var(--accent)';
            case "info": return 'var(--teal)';
            case "warning": return 'red';
        }
    }
}`

const StyledFigure = styled.figure`
    position: absolute;
    top: 1rem;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    max-width: 400px;
    display: grid;
    grid-template-columns: 30px auto 30px;
    grid-template-rows: repeat(2, minmax(10px, 1fr));
    gap: 5px;
    padding: 1rem;
    border-radius: 2px;
    background-color: white;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    z-index: 100;
    border-left: 3px solid ${accent};

`
const FlashHeader = styled.h3`
    font-size: 1rem;
    text-transform: capitalize;
`
const FlashContent = styled.div`
    font-size: .75rem;
`
const IconWrapper = styled.div`
    grid-column: 1 /span 1;
    grid-row: 1 /span 2;
    justify-self: start;
    align-self: center;
    color: ${accent};
`

const CloseBtn = styled.div`
    grid-column: 3 /span 1;
    grid-row: 1 /span 2;
    justify-self: end;
    align-self: center;
    color: var(--med-lite-grey);
    cursor: pointer;
`
