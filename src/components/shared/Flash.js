import { useEffect } from 'react'
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
import { CSSTransition } from 'react-transition-group'


function Flash({ flash, clear }) {
    useEffect(() => {
        const autoClear = setTimeout(() => clear(), 10000)
        return () => clearTimeout(autoClear);
    }, [flash])

    if(!flash) return null;

    const { type, message } = flash;
    const getFlashIcon = () => {
        switch (type) {
            case "success":
                return success;
            case "error":
                return warning;
            case "info":
                return info;
            default:
                return info;
        }
    }

    return (
        <CSSTransition 
            in={!!flash} 
            timeout={{enter: 500, exit: 1000}}
            appear={true}
            unmountOnExit
            classNames="flash"
        >
            <StyledFigure type={type}>
                <IconWrapper type={type}>
                    <FontAwesomeIcon icon={getFlashIcon()}/>
                </IconWrapper>
                <FlashHeader>{type}</FlashHeader>
                <FlashMessage>
                    {typeof message === "string" && message}
                    {Array.isArray(message) && (
                        <FlashMessageList type={type}>
                            {message.map((m, i) => <li key={i}>{m}</li>)}
                        </FlashMessageList>
                    )}
                </FlashMessage>
                <CloseBtn tabindex="0" title="close message" onClick={clear}>
                    <FontAwesomeIcon icon={close} />
                </CloseBtn>
            </StyledFigure>
        </CSSTransition>
    )
}

const mapState = state => ({ flash: state.flash })
export default connect(mapState, { clear: clearFlash })(Flash);

const accent = css`
    ${p => {
        switch(p.type) {
            case "success": return 'var(--accent)';
            case "info": return 'var(--teal)';
            case "error": return 'var(--error)';
            default: return 'var(--teal)';
        }
    }
}`

const listStyle = css`
    ${p => {
        switch(p.type) {
            case "success": return '👍';
            case "info": return 'ℹ️';
            case "error": return '🙁';
            default: return 'ℹ️';
        }
    }
}`

const StyledFigure = styled.figure`
    position: fixed;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    max-width: 400px;
    display: grid;
    grid-template-columns: 30px auto 30px;
    grid-template-rows: repeat(2, minmax(10px, 1fr));
    gap: 5px;
    padding: 1rem;
    border-radius: 5px;
    background-color: white;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    z-index: 100;
    border-left: 3px solid ${accent};
    
    &.flash-enter, &.flash-appear {
        opacity: 0;
        transform: translate(-50%, -100%);
    }
    &.flash-enter-active, &.flash-appear-active {
        opacity: 1;
        transform: translate(-50%, 0);
        transition: opacity .250s ease-out .250s, transform .5s ease-out;
    }
    &.flash-exit {
        opacity: 1;
    }
    &.flash-exit-active {
        opacity: 0;
        transition: opacity .5 ease-out;
    }

`
const FlashHeader = styled.h3`
    font-size: 1rem;
    text-transform: capitalize;
`
const FlashMessage = styled.div`
    font-size: .75rem;
`

const FlashMessageList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    li {
        line-height: 1.25;
    }
    li::before {
        content: '${listStyle}';
        margin-right: .5rem;
    }
`

const IconWrapper = styled.div`
    grid-column: 1 /span 1;
    grid-row: 1 /span 2;
    justify-self: start;
    align-self: center;
    color: ${accent};
`

const CloseBtn = styled.button`
    grid-column: 3 /span 1;
    grid-row: 1 /span 2;
    justify-self: end;
    align-self: center;
    color: var(--med-lite-grey);
    cursor: pointer;
    background-color: transparent;
    border: none;                                                               
`
