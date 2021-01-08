import styled from 'styled-components'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUsers, faUserCircle, faPlus } from '@fortawesome/free-solid-svg-icons'

import {media} from '../commonStyles'

export default function Nav() {
    return (
        <Navbar>
            <ul>
                <NavItem
                    to="/"
                    label="Home Feed"
                    icon={faHome}
                />
                <NavItem
                    to="/following"
                    label="Following"
                    icon={faUsers}
                />
                <NavItem
                    to="/create"
                    label="Create Recipe"
                    icon={faPlus}
                />
                <NavItem
                    to="/profile"
                    label="Profile"
                    icon={faUserCircle}
                />
            </ul>
        </Navbar>
    )
}

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
        padding-left: 0;
        width: 100%;
        justify-content: center;
    }
    li {
        padding: 1rem;
    }
`

const ListItem = styled.li`
    padding: 1rem;
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