import styled from 'styled-components'

import {Main} from '../components/commonStyles'
import AuthForm from '../components/auth/authForm'

const initValues = {
    email: '',
    firstName: '',
    lastName: '', 
    username: '',
    password: '',
    bio:'',
    profilePic: null
}

function AuthPage() {
    return (
        <Main>
            <AuthForm 
                initValues={initValues}
                handleSubmit={handleSubmit}
            />
        </Main>
    )
}

export default AuthPage


async function handleSubmit(values) {
    const formData = new FormData();
    Object.keys(values).forEach(key => {
        formData.append(key, values[key])
    })
    try {
        const response = await fetch('http://localhost:5000/api/users', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        if (response.status < 200 || response.status > 299) {
            throw new Error(data.message)
        };
        console.log(data);
        //do some logic here - i.e. set local storage and dispatch to store 
        return { 
            success: { 
                msg: 'Successfully registered!', 
                nextRoute: '/profile/username'
            }
        }
    } catch(err) {
        return { error: err.message }
    }
}