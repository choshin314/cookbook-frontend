import styled from 'styled-components'
import {Link} from 'react-router-dom'

function AvatarLink({user, imgSize, showCreatedBy, showNames}) {
    return user ? (
        <AuthorDiv>
            <Link to={`/profile/view/${user.username}`}>
                <ImgDiv size={imgSize || '50px'}>
                    <img src={user.profilePic}/>
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