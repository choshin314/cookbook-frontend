import styled from 'styled-components'
import { media } from '../commonStyles';
import FollowBtn from '../profile/FollowBtn'
import AvatarLink from './AvatarLink'

function UserList({users}) {
    return (
        <StyledList>
            {users && users.map(u => (
                <UserCard key={u.id}>
                    <AvatarLink user={u} showNames/>
                    <FollowBtn profileUser={u} />
                </UserCard>
            ))}
        </StyledList>
    )
}

export default UserList;

const StyledList = styled.ol`
    list-style: none;
    padding: 0;
    margin: 0;
    border-top: 2px solid rgba(0,0,0,.3);
    background-color: white;
    height: 90%;
    overflow: auto;
`

const UserCard = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: .75rem;
    padding: .5rem 0;
    border-bottom: 2px solid rgba(0,0,0,.3);
    @media(min-width: ${media.full}) {
        font-size: 1rem;
    }
`