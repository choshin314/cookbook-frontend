import { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchFeedArchive, fetchFreshFeedItems, showFreshFeedItems } from '../../redux/actions/feedsActions'
import FeedList from './FeedList';

function Feed({ feedType, feed, fetchFeed, fetchNew, showNew }) {
    const { loading, error, [feedType]: { recipes, newRecipes, endOfList } } = feed;
    
    const getOlderRecipes = () => fetchFeed(feedType)
    const showNewerRecipes = () => showNew(feedType)

    useEffect(() => {
        if (recipes.length === 0) {
            getOlderRecipes();
        }
    }, [])

    useEffect(() => {
        const checkStuff = setInterval(() => {
            if (!loading && recipes.length > 0) {
                fetchNew('public')
            }
        }, 120000)
        return () => clearInterval(checkStuff);
    }, [loading, recipes])

    return (
        <FeedList 
            loading={loading}
            error={error}
            recipes={recipes}
            newerRecipesCount={newRecipes.length}
            showNewerRecipes={showNewerRecipes}
            getOlderRecipes={getOlderRecipes}
            endOfList={endOfList}
        />
    )
}

const mapState = state => ({ feed: state.feeds });
const mapDispatch = { 
    fetchFeed: fetchFeedArchive, 
    fetchNew: fetchFreshFeedItems, 
    showNew: showFreshFeedItems 
};

export default connect(mapState, mapDispatch)(Feed)