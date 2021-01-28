import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import {useForm} from '../../hooks/form'
import { CardWrapper, Button, media } from '../commonStyles'
import Input from '../shared/input'
import ImgInput from '../shared/imgInput'
import FormFeedback from '../shared/formFeedback'

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
    bio: {
        maxChars: 200
    },
    profilePic: {
        size: 5120000,
        type: ["image/jpeg", "image/jpg", "image/png"]
    }
}

function AuthForm({ initValues, handleSubmit }) {
    const [step, setStep] = useState(1);
    const {
        inputValues, 
        inputErrors, 
        handleChange, 
        validateAndSubmit,
        formErrors
    } = useForm(initValues, constraints, handleSubmit, 'authForm', 'profilePic' );

    const { 
        email, 
        firstName, 
        lastName, 
        username, 
        password, 
        profilePic, 
        bio 
    } = inputValues;

    return (
        <Card>
            <StyledHeader>Sign Up for Cookbook</StyledHeader>
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
                        label={{ text: 'Password'}} 
                        type="password" 
                        name="password" 
                        value={password} 
                        errorMsg={inputErrors.password}
                    />
                </StyledDiv>
                <Input 
                    label={{ text: 'Email Address'}} 
                    type="email" 
                    name="email" 
                    value={email} 
                    errorMsg={inputErrors.email}
                />
                <ImgInput 
                    type="file" 
                    name="profilePic" 
                    file={profilePic} 
                    errorMsg={inputErrors.profilePic}
                    label={{ text: 'Profile Picture', hide: true }} 
                    circle
                    previewSize="300px" 
                    imgSize="5mb"
                />
                <Input 
                    label={{ text: 'Short Bio (Optional)'}} 
                    type="text" 
                    name="bio" 
                    value={bio} 
                    errorMsg={inputErrors.bio}
                    placeholder="Tell us a little bit about yourself! (limit 200 characters)"
                />
                <SubmitBtn type="submit">Get Cookin'</SubmitBtn>
                <Center>
                    <FormFeedback errorMsg={formErrors[0]} /> 
                </Center>
            </Form>
            
        </Card>
    )
}

export default AuthForm;

const StyledHeader = styled.h1`
    font-size: 1.5rem;
    text-align: center;
    padding-top: 1rem;
`

const StyledDiv = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
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
