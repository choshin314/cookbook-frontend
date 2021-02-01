import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import logo from '../../assets/recipeshare-logo.png'
import {useForm} from '../../hooks/form'
import { CardWrapper, Button, media } from '../commonStyles'
import Input from '../shared/Input'
import FormFeedback from '../shared/FormFeedback'
import {connect} from 'react-redux'
import { loginUser } from '../../redux/actions/authActions'
import { setLocalStorage } from '../../helpers'

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

const StyledHeader = styled.h1`
    font-size: 1.5rem;
    text-align: center;
    padding-top: 1rem;
`

const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
`

const Center = styled.div`
    margin-top: 1rem;
    text-align: center;
`

const Card = styled(CardWrapper)`
    margin: 1rem 0;
    :hover::before {
        opacity: 0;
    }
`

const Form = styled.form`
    background-color: #fff;
    border-radius: 5px;
    padding: 1rem;
    position: relative;
    @media(min-width: ${media.medium}) {
        padding: 2rem;
    }
    display: flex;
    flex-direction: column;
`

const SubmitBtn = styled(Button)`
    
`
