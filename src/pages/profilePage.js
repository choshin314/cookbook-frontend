import {useState, useEffect} from 'react'
import styled from 'styled-components'
import {useParams, Link} from 'react-router-dom'
import {connect} from 'react-redux'

import {Main, GridContainer, PageTitle, Wrapper} from '../components/commonStyles'
import RecipeGrid from '../components/profile/recipeGrid'
import AvatarLink from '../components/shared/avatarLink'
import recipeData from '../dummyrecipes.json'
import {getLocalStorage, setLocalStorage} from '../helpers'
import ProfileView from '../components/profile/profileView'
import {fetchUserRecipesOwn, fetchUserRecipesBookmarks} from '../redux/actions/userRecipesActions'

function ProfilePage({getRecipes, userRecipes}) {
    const { username } = useParams();
    const [ user, setUser ] = useState(null)
    const [ userStats, setUserStats ] = useState({});

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE}/users/${username}`)
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                setUser(data)
            })
        fetch(`${process.env.REACT_APP_API_BASE}/users/${username}/stats`)
            .then(resp => resp.json())
            .then(data => setUserStats(data))
    }, [])

    
    return (
        <Main>
            {user && userStats && (<Container>
                <HeadSection cols="4">
                    <StyledDiv>
                        <AvatarLink user={user} imgSize="50px"/>
                        <StyledH1>{user.firstName} {user.lastName} (@{user.username})</StyledH1>
                    </StyledDiv>
                    
                    <UserStatLink to="#recipe-grid">{userStats.recipeCount}<br />Recipes</UserStatLink>
                    <UserStatLink>{userStats.followerCount}<br />Followers</UserStatLink>
                    <UserStatLink>{userStats.followingCount}<br />Following</UserStatLink>
                </HeadSection>
                <RecipeGrid />
            </Container>)}
        </Main>
    )
}

const mapStateToProps = (global) => ({ user: global.user, userRecipes: global.userRecipes });
const mapDispatchToProps = { getRecipes: fetchUserRecipesOwn, getBookmarks: fetchUserRecipesBookmarks}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);


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
const StyledDiv = styled.div`
    max-width: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const StyledH1 = styled.h1`
    font-size: .75rem;
    text-align: center;
    padding: .5rem;
`

const UserStatLink = styled(Link)`
    font-size: .75rem;
`