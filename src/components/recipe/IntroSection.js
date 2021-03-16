import styled from 'styled-components'

import RecipeSection from './RecipeSection'
import QuickFacts from './QuickFacts'
import EditCoverImg from './recipeEdit/EditCoverImg'
import EditIntro from './recipeEdit/EditIntro'
import useRecipeViewContext from '../../hooks/recipeViewContextHook'

function IntroSection() {
    const { recipe, isOwnedByUser } = useRecipeViewContext();
    const { coverImg, intro, prepTime, cookTime, servings, title } = recipe; 
    return (
        <RecipeSection>
            <CoverImg>
                <div>
                <img src={coverImg} alt={`Finished result of recipe: ${title}`} />
                </div>
                {isOwnedByUser && <EditCoverImg recipe={recipe} /> }
            </CoverImg>
            <IntroText>
                <p>{intro}</p>
                {isOwnedByUser && <EditIntro recipe={recipe} /> }
            </IntroText>
            <QuickFacts prepTime={prepTime} cookTime={cookTime} servings={servings} />
        </RecipeSection>
    )
}

export default IntroSection

const CoverImg = styled.div`
    margin-bottom: 1rem;
    width: 100%;
    height: 0px;
    padding-top: 60%;
    position: relative;
    & > div {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        & > img {
            object-fit: cover;
            height: 100%;
            width: 100%;
        }
    }
`
const IntroText = styled.div`
    margin-bottom: 1rem;
    position: relative;
    padding: .5rem 0;
`