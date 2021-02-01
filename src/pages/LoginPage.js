import {connect} from 'react-redux'
import styled from 'styled-components'

import {Main} from '../components/commonStyles'
import LoginForm from '../components/auth/LoginForm'

function LoginPage() {
    return (
        <Main>
            <StyledDiv>
                <LoginForm />
            </StyledDiv>
        </Main>
    )
}

export default LoginPage

const StyledDiv = styled.div`
    max-width: 400px;
    margin: 0 auto;
`