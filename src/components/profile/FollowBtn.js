import styled from 'styled-components'
import { connect } from 'react-redux'
import { toggleSocial } from '../../redux/actions/socialActions';

function FollowBtn({following, toggleFollow, auth, profileUser}) {
    const isFollowing = following.userIds[profileUser.id];
    
    if (auth.user && auth.user.id === profileUser.id) return null;
    return (
        <Wrapper>
            <StyledBtn type="button" onClick={() => toggleFollow('following', 'userIds', profileUser.id)}>
                {isFollowing ? 'Following' : 'Follow'}
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
    position: relative;
    width: 100%;
    color: var(--med-grey);
    border: 2px solid var(--med-dark-grey);
    border-radius: 5px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.16), 0 1px 2px rgba(0,0,0,0.23);

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        box-shadow: 0 2px 5px rgba(0,0,0,0.25), 0 2px 5px rgba(0,0,0,0.22);
        opacity: 0;
        transition: opacity .2s ease-in;
    }
    &:hover::before {
        opacity: 1;
    }
`