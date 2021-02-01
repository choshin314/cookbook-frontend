import {connect} from 'react-redux'
import {Route, Redirect, useLocation, useParams} from 'react-router-dom'
import styled from 'styled-components'

import {Main} from '../components/commonStyles'
import RegisterForm from '../components/auth/RegisterForm'
import LoginForm from '../components/auth/LoginForm'

function AuthPage() {
    const { pathname } = useLocation()
    if (pathname === "/account") return <Redirect to="/" />
    return (
        <Main>
            <StyledDiv>
                <Route path="/account/login" >
                    <LoginForm />
                </Route> 
                <Route exact path="/account/register" >
                    <RegisterForm />
                </Route> 
            </StyledDiv>
        </Main>
    )
}

export default AuthPage

const StyledDiv = styled.div`
    max-width: 400px;
    margin: 0 auto;
`