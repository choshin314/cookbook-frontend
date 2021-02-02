import React from 'react'
import styled from 'styled-components'

import logo from '../../assets/recipeshare-logo.png'
import {useForm} from '../../hooks/form'
import { StyledHeader, Center, Card, Form, SubmitBtn, StyledLink } from './RegisterForm'
import Input from '../shared/Input'
import FormFeedback from '../shared/FormFeedback'
import {connect} from 'react-redux'
import { loginUser } from '../../redux/actions/authActions'

const initVals = { emailUsername: null, password: null };

function LoginForm({login, user, error, submitting }) {
    
    const { inputValues,  inputErrors,  handleChange } = useForm(initVals, {}, handleSubmit, 'loginForm' );

    const { emailUsername, password } = inputValues;

    async function handleSubmit(e) {
        e.preventDefault();
        login(inputValues);
    }

    return (
        <Card>
            <StyledHeader><img src={logo} alt="cookbook"/></StyledHeader>
            {submitting && <h2>Submitting</h2>}
            <Form onChange={handleChange} onSubmit={handleSubmit} noValidate={true}>
                <StyledDiv>
                    <Input 
                        label={{ text: 'Username or Email'}} 
                        type="text" 
                        name="emailUsername" 
                        value={emailUsername} 
                        errorMsg={inputErrors.emailUsername}
                    />
                    <Input 
                        label={{ text: 'Password'}} 
                        type="password" 
                        name="password" 
                        value={password} 
                        errorMsg={inputErrors.password}
                    />
                </StyledDiv>
                <SubmitBtn type="submit">Sign In</SubmitBtn>
                <StyledLink to="/account/register">Don't have an account?  Sign up for free</StyledLink>
                <Center>
                    <FormFeedback errorMsg={error} /> 
                </Center>
            </Form>
        </Card>
    )
}

const mapStateToProps = global => ({ 
    user: global.auth.user, 
    submitting: global.auth.loading, 
    error: global.auth.error
})

export default connect(mapStateToProps, { login: loginUser })(LoginForm);

const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
`