import {useState, useEffect} from 'react'
import {useParams, useRouteMatch, Link, Route} from 'react-router-dom'
import {connect} from 'react-redux'

import { Main } from '../components/commonStyles'
import ProfileView from '../components/profile/ProfileView'
import { fetchProfile } from '../redux/actions/profileActions'
import FollowsModal from '../components/follows/FollowsModal'

function ProfilePage({ profile, fetchProfile }) {
    const { username } = useParams();
    const { user, stats, loading, error } = profile;
    const match = useRouteMatch()

    useEffect(() => {
        fetchProfile(username);
    }, [username])

    return (
        <Main>
            {!loading && user && stats && <ProfileView user={user} stats={stats} profileUrl={match.url}/>}
            <Route path={`${match.url}/subs`} ><FollowsModal username={username} prevURL={match.url} /></Route>
        </Main>
    )
}

const mapStateToProps = (global) => ({ profile: global.profile });
const mapDispatchToProps = { fetchProfile: fetchProfile }

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);