import { connect } from "react-redux";

import styled from 'styled-components'
import EditBio from './EditBio'
import EditEmail from './EditEmail'
import EditPassword from './EditPassword'
import EditProfilePic from './EditProfilePic'
import EditUsername from './EditUsername'

function AccountView ({user}) {
    return (
        <Container>
            <h1>Account Settings</h1>
            <EditUsername user={user} />
            <EditEmail user={user} />
            <EditProfilePic user={user} />
            <EditBio user={user} />
            <EditPassword user={user} />
        </Container>
    )
}

const mapState = state => ({ user: state.auth.user });
export default connect(mapState)(AccountView)

const Container = styled.div`
    padding: 1rem;
`
