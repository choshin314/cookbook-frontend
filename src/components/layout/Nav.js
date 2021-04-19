import {connect} from 'react-redux'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUserCircle, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons'

import NavLink from './NavLink'
import {logoutUser} from '../../redux/actions/authActions'
import {media} from '../commonStyles'
import Notification from '../notifications/Notification'

function Nav({logout, user}) {
    return (
        <Navbar>
            <ul>
                <NavLink
                    to="/"
                    label="Home Feed"
                    icon={faHome}
                />
                <NavLink
                    to="/recipes/create"
                    label="Create Recipe"
                    icon={faPlusSquare}
                />
                <NavLink
                    to="/profile/me"
                    label="Profile"
                    icon={faUserCircle}
                />
                <Notification />
                {!user && (<NavLink
                    to="/account/login"
                    label="Sign In"
                    icon={faSignInAlt}
                />)}
                {user && (<AuthBtn type="button" aria-label="Sign Out" onClick={() => logout()}>
                    <FontAwesomeIcon icon={faSignOutAlt} title="Sign Out" />
                </AuthBtn>)}
            </ul>
        </Navbar>
    )
}

const mapStateToProps = global => ({ user: global.auth.user })
const mapDispatchToProps = { logout: logoutUser }
export default connect(mapStateToProps, mapDispatchToProps)(Nav);



const Navbar = styled.nav`
    flex: auto;
    ul {
        display: flex;
        list-style: none;
        padding: 0;
        margin: 0;
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
        @media(min-width: 450px) {
            justify-content: flex-end;
        }
    }
`

const AuthBtn = styled.button`
    padding: 0 .5rem;
    background: transparent;
    border: none;
    color: var(--teal);
    font-size: 1.15rem;
    color: var(--teal);
    @media(min-width: 320px) {
        font-size: 1.25rem;
    }
    @media(min-width: ${media.small}) {
        font-size: 1.5rem;
        padding: 0 1rem;
    }
`