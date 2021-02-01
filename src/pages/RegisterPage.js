import {connect} from 'react-redux'
import styled from 'styled-components'

import {Main} from '../components/commonStyles'
import RegisterForm from '../components/auth/RegisterForm'

function RegisterPage() {
    return (
        <Main>
            <StyledDiv>
                <RegisterForm />
            </StyledDiv>
        </Main>
    )
}

export default RegisterPage

const StyledDiv = styled.div`
    max-width: 400px;
    margin: 0 auto;
`