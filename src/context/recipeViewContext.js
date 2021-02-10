import React, { useState } from 'react'

export const RecipeViewContext = React.createContext();

export function RecipeViewProvider({children}) {
    const [ recipe, setRecipe ] = useState();
    const [ isOwnedByUser, setIsOwnedByUser ] = useState();
    const updateRecipe = (newItems) => setRecipe(prev => ({ ...prev, ...newItems }));
    return (
        <RecipeViewContext.Provider value={{ recipe, updateRecipe, isOwnedByUser, setIsOwnedByUser }}>
            {children}
        </RecipeViewContext.Provider>
    )
}