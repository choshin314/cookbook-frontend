import styled from 'styled-components'

import {Wrapper, media} from '../commonStyles'

function RecipeSection({sectionTitle, children}) {
    return (
        <Section>
            <SectionTitle>{sectionTitle}</SectionTitle>
            {children}
        </Section>
    )
}

export default RecipeSection

const Section = styled(Wrapper)`
    position: relative;
    padding-top: 1rem;
    padding-bottom: 1rem;
    line-height: 1.5;
    font-size: 1rem;
    ::before {
        content: '';
        position: absolute;
        top: 0;
        margin: 0 auto;
        width: calc(100% - 2rem);
        height: 2px;
        background-color: var(--lite-grey);
        border-radius: 5px;
    }
`

const SectionTitle = styled.h2`
    text-align: left;
    margin: 1rem 0;
    font-size: 1.25rem;
    @media(min-width: ${media.full}) {
        margin: 2rem 0;
    }
`