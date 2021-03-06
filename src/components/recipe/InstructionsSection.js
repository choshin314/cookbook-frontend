import styled from 'styled-components'
import EditInstructions from './recipeEdit/EditInstructions';

import RecipeSection from './RecipeSection'

function InstructionsSection({isOwnedByUser, instructions, recipe}) {
    return (
        <RecipeSection sectionTitle="Instructions">
            <Instructions>
                {instructions.map((item, i) => (
                    <li key={item.id}>
                        <span>{i+1}.</span>
                        <span>{item.content}</span>
                    </li>
                ))}
            </Instructions>
            {isOwnedByUser && <EditInstructions recipe={recipe} />}
        </RecipeSection>
    )
}

export default InstructionsSection;

const Instructions = styled.ol`
    list-style: none;
    padding-left: 0;
    li {
        display: flex;
    }
    li > span:first-child {
        flex: 0 0 25px;
        margin-right: 1rem;
    }
`