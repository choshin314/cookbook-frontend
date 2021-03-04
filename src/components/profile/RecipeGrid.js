import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faBookmark, faFolder } from '@fortawesome/free-regular-svg-icons'

import {fetchProfileRecipesBookmarks, fetchProfileRecipesOwn} from '../../redux/actions/profileRecipesActions'
import {GridContainer, media} from '../commonStyles'
import Spinner from '../shared/Spinner'
import RecipeGridItem from './RecipeGridItem'

const USER = 'user'
const BOOKMARKS = 'bookmarks'

function RecipeGrid({recipes, bookmarks, getBookmarks, getRecipes}) {
    const [ recipeView, setRecipeView ] = useState(USER);
    const { username } = useParams();

    useEffect(() => {
        getRecipes(username);
    }, [])

    useEffect(() => {
        if(recipeView !== BOOKMARKS) return;
        getBookmarks(username);
    }, [recipeView])
    
    console.log(recipes)
    return (
        <section>
            <GridNav id="recipe-grid">
                <ul>
                    <li>
                        <Tab onClick={() => setRecipeView(USER)} className={recipeView === USER && 'tab--active'}>
                            <FontAwesomeIcon icon={faFolder} />
                            <span>User Recipes</span>
                        </Tab>
                    </li>
                    <li>
                        <Tab onClick={() => setRecipeView(BOOKMARKS)} className={recipeView === BOOKMARKS && 'tab--active'}>
                            <FontAwesomeIcon icon={faBookmark} />
                            <span>Saved Recipes</span>
                        </Tab>
                    </li>
                </ul>
            </GridNav>
            <BorderedDiv>
                {(recipes.loading || bookmarks.loading) && <Spinner />}
                {recipeView === USER && (
                    <>
                        <GridContainer cols="2" colsMd="3" gap="5px">
                            {recipes.recipes && recipes.recipes.map(r => <RecipeGridItem key={r.id} recipe={r} user={r.User}/>)}
                        </GridContainer>
                        {recipes.recipes && recipes.recipes.length === 0 && <EmptyDiv>No recipes yet</EmptyDiv>}
                    </>
                )}
                {recipeView === BOOKMARKS && (
                    <>
                        <GridContainer cols="2" colsMd="3" gap="5px">
                            {bookmarks.recipes && bookmarks.recipes.map(r => <RecipeGridItem key={r.id} recipe={r} user={r.User}/>)}
                        </GridContainer>
                        {bookmarks.recipes && bookmarks.recipes.length === 0 && <EmptyDiv>No bookmarks yet</EmptyDiv>}
                    </>
                )}
            </BorderedDiv>
        </section>
    )
}

const mapStateToProps = (global) => ({ 
    recipes: global.profileRecipes.user, 
    bookmarks: global.profileRecipes.bookmarks
})
const mapDispatchToProps = {
    getBookmarks: fetchProfileRecipesBookmarks,
    getRecipes: fetchProfileRecipesOwn
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeGrid);

const GridNav = styled.nav`
    text-align: center;
    @media(min-width: ${media.medium}) {
        text-align: left;
    }
    ul {
        display: inline-flex;
        list-style: none;
        padding-left: 0;
        margin: 0;
        justify-content: center;
    }

`

const Tab = styled.button`
    cursor: pointer;
    padding: .5rem 1rem;
    font-weight: 500;
    font-family: inherit;
    font-size: .75rem;
    color: var(--med-grey);
    background-color: transparent;
    border-radius: 5px 5px 0 0;
    border: 2px solid var(--med-grey);
    span {
        margin-left: .5rem;
    }
    :hover, :active {
        background-color: var(--teal);
        color: var(--lite-grey);
    }
    :focus {
        border: var(--teal) 2px solid;
        border-radius: 5px 5px 0 0;
    }
    &.tab--active {
        background-color: var(--teal);
        color: var(--lite-grey);
    }
    @media(min-width: ${media.small}) {
        font-size: .9rem;
    }
    @media(min-width: ${media.medium}) {
        padding: 1rem;
        font-size: 1rem;
    }
`

const BorderedDiv = styled.div`
    border-top: 2px solid var(--lite-med-grey);
    border-bottom: 2px solid var(--lite-med-grey);
    padding: 1rem 0;
    min-height: 600px;
    position: relative;
`

const EmptyDiv = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    max-width: 300px;
    font-size: .75rem;
    font-weight: 600;
    text-align: center;
    color: var(--med-lite-grey);
`