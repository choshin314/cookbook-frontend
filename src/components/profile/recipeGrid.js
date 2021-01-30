import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faBookmark, faFolder } from '@fortawesome/free-regular-svg-icons'

import {fetchUserRecipesBookmarks, fetchUserRecipesOwn} from '../../redux/actions/userRecipesActions'
import RecipeCard from '../recipe/recipeCard'
import {GridContainer, media} from '../commonStyles'

const USER = 'user'
const BOOKMARKS = 'bookmarks'

function RecipeGrid({userRecipes, bookmarks, getBookmarks, getUserRecipes}) {
    const [ recipeView, setRecipeView ] = useState(USER);
    const { username } = useParams();

    useEffect(() => {
        if (!userRecipes.recipes[0]) getUserRecipes(username);
    }, [])

    useEffect(() => {
        if(recipeView !== BOOKMARKS || bookmarks.recipes[0]) return;
        getBookmarks(username);
    }, [recipeView])
    
    console.log(userRecipes)
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
                {recipeView === USER && (<GridContainer cols="2" colsLg="3" gap="5px">
                    {!userRecipes || userRecipes.loading && <div>loading recipes</div>}
                    {userRecipes.recipes && userRecipes.recipes.map(r => <RecipeCard key={r.id} recipe={r} user={r.User}/>)}
                </GridContainer>)}
                {recipeView === BOOKMARKS && (<GridContainer cols="2" colsLg="3" gap="5px">
                    {bookmarks.loading && <div>loading bookmarks</div>}
                    {bookmarks.recipes && bookmarks.recipes.map(r => <RecipeCard key={r.id} recipe={r} user={r.User}/>)}
                </GridContainer>)}
            </BorderedDiv>
        </section>
    )
}

const mapStateToProps = (global) => ({ 
    userRecipes: global.userRecipes.user, 
    bookmarks: global.userRecipes.bookmarks
})
const mapDispatchToProps = {
    getBookmarks: fetchUserRecipesBookmarks,
    getUserRecipes: fetchUserRecipesOwn
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
    padding: 1rem 2rem;
    font-weight: 500;
    font-family: inherit;
    font-size: 1rem;
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
`

const BorderedDiv = styled.div`
    border-top: 2px solid var(--lite-med-grey);
    border-bottom: 2px solid var(--lite-med-grey);
    padding: 1rem 0;
`