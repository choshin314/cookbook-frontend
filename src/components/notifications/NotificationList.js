import styled from 'styled-components'
import { CSSTransition } from 'react-transition-group'

import NotificationItem from './NotificationItem'
import { media, StyledOL } from '../commonStyles'

function NotificationList({ notifications, show, toggle }) {

    return (
        <CSSTransition
            in={show}
            classNames="pop-in"
            appear={true}
            timeout={200}
            unmountOnExit={true}
        >
            <Container>
                <OL onClick={toggle}>
                    {notifications.map(n => (
                        <NotificationItem key={n.id} notification={n} />
                    ))}
                </OL>
                <Backdrop onClick={toggle}></Backdrop>
            </Container>
        </CSSTransition>
    )
}

export default NotificationList

const Backdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 0;
`

export const OL = styled(StyledOL)`
    position: relative;
    border-top: none;
    z-index: 1;
`

const Container = styled.div`
    position: absolute;
    top: 42px;
    right: 0;
    width: 100%;
    max-width: ${media.small};
    height: calc(90vh - 90px);
    background-color: white;
    border: var(--lite-med-grey) 2px solid;
    border-top: .75rem solid var(--lite-grey);
    border-bottom: .75rem solid var(--lite-grey);
    border-radius: 5px;
    overflow-y: auto;
    padding-top: .5rem;

    @media(min-width: ${media.small}) {
        top: 58px;
        height: calc(90vh - 106px);
    }

    &.pop-in-enter, &.pop-in-appear {
        transform: scale(1.15);
        transform-origin: 0 0;
        opacity: 0;
    }
    &.pop-in-enter-active, &.pop-in-appear-active {
        transform: scale(1);
        transform-origin: 0 0;
        opacity: 1;
        transition: transform .2s ease-in, opacity .2s ease-in;
    }
    &.pop-in-exit {
        opacity: 1;
        transform: scale(1);
        transform-origin: 0 0;
    }
    &.pop-in-exit-active {
        transform: scale(1.15);
        opacity: 0;
        transition: transform .2s ease-in, opacity .2s ease-in;
    }
`

