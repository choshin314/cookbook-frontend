import { NavLink } from 'react-router-dom' 
import styled from 'styled-components'
import { media } from '../commonStyles'

function FeedNav({loggedIn}) {
    return (
        <FeedMenu>
            {loggedIn && <FeedNavBtn activeClassName="active-navlink" to="/feeds/home">Home Recipes</FeedNavBtn>}
            <FeedNavBtn activeClassName="active-navlink" to="/feeds/top">Top Recipes</FeedNavBtn>
        </FeedMenu>
    )
}

export default FeedNav 

const FeedMenu = styled.div`
    border-bottom: 2px solid rgba(0,0,0,.3);
    display: flex;
`
const FeedNavBtn = styled(NavLink)`
    padding: .5rem 1rem;
    font-size: .75rem;
    font-weight: 600;
    color: var(--teal);
    background-color: white;
    border: 2px solid var(--teal);
    border-radius: 5px 5px 0 0;
    @media(min-width: ${media.medium}) {
        font-size: 1rem;
    }
    &.active-navlink {
        color: var(--accent);
        border: 2px solid var(--accent);
    }
`