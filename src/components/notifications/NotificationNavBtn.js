import styled from 'styled-components';

import { NavListItem } from "../layout/NavListItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { media } from '../commonStyles';

function NotificationNavBtn({ onClick, count }) {
    return (
        <NavListItem onClick={onClick}>
            <FontAwesomeIcon icon={faBell} />
            {count > 0 && <Counter>{count}</Counter>}
        </NavListItem>
    )
}

export default NotificationNavBtn 

const Counter = styled.span`
    position: absolute;
    top: -.25rem;
    right: .25rem;
    border-radius: 50%;
    color: white;
    background-color: var(--accent);
    text-align: center;
    font-weight: 500;
    font-size: .75rem;
    line-height: 1.25;
    height: 15px;
    width: 15px;

    @media(min-width: ${media.small}) {
        font-size: 1rem;
        line-height: 1.25;
        height: 1.25rem;
        width: 1.25rem;
    }
`