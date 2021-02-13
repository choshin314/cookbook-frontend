import styled from 'styled-components'
import {connect} from 'react-redux'
import {Main} from '../components/commonStyles'
import RecipeForm from '../components/recipe/recipeForm/RecipeForm.js'
import { sendMulti } from '../helpers/sendAjax'
import RecipeCreateForm from '../components/recipe/recipeForm/RecipeCreateForm'

function RecipeCreatePage({auth}) {
    return (
        <Main>
            <RecipeCreateForm />
        </Main>
    )
}
const mapStateToProps = (global) => ({ auth: global.auth });
const mapDispatchToProps = {  }

export default connect(mapStateToProps, mapDispatchToProps)(RecipeCreatePage)