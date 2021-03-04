import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Button } from '../commonStyles';

import RecipeCard from '../recipe/RecipeCard'
import Spinner from '../shared/Spinner'

function FeedList(props) {
    const {
        feedType,
        loading,
        recipes,
        newerRecipesCount,
        showNewerRecipes
    } = props;

    return (
        <Container>
            {newerRecipesCount > 0 && <NewRecipesBtn onClick={showNewerRecipes}>
                {newerRecipesCount} New Recipes
            </NewRecipesBtn>}
            <StyledList>
                {loading && <Spinner />}
                {recipes.map(r => <li key={r.id}><RecipeCard recipe={r} /></li>)}
            </StyledList>
            <Bottom 
                id={feedType === "public" ? "btm-public-feed" : "btm-private-feed"}
            >
                {loading && <Spinner />}
            </Bottom>
        </Container>
    )
}

export default FeedList

const Container = styled.section`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100%;
`

const StyledList = styled.ol`
    list-style: none;
    margin: 0;
    padding: 0;
    width: 100%;
    li {
        margin-bottom: .5rem;
    }
`

const slideDown = keyframes`
    0% {
        transform: translateY(-100%) scale(1);
        opacity: 0;
    }
    45% {
        transform: translateY(-50%) scale(1);
        opacity: .15;
    }
    90% {
        transform: translateY(0%) scale(1.1);
        opacity: 1;
    }
    100% {
        transform: scale(1.0);
        opacity: 1;
    }
`

const NewRecipesBtn = styled(Button)`
    position: absolute;
    top: 1rem;
    border-radius: 20px;
    animation: ${slideDown} .5s linear;
    z-index: 1;
`

const Bottom = styled.div`
    position: absolute;
    bottom: 0;
`