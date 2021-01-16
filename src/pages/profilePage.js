import {useState, useEffect} from 'react'
import styled from 'styled-components'
import {useParams, Link} from 'react-router-dom'

import {Main, GridContainer, PageTitle, Wrapper} from '../components/commonStyles'
import RecipeGrid from '../components/profile/recipeGrid'
import AvatarLink from '../components/shared/avatarLink'
import recipeData from '../dummyrecipes.json'
import {getLocalStorage, setLocalStorage} from '../helpers'

function ProfilePage() {
    const {username} = useParams();
    const [ userRecipes, setUserRecipes ] = useState([]);
    const [ savedRecipes, setSavedRecipes ] = useState([]);

    //check local storage for 'my_recipes' - if yes, setRecipes.  If not, fetch
    useEffect(() => {
        let userRecipesLocal = getLocalStorage('userRecipes');
        let savedRecipesLocal = getLocalStorage('savedRecipes');
        if (userRecipesLocal) {
            setUserRecipes(userRecipesLocal)
        } else {
            //fetch from db
            setUserRecipes(recipeData)
            setLocalStorage('userRecipes', recipeData)
        }
        if (savedRecipesLocal) {
            setSavedRecipes(savedRecipesLocal)
        } else {
            //fetch from db
            setSavedRecipes(recipeData)
            setLocalStorage('savedRecipes', recipeData)
        }
    }, [])

    return (
        <Main>
            <h1>{username}</h1>
            <Container>
                <HeadSection cols="4">
                    <AvatarLink imgSrc="https://christopherscottedwards.com/wp-content/uploads/2018/07/Generic-Profile.jpg" imgSize="70px" />
                    <UserStatLink to="#recipe-grid">25<br />Recipes</UserStatLink>
                    <UserStatLink>30<br />Followers</UserStatLink>
                    <UserStatLink>45<br />Following</UserStatLink>
                </HeadSection>
                <RecipeGrid userRecipes={userRecipes} savedRecipes={savedRecipes} />
            </Container>
        </Main>
    )
}

export default ProfilePage;

const Container = styled.div`
    padding: 2rem 0;
`
const HeadSection = styled(GridContainer)`
    align-items: center;
    margin-bottom: 2rem;
    padding: 0 1rem;
    font-size: 1rem;
    text-align: center;
`

const UserStatLink = styled(Link)`
    
`