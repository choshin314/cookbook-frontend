import { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchFeedArchive, fetchFreshFeedItems, showFreshFeedItems } from '../../redux/actions/feedsActions'
import FeedList from './FeedList';

function Feed({ feedType, feed, fetchFeed, fetchNew, showNew }) {
    const { loading, error, [feedType]: { recipes, newRecipes, endOfList } } = feed;

    const showNewerRecipes = () => showNew(feedType)

    useEffect(() => {
        if (recipes.length === 0) {
            fetchFeed(feedType)
        }
    }, [feedType, recipes.length, fetchFeed])

    useEffect(() => {
        const checkStuff = setInterval(() => {
            if (!loading && recipes.length > 0) {
                fetchNew(feedType)
            }
        }, 120000)
        return () => clearInterval(checkStuff);
    }, [loading, recipes, feedType, fetchNew])

    useEffect(() => {
        const targetId = feedType === 'public' ? 'btm-public-feed' : 'btm-private-feed';
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: .5
        }
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !endOfList) {
                    fetchFeed(feedType)
                } 
            })
        }, options)
        observer.observe(document.getElementById(targetId));
    }, [endOfList, feedType, fetchFeed])

    return (
        <FeedList 
            feedType={feedType}
            loading={loading}
            error={error}
            recipes={recipes}
            newerRecipesCount={newRecipes.length}
            showNewerRecipes={showNewerRecipes}
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