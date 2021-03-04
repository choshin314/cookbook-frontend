import styled from 'styled-components'
import {Link} from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'

import {media, CardWrapper} from '../commonStyles'
import Ratings from './Ratings'
import AvatarLink from '../shared/AvatarLink'
import BookmarkBtn from './BookmarkBtn'
import { transformImg } from '../../helpers'

export default function RecipeCard({recipe}) {
    return (
        <CardWrapper>
            <CSSTransition
                in={!!recipe}
                appear={true}
                timeout={300}
                classNames="fadeExpand"
                unmountOnExit
            > 
                <CardLayout>
                    <Header>
                        <AvatarLink 
                            user={recipe.user}
                            showCreatedBy
                            imgSize="40px"
                        />
                        <BookmarkBtn recipe={recipe} />
                    </Header>
                    <ImgCover to={`/recipes/view/${recipe.id}-${recipe.slug}`}>
                        <picture>
                            <source srcset={transformImg(recipe.coverImg, `c_fit,w_800`)} media="(min-width: 768px)"/>
                            <source srcset={transformImg(recipe.coverImg, `c_fit,w_700`)} media="(min-width: 600px)"/>
                            <source srcset={transformImg(recipe.coverImg, `c_fit,w_600`)} media="(min-width: 500px)"/>
                            <source srcset={transformImg(recipe.coverImg, `c_fit,w_500`)} media="(min-width: 400px)"/>
                            <img src={transformImg(recipe.coverImg, `c_fit,w_412`)} 
                                alt={`Finished result of recipe for ${recipe.title}`}
                            />
                        </picture>
                    </ImgCover>
                    <Content>
                        <Link to={`/recipes/view/${recipe.id}-${recipe.slug}`}>
                            <CardTitle>{recipe.title}</CardTitle>
                        </Link>
                        <Ratings rating={recipe.avgRating} reviewCount={recipe.reviewCount}/>
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
    padding: .5rem 1rem;
    display: flex;
    justify-content: space-between;
    font-size: 1rem;
    
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
        height: 100%;
        width: 100%;
    }
`

const Content = styled.div`
    padding: .5rem 1rem;
    display: grid;
    @media(min-width: ${media.medium}) {
        padding: 1rem;
    }
`

const CardTitle = styled.h2`
    font-size: 1rem;
    margin-bottom: .5rem;
`