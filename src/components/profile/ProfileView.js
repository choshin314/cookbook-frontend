import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {GridContainer, PageTitle, Wrapper} from '../commonStyles'
import RecipeGrid from './RecipeGrid'
import AvatarLink from '../shared/AvatarLink'
import FollowBtn from './FollowBtn'

function ProfileView({profile, profileUrl, isOwnedByUser}) {
    const { user, stats } = profile;
    return (
        <Container>
            {isOwnedByUser && <EditAccountBtn >
                <Link to="/account">Edit Account / Profile Details</Link>
            </EditAccountBtn>}
            <HeadSection cols="4">
                <StyledDiv>
                    <AvatarLink user={user} imgSize="50px"/>
                    <StyledH1>{user.firstName} {user.lastName} (@{user.username})</StyledH1>
                    <FollowBtn profileUser={user} />
                </StyledDiv>
                <UserStatLink to="#recipe-grid">{stats.recipeCount}<br />Recipes</UserStatLink>
                <UserStatLink to={`${profileUrl}/subs/followers`}>{stats.followerCount}<br />Followers</UserStatLink>
                <UserStatLink to={`${profileUrl}/subs/following`}>{stats.followingCount}<br />Following</UserStatLink>
            </HeadSection>
            <RecipeGrid />
        </Container>
    )
}

export default ProfileView;


const Container = styled.div`
    padding: 2rem 0;
`
const HeadSection = styled(GridContainer)`
    align-items: center;
    margin-bottom: 1rem;
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

const EditAccountBtn = styled.div`
    font-size: .75rem;
    margin-bottom: 1rem;
    text-align: center;
    & > a {
        padding: .5rem 1rem;
        border-radius: 5px;
        color: white;
        background-color: var(--teal);
    }
`