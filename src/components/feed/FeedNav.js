import { NavLink } from 'react-router-dom' 
import styled from 'styled-components'
import { media } from '../commonStyles'

function FeedNav() {
    return (
        <FeedMenu>
            <FeedNavBtn activeClassName="active-navlink" to="/home-feed">Home Recipes</FeedNavBtn>
            <FeedNavBtn activeClassName="active-navlink" to="/public-feed">Top Recipes</FeedNavBtn>
        </FeedMenu>
    )
}

export default FeedNav 

const FeedMenu = styled.nav`
`
const FeedNavBtn = styled(NavLink)`
    padding: .5rem 1rem;
    font-size: .75rem;
    font-weight: 500;
    color: white;
    background-color: var(--teal);
    @media(min-width: ${media.medium}) {
        font-size: 1rem;
    }
    &.active-navlink {
        color: var(--teal);
        background-color: var(--accent);
    }
`