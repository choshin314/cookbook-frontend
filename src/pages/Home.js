import {useEffect, useState} from 'react'
import styled from 'styled-components'
import RecipeCard from '../components/recipe/RecipeCard'
import {GridContainer, Wrapper, Main, PageTitle, media} from '../components/commonStyles'

import recipes from '../dummyrecipes.json'
import FeedList from '../components/feed/FeedList'
import { fetchAllSocial } from '../redux/actions/socialActions'
import { connect } from 'react-redux'
import Flash from '../components/shared/Flash'
import FeedNav from '../components/feed/FeedNav'
import { Route, Switch } from 'react-router-dom'

function Home({fetchSocial}) {
    
    return (
        <Main >
            <Flash />
            <FeedNav />
            <Switch>
                <Route path="/home-feed">
                    <FeedList />
                </Route>
                <Route path="/home-feed">
                    <FeedList />
                </Route>
            </Switch>
        </Main>
    )
}

export default connect(null, {fetchSocial: fetchAllSocial})(Home);