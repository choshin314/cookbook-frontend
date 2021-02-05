import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

import logo from '../../assets/recipeshare-logo.png'
import {useForm} from '../../hooks/form'
import { CardWrapper, Button, media } from '../commonStyles'
import Input from '../shared/Input'
import FormFeedback from '../shared/FormFeedback'
import {connect} from 'react-redux'
import { registerUser } from '../../redux/actions/authActions'
import Flash from '../shared/Flash'

const initVals = {
    email: '', firstName: '', lastName: '', username: '', password: '', password_confirmation: ''
}

const constraints = {
    email: {
        required: true,
        pattern: { 
            regex: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            failMsg: "Valid email address required"
        }
    },
    firstName: {
        required: true,
        maxChars: 30
    },
    lastName: {
        required: true,
        maxChars: 30
    },
    username: {
        required: true,
        pattern: {
            regex: /^[a-zA-Z0-9]+$/,
            failMsg: "Username accepts letters and numbers only"
        },
        minChars: 2,
        maxChars: 30
    },
    password: {
        required: true,
        minChars: 8,
        maxChars: 16,
        pattern: {
            regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
            failMsg: "Password needs one of each: lowercase, uppercase, number"
        }
    },
    password_confirmation: {
        required: true,
        match: 'password'
    }
}

function RegisterForm({ register, user, error, submitting }) {
    const {
        inputValues, 
        inputErrors,
        formErrors,
        validateForm, 
        handleChange
    } = useForm(initVals, constraints, null, 'registerForm' );

    const { 
        email, 
        firstName, 
        lastName, 
        username, 
        password,
        password_confirmation
    } = inputValues;

    return (
        <Card>
            <Flash />
            <StyledHeader><img src={logo} alt="cookbook"/></StyledHeader>
            <Form onChange={handleChange} onSubmit={async (e) => {
                e.preventDefault();
                const validationErrors = validateForm(inputValues, constraints);
                if (validationErrors) return;
                await register(inputValues, ['profilePic']);
            }} noValidate={true}>
                <StyledDiv>
                    <Input 
                        label={{ text: 'First Name'}} 
                        type="text" 
                        name="firstName" 
                        value={firstName} 
                        errorMsg={inputErrors.firstName}
                    />
                    <Input 
                        label={{ text: 'Last Name'}} 
                        type="text" 
                        name="lastName" 
                        value={lastName} 
                        errorMsg={inputErrors.lastName}
                    />
                </StyledDiv>
                <StyledDiv>
                    <Input 
                        label={{ text: 'Username'}} 
                        type="text" 
                        name="username" 
                        value={username} 
                        errorMsg={inputErrors.username}
                    />
                    <Input 
                        label={{ text: 'Email Address'}} 
                        type="email" 
                        name="email" 
                        value={email} 
                        errorMsg={inputErrors.email}
                    />
                    
                </StyledDiv>
                <StyledDiv>
                    <Input 
                        label={{ text: 'Password'}} 
                        type="password" 
                        name="password" 
                        value={password} 
                        errorMsg={inputErrors.password}
                    />
                    <Input 
                        label={{ text: 'Confirm Password'}} 
                        type="password" 
                        name="password_confirmation" 
                        value={password_confirmation} 
                        errorMsg={inputErrors.password_confirmation}
                    />
                </StyledDiv>
                <SubmitBtn type="submit">Get Cookin'</SubmitBtn>
                <StyledLink to="/account/login">Already have an account?  Sign in</StyledLink>
                <Center>
                    <FormFeedback errorMsg={formErrors[0] || error} /> 
                </Center>
            </Form>
        </Card>
    )
}

const mapStateToProps = (global) => ({ 
    submitting: global.auth.loading, 
    error: global.auth.error,
    user: global.auth.user 
})
export default connect(null, { register: registerUser })(RegisterForm);

const StyledDiv = styled.div`
    display: grid;
    grid-template-columns: minmax(10px, 1fr) minmax(10px, 1fr);
    gap: 1rem;
`

export const StyledHeader = styled.h1`
    font-size: 1.5rem;
    text-align: center;
    padding-top: 1rem;
`

export const Center = styled.div`
    margin-top: 1rem;
    text-align: center;
`

export const Card = styled(CardWrapper)`
    margin: 1rem 0;
    position: relative;
    :hover::before {
        opacity: 0;
    }
`

export const Form = styled.form`
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

export const SubmitBtn = styled(Button)`
    
`
export const StyledLink = styled(Link)`
    font-size: .75rem;
    font-weight: 500;
    margin-top: 10px;
`