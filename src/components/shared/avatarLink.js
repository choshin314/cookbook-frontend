import styled from 'styled-components'
import {Link} from 'react-router-dom'

function AvatarLink(props) {
    return (
        <AuthorDiv>
            <Link to={props.profileUrl}>
                <ImgDiv>
                    <img src={props.imgSrc}/>
                </ImgDiv>
            </Link>
            {props.name && <NameLink>Concocted by {props.name}</NameLink>}
        </AuthorDiv>
    )
}

export default AvatarLink;

const AuthorDiv = styled.div`
    display: flex;
    align-items: center;
`
const ImgDiv = styled.div`
    width: 50px;
    height: 50px;
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