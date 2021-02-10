import styled from 'styled-components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faInfoCircle} from '@fortawesome/free-solid-svg-icons'

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
                <img src={coverImg} alt={`Cover photo for ${title}`} />
                </div>
                {isOwnedByUser && (<EditWrapper light>
                    <EditCoverImg recipe={recipe} />
                </EditWrapper>)}
            </CoverImg>
            <IntroText>
                <p>{intro}</p>
                <EditWrapper>
                    <EditIntro recipe={recipe} />
                </EditWrapper>
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

const EditWrapper = styled.span`
    position: absolute;
    top: .5rem;
    right: .5rem;
    display: flex;
    align-items: start;
    color: ${p => p.light ? 'white' : 'var(--med-grey)'};
`