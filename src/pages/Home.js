import { Redirect, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import { Main } from '../components/commonStyles'
import FeedNav from '../components/feed/FeedNav'
import Feed from '../components/feed/Feed'
import HelmetHead from '../components/shared/HelmetHead'

function Home({user}) {
    
    return (
        <Main >
            <HelmetHead title="Home" />
            <FeedNav loggedIn={!!user}/>
            <Switch>
                <Route exact path="/feeds/home">
                    {!user && <Redirect to="/feeds/top" />}
                    {user && <Feed feedType="private" />}
                </Route>
                <Route exact path="/feeds/top">
                    <Feed feedType="public" />
                </Route>
            </Switch>
        </Main>
    )
}
const mapState = state => ({ user: state.auth.user })
export default connect(mapState)(Home);