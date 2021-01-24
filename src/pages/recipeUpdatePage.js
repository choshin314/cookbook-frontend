import styled from 'styled-components'

import {Main} from '../components/commonStyles'
import RecipeForm from '../components/recipe/recipeForm/recipeForm.js'

const initValues = {
    title: "Soupy Nuts",
    introText: "These are my grandma's soupy nuts!",
    prepTime: 10,
    cookTime: 15,
    servings: 3,
    instructionDraft: "",
    instructions: [
        {id: "1", content: "Crush dem nuts for fifteen mins!"}, 
        {id: "2", content: "Then do it again but for 10 minutes!"}
    ],
    ingredientDraft_name: "",
    ingredientDraft_qty: "",
    ingredientDraft_unit: "",
    ingredients: [],
    tagDraft: "",
    tags: [{id: "1", content: "keto"}, {id: "2", content: "carby"}]
}

function RecipeUpdatePage() {
    return (
        <Main>
            <RecipeForm 
                initValues={initValues} 
                validateForm={validateForm}
                handleSubmit={handleSubmit}
            />
        </Main>
    )
}

export default RecipeUpdatePage


function validateForm(vals) {
    const errors = {};
    const requiredFields = [
        'title', 'introText', 'prepTime', 'cookTime', 'servings'
    ]
    const minMaxChars = { title: [8, 50], introText: [50, 400] };
    const minMaxItems = { instructions: [5, 30], ingredients: [3, 30] };

    for (let required of requiredFields) {
        if (!vals[required]) errors[required] = "*Required"
    };
    for (let field in minMaxChars) {
        if (vals[field].length < field[0]) {
            errors[field] = `*Requires at least ${field[0]} characters`
        } else if (vals[field].length > field[1]) {
            errors[field] = `*Maximum of ${field[1]} characters`
        }
    };
    for (let list in minMaxItems) {
        if (vals[list].length < list[0]) {
            errors[list] = `*Add at least ${list[0]} ${list}`
        } else if (vals[list].length > list[1]) {
            errors[list] = `*Too many ${list} (maximum of ${list[1]})`
        }
    };
    return Object.keys(errors).length > 0 ?  errors : null;
} 

async function handleSubmit() {

}