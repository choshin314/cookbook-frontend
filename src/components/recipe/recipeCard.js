import styled from 'styled-components'
import {Link} from 'react-router-dom'

import {media, CardWrapper} from '../commonStyles'
import Ratings from './ratings'
import AvatarLink from '../shared/avatarLink'

export default function RecipeCard({recipe}) {
    return (
        <CardWrapper>
            <CardLayout>
                <Header>
                    <AvatarLink 
                        imgSrc={recipe.creatorProfileImg}
                        userId={recipe.creatorId}
                        userName={recipe.creatorName}
                    />
                </Header>
                <ImgCover to={`/recipes/${recipe.id}-${recipe.slug}`}>
                    <img src={recipe.cover_img} />
                </ImgCover>
                <Content>
                    <Link to={`/recipes/${recipe.id}-${recipe.slug}`}>
                        <CardTitle>{recipe.name}</CardTitle>
                    </Link>
                    <Ratings rating={recipe.rating} reviewCount={recipe.reviewCount}/>
                </Content>
            </CardLayout>
        </CardWrapper>
    )
}

const CardLayout = styled.div`
    max-height: 300px;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 3fr 1fr;
    position: relative;
    @media(min-width: ${media.small}) {
        max-height: 500px;
    }
`

const Header = styled.header`
    padding: 1.5rem 1rem;
`

const ImgCover = styled(Link)`
    grid-row: span 3;
    overflow: hidden;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--med-grey);
    img {
        object-fit: cover;
        object-position: 50% 50%;
        height: 100%;;
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
    font-size: 1rem;
    margin-bottom: 1rem;
    @media(min-width: ${media.small}) {
        font-size: 1.25rem;
    }
    @media(min-width:${media.medium}) {
        margin-bottom: .5rem;
    }
`