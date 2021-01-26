import styled from 'styled-components'

import {Main} from '../components/commonStyles'
import RecipeForm from '../components/recipe/recipeForm/recipeForm.js'

const initValues = {
    title: '',
    introText: '',
    prepTime: '',
    cookTime: '',
    servings: '',
    coverImg: '',
    instructions: [],
    ingredients: [],
    tags: []
}

function RecipeCreatePage() {
    return (
        <Main>
            <RecipeForm 
                initValues={initValues}
                handleSubmit={handleSubmit}
            />
        </Main>
    )
}

export default RecipeCreatePage


async function handleSubmit() {

}