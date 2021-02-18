import styled from 'styled-components'

import RecipeSection from './RecipeSection'
import Checkbox from '../shared/Checkbox'
import {EditBtnWrapper} from './recipeEdit/EditBtnWrapper'
import EditIngredients from './recipeEdit/EditIngredients'

function IngredientsSection({isOwnedByUser, ingredients, recipe}) {
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
            {isOwnedByUser && <EditIngredients recipe={recipe} />}
        </RecipeSection>
    )
}

export default IngredientsSection;

const IngredientList = styled.ol`
    list-style: none;
    padding-left: 0;
`