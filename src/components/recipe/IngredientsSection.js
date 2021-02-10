import styled from 'styled-components'

import RecipeSection from './RecipeSection'
import Checkbox from '../shared/Checkbox'

function IngredientsSection({isOwnedByUser, ingredients}) {
    return (
        <RecipeSection sectionTitle="Ingredients">
            <IngredientList>
                {ingredients.map(ing => (
                    <li key={ing.id}>
                        <Checkbox>
                            {ing.qty} {ing.unit} {ing.content}
                        </Checkbox>
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
`