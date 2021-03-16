import { useEffect } from 'react'
import { Redirect, Route, Switch, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'

import { Main } from '../components/commonStyles'
import FeedNav from '../components/feed/FeedNav'
import Feed from '../components/feed/Feed'
import { setFlash } from '../redux/actions/flashActions'
import HelmetHead from '../components/shared/HelmetHead'

function Home({user, dispatchSetFlash}) {
    const { pathname } = useLocation();
    useEffect(() => {
        if (!user && pathname === '/feeds/home') {
            dispatchSetFlash('info', 'Log in to see your friends\' recipes')
        }
    }, [pathname, user, dispatchSetFlash])
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
export default connect(mapState, { dispatchSetFlash: setFlash })(Home);