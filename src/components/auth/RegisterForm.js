import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

import useForm from '../../hooks/form'
import logo from '../../assets/cookbook-logo.png'
import { CardWrapper, Button, media } from '../commonStyles'
import Input from '../shared/Input'
import Spinner from '../shared/Spinner'
import {connect} from 'react-redux'
import { registerUser } from '../../redux/actions/authActions'
import { ACCOUNT_CONSTRAINTS } from '../../constants'

const initVals = {
    email: '', firstName: '', lastName: '', username: '', password: '', passwordConfirmation: ''
}

function RegisterForm({ register, submitting }) {
    const handleSubmit = async (values) => {
        return await register(values, ['profilePic'])
    }
    const {
        inputValues, 
        inputErrors,
        handleChange,
        validateAndSubmit
    } = useForm(initVals, ACCOUNT_CONSTRAINTS, handleSubmit);

    const { 
        email, 
        firstName, 
        lastName, 
        username, 
        password,
        passwordConfirmation
    } = inputValues;

    return (
        <Card>
            {submitting && <Spinner />}
            <StyledHeader><img src={logo} alt="cookbook"/></StyledHeader>
            <Form onChange={handleChange} onSubmit={validateAndSubmit} noValidate={true}>
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
                        name="passwordConfirmation" 
                        value={passwordConfirmation} 
                        errorMsg={inputErrors.passwordConfirmation}
                    />
                </StyledDiv>
                <SubmitBtn type="submit">Get Cookin'</SubmitBtn>
                <StyledLink to="/account/login">Already have an account?  Sign in</StyledLink>
            </Form>
        </Card>
    )
}

const mapStateToProps = state => ({ submitting: state.auth.loading })
export default connect(mapStateToProps, { register: registerUser })(RegisterForm);

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