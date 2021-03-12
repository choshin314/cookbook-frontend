import styled from 'styled-components'
import { CSSTransition } from 'react-transition-group'

import { CardWrapper, media } from '../commonStyles'
import BookmarkBtn from '../recipe/BookmarkBtn'
import { Link } from 'react-router-dom'
import { transformImg } from '../../helpers'

function RecipeGridItem({ recipe }) {
    return (
        <CSSTransition
                in={!!recipe}
                appear={true}
                timeout={300}
                classNames="fade"
                unmountOnExit
        >
            <StyledCardWrapper>
                <Link to={`/recipes/view/${recipe.id}-${recipe.slug}`}>
                <ImgWrapper>
                    <picture>
                        <source srcSet={transformImg(recipe.coverImg, `c_fit,w_300`)} media="(min-width: 768px)"/>
                        <source srcSet={transformImg(recipe.coverImg, `c_fit,w_400`)} media="(min-width: 600px)"/>
                        <source srcSet={transformImg(recipe.coverImg, `c_fit,w_300`)} media="(min-width: 500px)"/>
                        <source srcSet={transformImg(recipe.coverImg, `c_fit,w_250`)} media="(min-width: 400px)"/>
                        <img src={transformImg(recipe.coverImg, `c_fit,w_200`)} 
                            alt={`Finished result of recipe for ${recipe.title}`}
                        />
                    </picture>
                </ImgWrapper>
                </Link>
                <Content>
                    <TitleLink to={`/recipes/view/${recipe.id}-${recipe.slug}`}>
                        {recipe.title}
                    </TitleLink>
                    <BtnWrapper>
                        <BookmarkBtn recipe={recipe} />
                    </BtnWrapper>
                </Content>
            </StyledCardWrapper>
        </CSSTransition>   
    )
}

export default RecipeGridItem

const StyledCardWrapper = styled(CardWrapper)`
    width: 100%;
`

const ImgWrapper = styled.div`
    width: 100%;
    height: 100px;
    border-radius: 5px 5px 0 0;
    overflow: hidden;
    img {
        object-fit: cover;
        width: 100%;
        height: 100%;
    }
    @media(min-width: ${media.small}) {
        height: 150px;
    }
`

const BtnWrapper = styled.span`
    font-size: .75rem;
`

const Content = styled.div`
    position: relative;
    padding: .5rem;
    display: flex;
    justify-content: space-between;
    @media(min-width: ${media.small}) {
        padding: .5rem 1rem;
    }
`

const TitleLink = styled(Link)`
    font-size: .75rem;
`