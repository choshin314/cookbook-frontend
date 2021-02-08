import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'  
import styled from 'styled-components'
import { ajax } from '../../helpers/sendAjax';
import UserList from '../shared/UserList';

function FollowerList({username, userType}) {
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);
    const [ users, setUsers ] = useState([]);
    useEffect(() => {
        ajax.get(`/users/${username}/${userType}`)
            .then(result => {
                if (result.error) setError(result.error);
                if (result.data) setUsers(result.data);
            })
    }, [])
    
    return (
        <UserList users={users} loading={loading} error={error} />
    )
}

export default FollowerList