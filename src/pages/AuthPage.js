import {connect} from 'react-redux'
import {Switch, Route, Redirect, useLocation, useParams} from 'react-router-dom'
import styled from 'styled-components'

import {Main} from '../components/commonStyles'
import RegisterForm from '../components/auth/RegisterForm'
import LoginForm from '../components/auth/LoginForm'

function AuthPage({redirect}) {
    const { pathname } = useLocation()
    console.log(redirect.to);
    if (pathname === "/account") return <Redirect to="/" />
    return (
        <Main>
            <StyledDiv>
                <Switch>
                    <Route path="/account/login" >
                        <LoginForm />
                    </Route> 
                    <Route exact path="/account/register" >
                        <RegisterForm />
                    </Route> 
                </Switch>
            </StyledDiv>
        </Main>
    )
}

const mapStateToProps = global => ({ redirect: global.redirect })
export default connect(mapStateToProps)(AuthPage)

const StyledDiv = styled.div`
    max-width: 400px;
    margin: 0 auto;
`