import styled from 'styled-components'

import RecipeSection from './recipeSection'

function InstructionsSection({instructions}) {
    return (
        <RecipeSection sectionTitle="Instructions">
            <Instructions>
                {instructions.map((item, i) => (
                    <li key={item.id}>
                        <span>{i+1}.</span><span>{item.display_text}</span>
                    </li>
                ))}
            </Instructions>
        </RecipeSection>
    )
}

export default InstructionsSection;

const Instructions = styled.ol`
    list-style: none;
    padding-left: 0;
    font-size: 1.25rem;
    line-height: 1.5;
    li {
        display: flex;
    }
    li > span:first-child {
        flex: 0 0 25px;
        margin-right: 1rem;
    }
`