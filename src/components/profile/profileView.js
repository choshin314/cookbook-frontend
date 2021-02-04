import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {Main, GridContainer, PageTitle, Wrapper} from '../commonStyles'
import RecipeGrid from './RecipeGrid'
import AvatarLink from '../shared/AvatarLink'

function ProfileView({user, stats}) {
    return (
        <Main>
            <Container>
                <HeadSection cols="4">
                    <StyledDiv>
                        <AvatarLink user={user} imgSize="50px"/>
                        <StyledH1>{user.firstName} {user.lastName} (@{user.username})</StyledH1>
                    </StyledDiv>
                    
                    <UserStatLink to="#recipe-grid">{stats.recipeCount}<br />Recipes</UserStatLink>
                    <UserStatLink>{stats.followerCount}<br />Followers</UserStatLink>
                    <UserStatLink>{stats.followingCount}<br />Following</UserStatLink>
                </HeadSection>
                <RecipeGrid />
            </Container>
        </Main>
    )
}

export default ProfileView;


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