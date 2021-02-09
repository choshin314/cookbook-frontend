import { useState, useRef } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import {CSSTransition} from 'react-transition-group'

function Modal({children, backdrop=true, modalOpen, toggleModal}) {
    const modalRoot = document.getElementById('portal');
    const backdropRef = useRef(null);
    return ReactDOM.createPortal((
        <>
        <CSSTransition
            in={modalOpen}
            appear={true}
            timeout={200}
            classNames="fadeExpand"
            unmountOnExit
        >
            <Backdrop ref={backdropRef} backdrop={backdrop} onClick={(e) => {
                if(e.target === backdropRef.current) toggleModal();
                return;
            }}>
            </Backdrop>
        </CSSTransition>
        {children}
        </>
    ), modalRoot)
}

export default Modal

const Backdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;
    background-color: ${p => p.backdrop ? 'rgba(0,0,0,.1)' : 'transparent'};
    &.fadeExpand-enter, &.fadeExpand-appear {
        opacity: 0;
    }
    &.fadeExpand-enter-active, &.fadeExpand-appear-active {
        opacity: 1;
        transition: opacity .2s ease-in;
    }
    &.fadeExpand-exit {
        opacity: 1;
    }
    &.fadeExpand-exit-active {
        opacity: 0;
        transition: opacity .2s ease-in;
    }
`

const StyledModal = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    margin-bottom: 1rem;
`