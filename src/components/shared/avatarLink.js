import styled from 'styled-components'
import {Link} from 'react-router-dom'

function AvatarLink(props) {
    return (
        <AuthorDiv>
            <Link to={`/profiles/${props.userId}`}>
                <ImgDiv size={props.imgSize || '50px'}>
                    <img src={props.imgSrc}/>
                </ImgDiv>
            </Link>
            {props.userName && <NameLink to={`/profiles/${props.userId}`}>Created by {props.userName}</NameLink>}
        </AuthorDiv>
    )
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
`