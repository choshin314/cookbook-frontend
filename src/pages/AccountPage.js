import {connect} from 'react-redux'
import {Switch, Route, Redirect, useLocation, useParams} from 'react-router-dom'
import styled from 'styled-components'

import {Main} from '../components/commonStyles'
import RegisterForm from '../components/auth/RegisterForm'
import LoginForm from '../components/auth/LoginForm'
import Flash from '../components/shared/Flash'
import AccountView from '../components/account/AccountView'

function AccountPage({redirect, auth}) {
    const { pathname } = useLocation()
    console.log(pathname);
    
    return (
        <Main>
            <StyledDiv>
                <Flash />
                <Switch>
                    <Route path={`/account/login`} >
                        <LoginForm />
                    </Route> 
                    <Route path={`/account/register`} >
                        <RegisterForm />
                    </Route> 
                    <Route exact path="/account">
                        {!auth.user && <Redirect to="/account/login" />}
                        <AccountView />
                    </Route>
                </Switch>
            </StyledDiv>
        </Main>
    )
}

const mapStateToProps = state => ({ auth: state.auth, redirect: state.redirect })
export default connect(mapStateToProps)(AccountPage)

const StyledDiv = styled.div`
    max-width: 400px;
    margin: 0 auto;
`