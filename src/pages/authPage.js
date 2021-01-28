import {connect} from 'react-redux'
import styled from 'styled-components'

import { setUser } from '../redux/actions/userActions'
import {Main} from '../components/commonStyles'
import AuthForm from '../components/auth/authForm'
import { setLocalStorage } from '../helpers'

const initValues = {
    email: '',
    firstName: '',
    lastName: '', 
    username: '',
    password: '',
    bio:'',
    profilePic: null
}

function AuthPage({user, setUser}) {
    async function handleSubmit(values) {
        const formData = new FormData();
        Object.keys(values).forEach(key => {
            formData.append(key, values[key])
        })
        try {
            const response = await fetch('http://localhost:5000/api/users/register', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            if (response.status < 200 || response.status > 299) {
                throw new Error(data.message)
            };
            console.log(data);
            setLocalStorage('accessToken', data.accessToken);
            setUser(data.user);
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
    console.log(user);
    return (
        <Main>
            {!user && (<AuthForm 
                initValues={initValues}
                handleSubmit={handleSubmit}
            />)}
            {user && (<div>Logged in as {user.name}</div>)}
        </Main>
    )
}

const mapStateToProps = (global) => ({ user: global.user });
const mapDispatchToProps = { setUser }

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage)


