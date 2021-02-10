import { useContext } from 'react'

import {RecipeViewContext} from '../context/recipeViewContext'

export default function useRecipeViewContext() {
    return useContext(RecipeViewContext);
}