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
    }, [feedType, recipes.length])

    useEffect(() => {
        const checkStuff = setInterval(() => {
            if (!loading && recipes.length > 0) {
                fetchNew(feedType)
            }
        }, 120000)
        return () => clearInterval(checkStuff);
    }, [loading, recipes, feedType])

    useEffect(() => {
        const targetId = feedType === 'public' ? 'btm-public-feed' : 'btm-private-feed';
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: .5
        }
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !loading && !endOfList) {
                    getOlderRecipes();
                } 
            })
        }, options)
        observer.observe(document.getElementById(targetId));
    }, [endOfList, feedType])

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