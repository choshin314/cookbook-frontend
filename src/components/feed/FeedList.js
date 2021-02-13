import { useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { fetchPubFeed } from '../../redux/actions/publicFeedActions'
import RecipeCard from '../recipe/RecipeCard'

function FeedList({ feed, fetchFeed }) {
    const { loading, error, recipes } = feed;
    useEffect(() => {
        fetchFeed();
    }, [])
    if (loading) return <div>Fetching Recipes</div>
    return (
        <StyledList>
            {recipes.map(r => <li key={r.id}><RecipeCard recipe={r} /></li>)}
        </StyledList>
    )
}

const mapStateToProps = state => ({ feed: state.publicFeed });
const mapDispatchToProps = { fetchFeed: fetchPubFeed };
export default connect(mapStateToProps, mapDispatchToProps)(FeedList)

const StyledList = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
`