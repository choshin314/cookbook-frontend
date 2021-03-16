import React from 'react'
import styled from 'styled-components'
import { media, StyledOL } from '../commonStyles';
import FollowBtn from '../profile/FollowBtn'
import AvatarLink from './AvatarLink'

const UserList = React.forwardRef((props, ref) => {
    const {users, observer} = props;
    return (
        <StyledOL ref={ref}>
            {users && users.map(u => (
                <UserCard key={u.id}>
                    <AvatarLink user={u} showNames/>
                    <FollowBtn profileUser={u} />
                </UserCard>
            ))}
            {observer && <li>{observer}</li>} {/*
                Will pass down intersectionObserver component if/when I want some
                action to be triggered at the bottom of the list (e.g. infinite scroll)
            */}
        </StyledOL>
    )
})

export default UserList;


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