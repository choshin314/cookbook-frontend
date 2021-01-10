import {useEffect, useState} from 'react'
import styled from 'styled-components'

import RecipeCard from '../components/recipe/recipeCard'
import {GridContainer, Wrapper, Main, PageTitle, media} from '../components/commonStyles'

import recipes from '../dummyrecipes.json'

function Home() {
    const [popularRecipes, setPopularRecipes] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if(!popularRecipes) setLoading(true);
        //get popular recipes
        setTimeout(() => {
            setPopularRecipes(recipes);
            setLoading(false);
        }, 2000);
    }, [])
    return (
        <Main>
            <PageTitle>Popular Recipes</PageTitle>
            <GridContainer colsMd="1" colsLg="1">
                {loading && <div>...loading</div>}
                {popularRecipes && popularRecipes.map(r => (
                    <RecipeCard
                        key={r.id}
                        recipe={r}
                    />
                ))}
            </GridContainer>
        </Main>
    )
}

export default Home;