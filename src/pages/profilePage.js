import {useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import {connect} from 'react-redux'

import { Main } from '../components/commonStyles'
import ProfileView from '../components/profile/ProfileView'
import { fetchProfile } from '../redux/actions/profileActions'

function ProfilePage({ profile, fetchProfile }) {
    const { username } = useParams();
    const { user, stats, loading, error } = profile;

    useEffect(() => {
        fetchProfile(username);
    }, [username])

    return (
        <Main>
            {!loading && user && stats && <ProfileView user={user} stats={stats} />}
        </Main>
    )
}

const mapStateToProps = (global) => ({ profile: global.profile });
const mapDispatchToProps = { fetchProfile: fetchProfile }

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);