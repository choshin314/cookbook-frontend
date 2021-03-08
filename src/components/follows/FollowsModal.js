import { useHistory, useRouteMatch, Route, Link, NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import Modal from "../shared/Modal";
import useToggle from '../../hooks/toggle'
import FollowsListContainer from './FollowsListContainer';
import CloseBtn from '../shared/CloseBtn'
import { CSSTransition } from 'react-transition-group';


function FollowsModal({username, prevURL}) {
    const match = useRouteMatch();
    const history = useHistory();
    const [modalOpen, toggleModal] = useToggle(true);
    const closeAndGoBack = () => {
        toggleModal();
        setTimeout(() => history.push(prevURL), 200);
    }

    return (
        <Modal backdrop modalOpen={modalOpen} toggleModal={closeAndGoBack} >
            <CSSTransition
                in={modalOpen}
                classNames="pop-in"
                appear={true}
                timeout={200}
                unmountOnExit={true}
            >
                <ContentWrapper>
                    <CloseBtn onClick={closeAndGoBack} />
                    <NavLinks>
                        <NavLinkBtn to={`${match.url}/followers`} activeClassName="active-nav">
                            Followers
                        </NavLinkBtn>
                        <NavLinkBtn to={`${match.url}/following`} activeClassName="active-nav">
                            Following
                        </NavLinkBtn>
                    </NavLinks>
                    <Route path={`${match.url}/followers`}>
                        <FollowsListContainer username={username} userType="followers"/> 
                    </Route>
                    <Route path={`${match.url}/following`}>
                        <FollowsListContainer username={username} userType="following"/> 
                    </Route>
                </ContentWrapper>
            </CSSTransition>
        </Modal>
    )
}

export default FollowsModal

const ContentWrapper = styled.article`
    position: fixed;
    top: 50%;
    left: 50%;
    display: flex;
    flex-direction: column;
    transform: translate(-50%, -50%);
    width: 100%;
    max-width: 400px;
    height: 90%;
    max-height: 600px;
    padding: 1rem;
    background-color: white;
    border-radius: 5px;
    &.pop-in-enter, &.pop-in-appear {
        transform: scale(1.15) translate(-50%, -50%);
        transform-origin: 0 0;
        opacity: 0;
    }
    &.pop-in-enter-active, &.pop-in-appear-active {
        transform: scale(1) translate(-50%, -50%);
        transform-origin: 0 0;
        opacity: 1;
        transition: transform .2s ease-in, opacity .2s ease-in;
    }
    &.pop-in-exit {
        opacity: 1;
        transform: scale(1) translate(-50%, -50%);
        transform-origin: 0 0;
    }
    &.pop-in-exit-active {
        transform: scale(1.15) translate(-50%, -50%);
        opacity: 0;
        transition: transform .2s ease-in, opacity .2s ease-in;
    }
`

const NavLinks = styled.nav`
    display: flex;
    margin-bottom: 1rem;
    justify-content: center;
    width: 100%;
`

const NavLinkBtn = styled(NavLink)`
    color: var(--med-grey);
    position: relative;
    margin: 0 2rem;

    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 2px;
        border-radius: 10px;
        background-color: var(--teal);
        transform: scaleX(0);
    }
    &.active-nav {
        color: var(--teal);
    }
    &.active-nav::after {
        transform: scaleX(1);
        transition: transform .2s ease-in;
    }
`