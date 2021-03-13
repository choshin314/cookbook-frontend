import { useEffect, useState, useRef } from 'react'
import { ajax } from '../../helpers/sendAjax';
import { setFlash } from '../../redux/actions/flashActions';
import BottomObserver from '../shared/BottomObserver';
import Spinner from '../shared/Spinner';
import UserList from '../shared/UserList';

function FollowsListContainer({username, userType}) {
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);
    const [ users, setUsers ] = useState([]);
    const [ endOfList, setEndOfList ] = useState(false);
    const listRef = useRef(null)

    const getMoreUsers = () => {
        const lastUser = users[users.length - 1];
        const query = lastUser ? 
            `?ff=${lastUser.firstName}&fl=${lastUser.lastName}&fu=${lastUser.username}` : 
            ''
 
        setLoading(prev => true);
        ajax.get(`/users/${username}/${userType+query}`)
            .then(result => {
                if (result.error) setError(result.error);
                if (result.data) {
                    setUsers(prev => [ ...prev, ...result.data ])
                }
            })
            .catch(err => {
                setFlash('error', err.message)
            })
        setLoading(prev => false); 
    }
    
    const observerCallback = () => {
        if (users.length === 0) return;
        getMoreUsers()
    }

    useEffect(getMoreUsers, [])
    
    return (
        <>
            {loading && <Spinner />}
            <UserList 
                ref={listRef}
                users={users} 
                observer={<BottomObserver 
                    users={users}
                    onIntersect={observerCallback} 
                    loading={loading}
                    endOfList={endOfList} 
                    deps={[users]}
                />}
            />
        </>
    )
}

export default FollowsListContainer