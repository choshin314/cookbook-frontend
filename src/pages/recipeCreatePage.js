import styled from 'styled-components'
import {connect} from 'react-redux'
import {Main} from '../components/commonStyles'
import RecipeForm from '../components/recipe/recipeForm/RecipeForm.js'
import { sendMulti } from '../helpers/sendAjax'

const initValues = {
    title: '',
    introText: '',
    prepTime: '',
    cookTime: '',
    servings: '',
    coverImg: '',
    instructions: [],
    instructionDraft_qty: '',
    instructionDraft_unit: '',
    instructionDraft_content: '',
    ingredients: [],
    ingredientDraft: '',
    tags: [],
    tagDraft: ''
}

function RecipeCreatePage({user}) {
    async function handleSubmit(values) {
        const result = await sendMulti('/recipes', values, ['coverImg'])
        if (result.error) return { error: result.error }
        return { 
            data: result.data, 
            msg: 'Yum! Recipe created!', 
            redirect: `/recipes/view/${result.data.id}-${result.data.slug}`
        }
    }
    return (
        <Main>
            <RecipeForm 
                initValues={initValues}
                handleSubmit={handleSubmit}
            />
        </Main>
    )
}
const mapStateToProps = (global) => ({ user: global.user });
const mapDispatchToProps = {  }

export default connect(mapStateToProps, mapDispatchToProps)(RecipeCreatePage)