import { 
    FETCH_NOTIFICATIONS_START, 
    FETCH_NOTIFICATIONS_SUCCESS, 
    FETCH_NOTIFICATIONS_FAIL, 
    ADD_NOTIFICATION,
    CHECK_NOTIFICATIONS
} from '../actions/types'

import { logoutUser } from './authActions'
import { ajax } from '../../helpers/sendAjax';


export const addNotification = (newNotification) => ({
    type: ADD_NOTIFICATION,
    payload: newNotification
}) 

export const fetchNotificationsStart = () => ({ type: FETCH_NOTIFICATIONS_START });

export const fetchNotificationsFail = (error) => ({
    type: FETCH_NOTIFICATIONS_FAIL,
    payload: error
})

export const fetchNotificationsSuccess = (data) => ({
    type: FETCH_NOTIFICATIONS_SUCCESS,
    payload: data
})

export function fetchNotifications() {
    return async (dispatch, getState) => {
        dispatch(fetchNotificationsStart());
        try {
            const { data, error, status } = await ajax.get('/notifications');
            if (error && status === 401) {
                return dispatch(logoutUser("Invalid token, please log back in"))
            } else if (error) {
                return dispatch(fetchNotificationsFail(error))
            }
            return fetchNotificationsSuccess(data);
        } catch (err) {
            return dispatch(fetchNotificationsFail(err.message))
        }
    }
}

export function checkNotifications() {
    return async (dispatch, getState) => {
        const toMarkChecked = [];
        getState().notifications.notificationList.forEach(note => {
            if (!note.checked) toMarkChecked.push(note.id);
        })
        if (!toMarkChecked.length) return dispatch({ type: CHECK_NOTIFICATIONS })
        //ajax patch only if at least one notification to update to checked = true
        try {
            const { error, status } = await ajax.patch('/notifications', toMarkChecked);
            if (error && status === 401) return dispatch(logoutUser("Invalid token, please log back in"))
            if (error) throw new Error(error);
            return dispatch({ type: CHECK_NOTIFICATIONS })
        } catch (err) {
            console.log(err.message)
            return;
        }
    }
}