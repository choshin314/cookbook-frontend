import styled from 'styled-components'
import { CSSTransition } from 'react-transition-group'

import NotificationItem from './NotificationItem'
import { media, StyledOL } from '../commonStyles'

function NotificationList({ notifications, show }) {
    return (
        <CSSTransition
            in={show}
            classNames="pop-in"
            appear={true}
            timeout={200}
            unmountOnExit={true}
        >
            <Container>
                <StyledOL>
                    {notifications.map(n => (
                        <NotificationItem key={n.id} notification={n} />
                    ))}
                </StyledOL>
            </Container>
        </CSSTransition>
    )
}

export default NotificationList

const Container = styled.div`
    position: absolute;
    top: 42px;
    right: 0;
    width: 100%;
    max-width: ${media.small};
    height: calc(90vh - 90px);
    background-color: white;
    border: var(--lite-med-grey) 2px solid;
    border-top: none;
    border-radius: 5px;

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

