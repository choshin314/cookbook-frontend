import styled from 'styled-components'
import { connect } from 'react-redux'
import { toggleSocial } from '../../redux/actions/socialActions';

function FollowBtn({following, toggleFollow, auth, profileUser}) {
    const isFollowing = following.userIds[profileUser.id];
    
    if (auth.user && auth.user.id === profileUser.id) return null;
    return (
        <Wrapper>
            <StyledBtn type="button" onClick={() => toggleFollow('following', 'userIds', profileUser.id)}>
                {isFollowing ? 'Unfollow' : 'Follow'}
            </StyledBtn>
        </Wrapper>
    )
}

const mapState = state => ({ following: state.social.following, auth: state.auth })
const mapDispatch = { toggleFollow: toggleSocial }

export default connect(mapState, mapDispatch)(FollowBtn);

const Wrapper = styled.div`
    width: 100px;
`

const StyledBtn = styled.button`
    width: 100%;
`