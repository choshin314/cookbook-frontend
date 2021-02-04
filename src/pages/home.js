import {useEffect, useState} from 'react'
import styled from 'styled-components'
import RecipeCard from '../components/recipe/RecipeCard'
import {GridContainer, Wrapper, Main, PageTitle, media} from '../components/commonStyles'

import recipes from '../dummyrecipes.json'
import FeedList from '../components/feed/FeedList'
import { fetchAllSocial } from '../redux/actions/socialActions'
import { connect } from 'react-redux'

function Home({fetchSocial}) {
    useEffect(() => fetchSocial(), [])
    return (
        <Main >
            <PageTitle>Popular Recipes</PageTitle>
            {/* <GridContainer colsMd="1" colsLg="1">
                {loading && <div>...loading</div>}
                {popularRecipes && popularRecipes.map(r => (
                    <RecipeCard
                        key={r.id}
                        recipe={r}
                    />
                ))}
            </GridContainer> */}
            <FeedList />
        </Main>
    )
}

export default connect(null, {fetchSocial: fetchAllSocial})(Home);