import styled from 'styled-components'

import RecipeSection from './RecipeSection'
import Checkbox from '../shared/Checkbox'

function IngredientsSection({ingredients}) {
    return (
        <RecipeSection sectionTitle="Ingredients">
            <IngredientList>
                {ingredients.map(item => (
                    <li key={item.id}>
                        <Checkbox>{item.text}</Checkbox>
                    </li>
                ))}
            </IngredientList>
        </RecipeSection>
    )
}

export default IngredientsSection;

const IngredientList = styled.ol`
    list-style: none;
    padding-left: 0;
    font-size: 1.25rem;
    line-height: 1.5;
`