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
    const { notificationList, loading, uncheckedCount } = notifications;
    const [ show, setShow ] = useState(false);

    const toggleNotifications = () => {
        setShow(prev => {
            if (prev) dispatchMarkChecked();
            return !prev
        });
    }

    useEffect(() => {
        if (auth.user) dispatchFetchNotifications();
    }, [ auth.user, dispatchFetchNotifications ])

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
            <NotificationNavBtn onClick={toggleNotifications} count={uncheckedCount} />
            <NotificationList 
                show={show} 
                loading={loading}
                notifications={notificationList} 
                toggle={toggleNotifications}
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