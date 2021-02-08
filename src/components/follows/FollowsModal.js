import { useHistory, useRouteMatch, Route, Link, NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import Modal from "../shared/Modal";
import useToggle from '../../hooks/toggle'
import FollowsListContainer from './FollowsListContainer';


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
            <ContentWrapper>
                <CloseBtn 
                    onClick={closeAndGoBack}
                    aria-label="close"
                    aria-role="button"
                >
                    <FontAwesomeIcon icon={faTimes} />
                </CloseBtn>
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
        </Modal>
    )
}

export default FollowsModal

const ContentWrapper = styled.article`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    max-width: 400px;
    height: 90%;
    max-height: 600px;
    padding: 1rem;
    background-color: white;
    border-radius: 5px;
`

const CloseBtn = styled.div`
    position: absolute;
    top: 1rem;
    right: 1rem;
    cursor: pointer;
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