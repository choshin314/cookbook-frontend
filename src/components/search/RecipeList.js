import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { media, StyledOL } from '../commonStyles';
import Ratings from '../recipe/Ratings'
import { transformImg } from '../../helpers'

function RecipeList({recipes}) {
    return (
        <StyledOL>
            {recipes && recipes.map(r => (
                <RecipeListItem key={r.id}>
                    <RecipeInfo>
                        <RecipeTitle to={`/recipes/view/${r.id}-${r.slug}`}>{r.title}</RecipeTitle>
                        <Ratings rating={r.avgRating} reviewCount={r.reviewCount} />
                        <RecipeBy to={`/profile/view/${r.user.username}`}>By {r.user.username}</RecipeBy>
                    </RecipeInfo>
                    <RecipeImgWrap>
                        <img src={transformImg(r.coverImg, 'c_fit,h_110,w_110')} />
                    </RecipeImgWrap>
                </RecipeListItem>
            ))}
        </StyledOL>
    )
}

export default RecipeList;


const RecipeListItem = styled.li`
    padding: .5rem 0;
    border-bottom: 2px solid rgba(0,0,0,.3);
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const RecipeInfo = styled.div`
    flex: 1 1 auto;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    padding-right: .5rem;
`
const RecipeTitle = styled(Link)`
    font-weight: 600;
    font-size: .9rem;
    margin-bottom: .5rem;
    @media(min-width: ${media.medium}) {
        font-size: 1rem;
    }
`
const RecipeBy = styled(Link)`
    font-size: .75rem;
    font-weight: 500;
    margin-top: .5rem;
    @media(min-width: ${media.medium}) {
        font-size: 1rem;
    }
`

const RecipeImgWrap = styled.div`
    flex: 0 0 100px;
    width: 100px;
    height: 100px;
    border-radius: 5px;
    overflow: hidden;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`