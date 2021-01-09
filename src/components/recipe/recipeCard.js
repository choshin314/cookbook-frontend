import styled from 'styled-components'
import {Link} from 'react-router-dom'

import {media, CardWrapper} from '../commonStyles'
import Ratings from './ratings'
import AvatarLink from '../shared/avatarLink'

export default function RecipeCard(props) {
    return (
        <CardWrapper>
            <CardLayout>
                <Header>
                    <AvatarLink 
                        imgSrc="https://i.kinja-img.com/gawker-media/image/upload/t_original/ijsi5fzb1nbkbhxa2gc1.png" 
                        profileUrl="/someprofile"
                        name="Joe Smith"
                    />
                </Header>
                <ImgCover to={props.recipeUrl}>
                    <img src="https://i.kinja-img.com/gawker-media/image/upload/t_original/ijsi5fzb1nbkbhxa2gc1.png" />
                </ImgCover>
                <Content>
                    <Link to={props.recipeUrl}>
                        <CardTitle>Recipe Title Yum Yum Superlong</CardTitle>
                    </Link>
                    <Ratings rating={3.74} reviewCount={10}/>
                </Content>
            </CardLayout>
        </CardWrapper>
    )
}

const CardLayout = styled.div`
    max-height: 500px;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 3fr 1fr;
    position: relative;
`

const Header = styled.header`
    padding: 1.5rem 1rem;
`

const ImgCover = styled(Link)`
    grid-row: span 3;
    overflow: hidden;
    img {
        object-fit: cover;
        object-position: 50% 50%;
        width: 100%;
        height: 300px;
    }
`

const Content = styled.div`
    padding: 1.5rem 1rem;
    display: grid;
    grid-template-columns: 
    a > h2 {
        font-size: 1rem;
        margin-bottom: 1rem;
    }

`

const CardTitle = styled.h2`
    font-size: 1.25rem;
    margin-bottom: 1rem;
    @media(min-width:${media.medium}) {
        font-size: 1.5rem;
        margin-bottom: .5rem;
    }
`