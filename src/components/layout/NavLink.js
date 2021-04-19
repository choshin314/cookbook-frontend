import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { NavListItem } from './NavListItem'

function NavLink({to, label, icon}) {
    return (
        <NavListItem>
            <Link to={to} aria-label={`Nav link to ${label}`} title={label}>
                <FontAwesomeIcon icon={icon} />
            </Link>
        </NavListItem>
    )
}

export default NavLink;