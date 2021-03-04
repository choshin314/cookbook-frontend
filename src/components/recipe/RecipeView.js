import styled from 'styled-components'

import {Main, PageTitle, Wrapper} from '../commonStyles'
import Ratings from './Ratings'
import IntroSection from './IntroSection'
import IngredientsSection from './IngredientsSection'
import InstructionsSection from './InstructionsSection'
import BookmarkBtn from './BookmarkBtn'
import FollowBtn from '../profile/FollowBtn'
import Flash from '../shared/Flash'
import AvatarLink from '../shared/AvatarLink'
import EditTitle from './recipeEdit/EditTitle'
import useRecipeViewContext from '../../hooks/recipeViewContextHook'
import TagsSection from './TagsSection'
import ReviewsSection from './ReviewsSection'
import DeleteRecipe from './DeleteRecipe'

function RecipeView({ onDelete }) {
    const { recipe, isOwnedByUser } = useRecipeViewContext();
    console.log(recipe);
    return (
        <Main>
            <Flash />
            <Container>
                <Wrapper as="div">
                    <TitleDiv>
                        <PageTitle align="left">{recipe.title}</PageTitle>
                        <BookmarkBtn recipe={recipe} />
                        {isOwnedByUser && <EditTitle recipe={recipe} />}
                        {isOwnedByUser && <DeleteBtnWrapper>
                            <DeleteRecipe onDelete={onDelete}/>
                        </DeleteBtnWrapper>}
                    </TitleDiv>
                    
                    <div className="margin-btm-1">
                        <Ratings rating={recipe.avgRating} reviewCount={recipe.reviewCount} />
                    </div>
                    <StyledDiv className="margin-btm-1">
                        <AvatarLink user={recipe.user} showCreatedBy/>
                    </StyledDiv>
                    <StyledDiv>
                        <FollowBtn profileUser={recipe.user}/>
                    </StyledDiv>
                </Wrapper>
                <IntroSection />
                <IngredientsSection 
                    recipe={recipe}
                    isOwnedByUser={isOwnedByUser}
                    ingredients={recipe.ingredients}
                />
                <InstructionsSection
                    recipe={recipe}
                    isOwnedByUser={isOwnedByUser}
                    instructions={recipe.instructions}
                />
                <TagsSection
                    recipe={recipe}
                    isOwnedByUser={isOwnedByUser}
                    tags={recipe.tags}
                />
                <ReviewsSection
                    recipe={recipe}
                    isOwnedByUser={isOwnedByUser}
                    reviews={recipe.reviews}
                />
            </Container>
        </Main>
    )
}

export default RecipeView;

const Container = styled.div`
    padding: 2rem 0;
`
const TitleDiv = styled.div`
    display: flex;
    justify-content: space-between;
    position: relative;
`
const Headline = styled.div`
`

const StyledDiv = styled.div`
    margin-bottom: 1rem;
`
const DeleteBtnWrapper = styled.span`
    position: absolute;
    top: 2rem;
    right: .75rem;
    display: flex;
    align-items: start;
    color: ${p => p.light ? 'white' : 'var(--med-grey)'};
`