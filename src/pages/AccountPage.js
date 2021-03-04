import {connect} from 'react-redux'
import {Switch, Route, Redirect, useRouteMatch} from 'react-router-dom'
import styled from 'styled-components'

import {Main} from '../components/commonStyles'
import RegisterForm from '../components/auth/RegisterForm'
import LoginForm from '../components/auth/LoginForm'
import AccountView from '../components/account/AccountView'

function AccountPage({redirect, auth}) {
    const match = useRouteMatch()
    return (
        <Main>
            <StyledDiv>
                <Switch>
                    <Route path={`${match.path}/login`} >
                        <LoginForm />
                    </Route> 
                    <Route path={`${match.path}/register`} >
                        <RegisterForm />
                    </Route> 
                    <Route path={match.path}>
                        {!auth.user && <Redirect to={`${match.path}/login`} />}
                        {auth.user && <AccountView />}
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