import { useEffect, useState, useRef, useCallback } from 'react'
import { connect } from 'react-redux'
import { ajax } from '../../helpers/sendAjax';
import { setFlash } from '../../redux/actions/flashActions';
import BottomObserver from '../shared/BottomObserver';
import Spinner from '../shared/Spinner';
import UserList from '../shared/UserList';

function FollowsListContainer({username, userType, dispatchSetFlash }) {
    const [ loading, setLoading ] = useState(false);
    const [ users, setUsers ] = useState([]);
    const [ endOfList, setEndOfList ] = useState(false);
    const listRef = useRef(null)
    const initFetchCalled = useRef(false);

    const getMoreUsers = useCallback((users) => {
        const lastUser = users[users.length - 1];
        const query = lastUser ? 
            `?ff=${lastUser.firstName}&fl=${lastUser.lastName}&fu=${lastUser.username}` : 
            ''
 
        setLoading(prev => true);
        ajax.get(`/users/${username}/${userType+query}`)
            .then(result => {
                if (result.error) dispatchSetFlash('error', result.error);
                if (result.data) {
                    setUsers(prev => [ ...prev, ...result.data ])
                    if (result.data.length === 0) {
                        setEndOfList(true);
                    }
                }
            })
            .catch(err => {
                setFlash('error', err.message)
            })
        setLoading(prev => false); 
    }, [dispatchSetFlash, username, userType])
    
    const observerCallback = useCallback(() => {
        if (users.length === 0 || endOfList) return;
        getMoreUsers(users)
    }, [users, endOfList, getMoreUsers])

    useEffect(() => {
        if (initFetchCalled.current || users.length > 0) return;
        getMoreUsers(users)
        initFetchCalled.current = true;
    }, [users, getMoreUsers])
    
    return (
        <>
            {loading && <Spinner />}
            <UserList 
                ref={listRef}
                users={users} 
                observer={<BottomObserver 
                    onIntersect={observerCallback} 
                    loading={loading}
                    endOfList={endOfList} 
                    deps={[ users, observerCallback ]}
                />}
            />
        </>
    )
}

const mapDispatch = { dispatchSetFlash: setFlash }
export default connect(null, mapDispatch)(FollowsListContainer)