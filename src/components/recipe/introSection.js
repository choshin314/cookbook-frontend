import styled from 'styled-components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faInfoCircle} from '@fortawesome/free-solid-svg-icons'

import RecipeSection from './RecipeSection'
import QuickFacts from './QuickFacts'

function IntroSection({coverImg, prepTime, cookTime, servings}) {
    return (
        <RecipeSection>
            <CoverImg>
                <img src={coverImg.src} alt={coverImg.alt} />
            </CoverImg>
            <QuickFacts prepTime={prepTime} cookTime={cookTime} servings={servings} />
        </RecipeSection>
    )
}

export default IntroSection

const CoverImg = styled.div`
    margin-bottom: 1rem;
    img {
        width: 100%;
        object-fit: cover;
        border-radius: 5px;
    }
`