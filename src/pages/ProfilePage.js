import { useEffect } from 'react'
import { useParams, useHistory, useLocation, useRouteMatch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import { fetchProfile, clearProfile } from '../redux/actions/profileActions'
import { Main } from '../components/commonStyles'
import ProfileView from '../components/profile/ProfileView'
import FollowsModal from '../components/follows/FollowsModal'
import HelmetHead from '../components/shared/HelmetHead';

function ProfilePage({ profile, authedUser, dispatchFetchProfile, dispatchClearProfile }) {
    const { username } = useParams();
    const { user : profileUser  } = profile;
    const match = useRouteMatch()
    const location = useLocation()
    const history = useHistory();
    console.log(history)
    console.log(location)

    useEffect(() => {
        if (location.state && location.state.userId) {
            dispatchFetchProfile(username, location.state.userId, history.replace)
        } else dispatchFetchProfile(username, null, history.replace)
        return () => dispatchClearProfile()
    }, [
        username, 
        location.state,
        history.replace,
        dispatchFetchProfile, 
        dispatchClearProfile 
    ])
    
    return (
        <Main>
            <HelmetHead title={username + "'s Profile"} />
            <ProfileView 
                profile={profile} 
                profileUrl={match.url} 
                isOwnedByUser={authedUser && profileUser && profileUser.id === authedUser.id}
            />
            <Route path={`${match.url}/subs`} >
                <FollowsModal username={username} prevURL={match.url} />
            </Route>
        </Main>
    )
}
const mapStateToProps = (state) => ({ profile: state.profile, authedUser: state.auth.user });
const mapDispatchToProps = { 
    dispatchFetchProfile: fetchProfile,
    dispatchClearProfile: clearProfile
 }

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);