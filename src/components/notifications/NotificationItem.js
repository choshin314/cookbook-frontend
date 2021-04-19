import styled from 'styled-components'

import { media } from '../commonStyles'
import { formatDate } from '../../helpers'

function NotificationItem({ notification }) {
    const getMessage = () => {
        if (notification.type === "follow") {
            return <span><strong>{`${notification.followerUsername} `}</strong>followed you!</span>
        } else if (notification.type === "review") {
            return <span>You have a new review for <strong>{notification.recipeTitle}</strong></span>
        }
    }

    return (
        <ListItem checked={notification.checked}>
            {getMessage()}
            <DateSpan>
                {formatDate(notification.createdAt)}
            </DateSpan>
        </ListItem>
    )

}

export default NotificationItem

const ListItem = styled.li`
    padding: .5rem;
    border-bottom: 2px solid rgba(0,0,0,.3);
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    font-size: .75rem;
    background-color: ${p => p.checked ? "white" : "var(--lite-grey)"};
    @media(min-width: ${media.medium}) {
        font-size: 1rem;
    }
`

const DateSpan = styled.span`
    font-size: .5rem;
    @media(min-width: ${media.small}) {
        font-size: .75rem;
    }
`