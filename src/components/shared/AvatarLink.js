import styled from 'styled-components'
import {Link} from 'react-router-dom'

import genericAvatar from '../../assets/generic-avatar.png'
import { transformImg } from '../../helpers';

function AvatarLink({user, imgSize="50px", showCreatedBy, showNames}) {
    const parsedSize = parseInt(imgSize) + 10;
    return user ? (
        <AuthorDiv>
            <Link to={`/profile/view/${user.username}`}>
                <ImgDiv size={imgSize || '50px'}>
                    <img src={transformImg(user.profilePic, `c_fit,h_${parsedSize},w_${parsedSize}`) || genericAvatar}/>
                </ImgDiv>
            </Link>
            {showCreatedBy && <NameLink to={`/profile/view/${user.username}`}>by {user.firstName} {user.lastName}</NameLink>}
            {showNames && <NameLink to={`/profile/view/${user.username}`}>
                <UsernameSpan>{user.username}</UsernameSpan>
                <NameSpan>{user.firstName} {user.lastName}</NameSpan>
            </NameLink>}
        </AuthorDiv>
    ) : <div></div>
}

export default AvatarLink;

const AuthorDiv = styled.div`
    display: flex;
    align-items: center;
`
const ImgDiv = styled.div`
    width: ${props => props.size};
    height: ${props => props.size};
    border-radius: 50%;
    border: 2px solid var(--teal);
    overflow: hidden;
    img {
        object-fit: cover;
        object-position: center center;
        max-width: 100%;
    }
`

const NameLink = styled(Link)`
    margin-left: .5rem;
    display: flex;
    flex-direction: column;
`

const UsernameSpan = styled.span`
    font-weight: 500;
`
const NameSpan = styled.span`
    font-weight: 400;
    color: var(--med-grey);
`