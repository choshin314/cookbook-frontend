import { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchFeedArchive, fetchFeedFirst, fetchFreshFeedItems, showFreshFeedItems } from '../../redux/actions/feedsActions'
import FeedList from './FeedList';

function Feed({ feedType, feed, fetchInitial, fetchOlder, fetchNew, showNew }) {
    const { loading, error, [feedType]: { recipes, newRecipes, endOfList } } = feed;

    const showNewerRecipes = () => showNew(feedType)

    useEffect(() => {
        fetchInitial(feedType)
    }, [ feedType, fetchInitial ])

    useEffect(() => {
        const checkStuff = setInterval(() => {
            if (!loading && recipes.length > 0) {
                fetchNew(feedType)
            }
        }, 60000)
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
                    fetchOlder(feedType)
                } 
            })
        }, options)
        observer.observe(document.getElementById(targetId));
    }, [endOfList, feedType, fetchOlder])

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
    fetchInitial: fetchFeedFirst,
    fetchOlder: fetchFeedArchive, 
    fetchNew: fetchFreshFeedItems, 
    showNew: showFreshFeedItems 
};

export default connect(mapState, mapDispatch)(Feed)