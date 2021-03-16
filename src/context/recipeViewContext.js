import { createContext, useState, useCallback } from 'react'
import { useSelector } from 'react-redux';

export const RecipeViewContext = createContext();

export function RecipeViewProvider({children}) {
    const [ recipe, setRecipe ] = useState();
    const [ isOwnedByUser, setIsOwnedByUser ] = useState();
    const user = useSelector(global => global.auth.user)

    const updateRecipe = useCallback((newItems) => {
        setRecipe(prev => ({ ...prev, ...newItems }))
    }, [])

    const checkRecipeOwner = useCallback((recipe) => {
        if (!user) return setIsOwnedByUser(false);
        if (user.id !== recipe.user.id) return setIsOwnedByUser(false);
        return setIsOwnedByUser(true); 
    }, [user, setIsOwnedByUser])

    return (
        <RecipeViewContext.Provider value={{ recipe, setRecipe, updateRecipe, isOwnedByUser, checkRecipeOwner }}>
            {children}
        </RecipeViewContext.Provider>
    )
}