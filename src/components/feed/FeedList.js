import { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchPubFeed } from '../../redux/actions/publicFeedActions'
import RecipeCard from '../recipe/RecipeCard'

function FeedList({ feed, fetchFeed }) {
    const { loading, error, recipes } = feed;
    useEffect(() => {
        fetchFeed();
    }, [])
    if (loading) return <div>Fetching Recipes</div>
    return (
        <ul>
            {recipes.map(r => <li key={r.id}><RecipeCard recipe={r} /></li>)}
        </ul>
    )
}

const mapStateToProps = state => ({ feed: state.publicFeed });
const mapDispatchToProps = { fetchFeed: fetchPubFeed };
export default connect(mapStateToProps, mapDispatchToProps)(FeedList)