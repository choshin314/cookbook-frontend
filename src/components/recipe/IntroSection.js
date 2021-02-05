import styled from 'styled-components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faInfoCircle} from '@fortawesome/free-solid-svg-icons'

import RecipeSection from './RecipeSection'
import QuickFacts from './QuickFacts'

function IntroSection({coverImg, prepTime, cookTime, servings, intro}) {
    return (
        <RecipeSection>
            <CoverImg>
                <div>
                <img src={coverImg.src} alt={coverImg.alt} />
                </div>
            </CoverImg>
            <IntroText>{intro}</IntroText>
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
`