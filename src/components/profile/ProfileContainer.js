import { useEffect } from 'react'
import { useParams, useRouteMatch, Link, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import { Main } from '../commonStyles'
import ProfileView from './ProfileView'
import { fetchProfile } from '../../redux/actions/profileActions'
import FollowsModal from '../follows/FollowsModal'

function ProfileContainer({ profile, authedUser, dispatchFetchProfile }) {
    const { username } = useParams();
    const { user : profileUser, stats, loading, error } = profile;
    const match = useRouteMatch()

    useEffect(() => {
        dispatchFetchProfile(username);
    }, [username])
    console.log(profile);
    return (
        <>
            {!loading && profileUser && stats && <ProfileView 
                profile={profile} 
                profileUrl={match.url} 
                isOwnedByUser={authedUser && profileUser.id === authedUser.id}
            />}
            <Route path={`${match.url}/subs`} >
                <FollowsModal username={username} prevURL={match.url} />
            </Route>
        </>
    )
}

const mapStateToProps = (state) => ({ profile: state.profile, authedUser: state.auth.user });
const mapDispatchToProps = { dispatchFetchProfile: fetchProfile }

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);