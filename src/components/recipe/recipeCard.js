import styled from 'styled-components'
import {Link} from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'

import {media, CardWrapper} from '../commonStyles'
import Ratings from './Ratings'
import AvatarLink from '../shared/AvatarLink'
const user = {
    username: 'jsmith1',
    firstName: 'John',
    lastName: 'Smith',
    id: '123',
    bio: 'little short bio about me',
    profilePic: 'https://res.cloudinary.com/cookbookshare/image/upload/v1611854339/tfkznkctzjonladqs2lg.jpg'
}
export default function RecipeCard({recipe, user}) {
    return (
        <CardWrapper>
            <CSSTransition
                in={recipe}
                appear={true}
                timeout={300}
                classNames="fadeExpand"
                unmountOnExit
            > 
                <CardLayout>
                    <Header>
                        <AvatarLink 
                            user={user}
                        />
                    </Header>
                    <ImgCover to={`/recipes/view/${recipe.id}-${recipe.slug}`}>
                        <img src={recipe.coverImg} />
                    </ImgCover>
                    <Content>
                        <Link to={`/recipes/view/${recipe.id}-${recipe.slug}`}>
                            <CardTitle>{recipe.title}</CardTitle>
                        </Link>
                        <Ratings rating={recipe.rating} reviewCount={recipe.reviewCount}/>
                    </Content>
                </CardLayout>
            </CSSTransition>
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
    .fadeExpand-appear {
        opacity: 0;
    }
    .fadeExpand-appear-active {
        opacity: 1;
        transition: opacity .3s ease-out;
    }
    .fadeExpand-enter {
        opacity: 0;
    }
    .fadeExpand-enter-active {
        opacity: 1;
        transition: opacity .3s ease-out;
    }
    .fadeExpand-exit {
        opacity: 1;
    }
    .fadeExpand-exit-active {
        opacity: 0;
        transition: opacity .3s ease-out;
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