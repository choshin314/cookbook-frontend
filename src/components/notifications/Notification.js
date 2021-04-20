import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { io } from 'socket.io-client'

import { addNotification, fetchNotifications, checkNotifications } from '../../redux/actions/notificationsActions'
import NotificationNavBtn from "./NotificationNavBtn"
import NotificationList from './NotificationList'

const SERVER_URL = process.env.REACT_APP_BACKEND;

function Notification(props) {
    const { 
        auth, 
        notifications, 
        dispatchAddNotification, 
        dispatchFetchNotifications,
        dispatchMarkChecked 
    } = props;
    const [ show, setShow ] = useState(false);
    const { notificationList, loading, uncheckedCount } = notifications;
    const showNotifications = () => {
        setShow(true);
        dispatchMarkChecked();
    }
    useEffect(() => {
        let socket;
        if (auth.user) {
            socket = io(SERVER_URL, { extraHeaders: { "user": auth.user.id }});
            socket.on("newNotification", data => {
                dispatchAddNotification(data);
            })
        }
        if (!auth.user && socket) socket.disconnect();
        return () => {
            if (socket) socket.disconnect();
        }
    }, [auth.user, dispatchAddNotification])

    return (
        <>
            <NotificationNavBtn onClick={showNotifications} count={uncheckedCount} />
            <NotificationList 
                show={show} 
                loading={loading}
                notifications={notificationList} 
            />
        </>
    )
}

const mapState = state => ({ auth: state.auth, notifications: state.notifications })
const mapDispatch = { 
    dispatchAddNotification: addNotification,
    dispatchFetchNotifications: fetchNotifications,
    dispatchMarkChecked: checkNotifications
};
export default connect(mapState, mapDispatch)(Notification)


const mockNotifications = [
    {
        id: 1,
        followerId: 123,
        followerUsername: 'abc123',
        reviewId: null,
        recipeId: null,
        recipeTitle: null,
        createdAt: new Date(),
        checked: false,
        type: "follow"
    },
    {
        id: 2,
        followerId: 133,
        followerUsername: 'bbc123',
        reviewId: null,
        recipeId: null,
        recipeTitle: null,
        createdAt: new Date(),
        checked: false,
        type: "follow"
    },
    {
        id: 3,
        followerId: null,
        followerUsername: null,
        reviewId: 2,
        recipeId: 22,
        recipeTitle: 'pork',
        createdAt: new Date(),
        checked: false,
        type: "review"
    },
    {
        id: 4,
        followerId: null,
        followerUsername: null,
        reviewId: 4,
        recipeId: 30,
        recipeTitle: 'beef',
        createdAt: new Date(),
        checked: false,
        type: "review"
    },
    {
        id: 5,
        followerId: 50,
        followerUsername: 'cababc123',
        reviewId: null,
        recipeId: null,
        recipeTitle: null,
        createdAt: new Date(),
        checked: false,
        type: "follow"
    }
]