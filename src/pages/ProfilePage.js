import { useEffect } from 'react'
import { useParams, useRouteMatch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import { fetchProfile } from '../redux/actions/profileActions'
import { Main } from '../components/commonStyles'
import ProfileView from '../components/profile/ProfileView'
import FollowsModal from '../components/follows/FollowsModal'
import HelmetHead from '../components/shared/HelmetHead';

function ProfilePage({ profile, authedUser, dispatchFetchProfile }) {
    const { username } = useParams();
    const { user : profileUser, stats, loading, error } = profile;
    const match = useRouteMatch()

    useEffect(() => {
        dispatchFetchProfile(username);
    }, [username])
    
    return (
        <Main>
            <HelmetHead title={username + "'s Profile"} />
            {!loading && profileUser && stats && <ProfileView 
                profile={profile} 
                profileUrl={match.url} 
                isOwnedByUser={authedUser && profileUser.id === authedUser.id}
            />}
            <Route path={`${match.url}/subs`} >
                <FollowsModal username={username} prevURL={match.url} />
            </Route>
        </Main>
    )
}
const mapStateToProps = (state) => ({ profile: state.profile, authedUser: state.auth.user });
const mapDispatchToProps = { dispatchFetchProfile: fetchProfile }

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);