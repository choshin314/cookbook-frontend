import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { media } from '../commonStyles'
import { formatDate } from '../../helpers'

function NotificationItem({ notification }) {
    const { category, createdAt, checked, follower, review } = notification;
    const getMessage = () => {
        if (category === "follow") {
            return <span><strong>{`@${follower.username} `}</strong>followed you!</span>
        } else if (category === "review") {
            return (
                <span>
                    {`@${review.reviewer.username} rated `}
                    <strong>{review.recipe.title} </strong> 
                    {`${review.rating} stars`}
                    
                </span>
            )
        }
    }

    const getLinkURL = () => {
        if (category === "review") {
            return `/recipes/view/${review.recipe.id}-${review.recipe.slug}`
        }
        if (category === "follow") {
            return {
                pathname: `/profile/view/${follower.username}`,
                state: { userId: follower.id }
            }
        }
    }

    return (
        <ListItem checked={checked}>
            <Link to={getLinkURL()} title={category === "follow" ? "View their profile" : "View recipe"}>
                {getMessage()}
                <DateSpan>
                    {formatDate(new Date(createdAt))}
                </DateSpan>
            </Link>
        </ListItem>
    )

}

export default NotificationItem

const ListItem = styled.li`
    padding: .75rem .5rem;
    border-bottom: 2px solid rgba(10,10,10,.1);
    cursor: pointer;
    font-size: .75rem;
    background-color: ${p => p.checked ? "white" : "var(--lite-grey)"};

    a {
        text-decoration: none;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 100%;
   }
`

const DateSpan = styled.span`
    flex: 0 0 80px;
    font-size: .5rem;
    text-align: right;
    @media(min-width: ${media.small}) {
        font-size: .75rem;
    }
`