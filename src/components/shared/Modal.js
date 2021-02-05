import { useState } from 'react'
import styled from 'styled-components'
import Portal from './Portal'
import {CSSTransition} from 'react-transition-group'

function Modal({children, modalOpen, setModalOpen}) {
    return (
        <Portal>
            <CSSTransition
                in={modalOpen}
                appear={true}
                timeout={200}
                classNames="fadeExpand"
                unmountOnExit
            >
                <Backdrop onClick={() => setModalOpen(false)}>
                    {children}
                </Backdrop>
            </CSSTransition>
        </Portal>
    )
}

export default Modal

const Backdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.1);
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