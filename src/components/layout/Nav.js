import {connect} from 'react-redux'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUsers, faUserCircle, faPlus, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons'

import {logoutUser} from '../../redux/actions/authActions'
import {media} from '../commonStyles'
import {useState} from 'react'

function Nav({logout, user}) {
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <Navbar>
            <ul>
                <NavItem
                    to="/"
                    label="Home Feed"
                    icon={faHome}
                />
                <NavItem
                    to="/recipes/create"
                    label="Create Recipe"
                    icon={faPlusSquare}
                />
                <NavItem
                    to="/profile/me"
                    label="Profile"
                    icon={faUserCircle}
                />
                {!user && (<NavItem
                    to="/account/login"
                    label="Sign In"
                    icon={faSignInAlt}
                />)}
                {user && (<AuthBtn type="button" aria-label="Sign Out" onClick={logout}>
                    <FontAwesomeIcon icon={faSignOutAlt} title="Sign Out" />
                </AuthBtn>)}
            </ul>
        </Navbar>
    )
}

const mapStateToProps = global => ({ user: global.auth.user })
const mapDispatchToProps = { logout: logoutUser }
export default connect(mapStateToProps, mapDispatchToProps)(Nav);

function NavItem({to, label, icon}) {
    return (
        <ListItem>
            <Link to={to} aria-label={`Nav link to ${label}`} title={label}>
                <FontAwesomeIcon icon={icon} />
            </Link>
        </ListItem>
    )
}

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

const ListItem = styled.li`
    padding: 0 1rem;
    a {
        font-size: 1.15rem;
        color: var(--teal);
        @media(min-width: 320px) {
            font-size: 1.5rem;
        }
        @media(min-width: ${media.small}) {
            font-size: 2rem;
        }
    }
`

const AuthBtn = styled.button`
    padding: 0 1rem;
    background: transparent;
    border: none;
    color: var(--teal);
    font-size: 1.15rem;
    color: var(--teal);
    @media(min-width: 320px) {
        font-size: 1.5rem;
    }
    @media(min-width: ${media.small}) {
        font-size: 2rem;
    }
`