import styled from 'styled-components'
import {connect} from 'react-redux'
import {Main} from '../components/commonStyles'
import RecipeForm from '../components/recipe/recipeForm/RecipeForm.js'
import { getLocalStorage, setLocalStorage } from '../helpers'

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
        const formData = new FormData();
        Object.keys(values).forEach(key => {
            if (key === 'coverImg') {
                formData.append(key, values[key])
            } else {
                formData.append(key, JSON.stringify(values[key]))
            }
        })
        try {
            const response = await fetch('http://localhost:5000/api/recipes', {
                method: 'POST',
                body: formData,
                headers: {
                    'authorization': `Bearer ${getLocalStorage('accessToken')}`
                }
            });
            const data = await response.json();
            if (response.status < 200 || response.status > 299) {
                throw new Error(data.message)
            };
            console.log(data);
            setLocalStorage('newRecipe', data)
            //do some logic here - i.e. set local storage and dispatch to store 
            return { 
                success: { 
                    msg: 'Successfully created recipe!', 
                    nextRoute: `/recipes/${data.id}-${data.slug}`
                }
            }
        } catch(err) {
            console.log(err.message)
            return { error: err.message }
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
