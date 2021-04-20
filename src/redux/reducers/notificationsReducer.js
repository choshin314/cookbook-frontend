import { 
    FETCH_NOTIFICATIONS_START, 
    FETCH_NOTIFICATIONS_SUCCESS, 
    FETCH_NOTIFICATIONS_FAIL, 
    ADD_NOTIFICATION,
    CHECK_NOTIFICATIONS,
    LOGOUT 
} from '../actions/types'

const initState = {
    loading: false,
    error: null,
    notificationList: [], 
    notificationIds: new Set(),
    uncheckedCount: 0
}

/* notification model = { 
    id: int,
    checked: bool,
    createdAt: int (date),
    recipientId: str,
    newReviewId: int,
    newFollowerId: str,
    follower: {
        id: str,
        username: str
    },
    review: {
        id: int,
        rating: int,
        reviewer: {
            id: str,
            username: str
        },
        recipe: {
            id: int,
            title: str,
            slug: str
        }
    }
} */

export default function reducer(state=initState, action) {
    switch (action.type) {
        case FETCH_NOTIFICATIONS_START: {
            return { ...state, loading: true, error: null };
        }

        case FETCH_NOTIFICATIONS_FAIL: {
            return { ...state, loading: false, error: action.payload };
        }

        case FETCH_NOTIFICATIONS_SUCCESS: {
            //action.payload = data = notification array
            //filter array for ids not already included in notificationIds
            let newNotifications = [ ...state.notificationList ];
            let newIds = new Set([ ...state.notificationIds ]);
            let newCount = state.uncheckedCount;
            for (let note of action.payload) {
                if (!newIds.has(note.id)) {
                    newNotifications.push(note);
                    newIds.add(note.id);
                    newCount++;
                }
            }
            return {
                ...state,
                loading: false,
                notificationList: newNotifications,
                notificationIds: newIds,
                uncheckedCount: newCount
            } 
        }

        case ADD_NOTIFICATION: {
            const newNotification = action.payload;
            if (state.notificationIds.has(newNotification.id)) return state;
            return {
                ...state,
                notificationList: [ newNotification, ...state.notificationList ],
                notificationIds: new Set([ newNotification.id, ...state.notificationIds ]),
                uncheckedCount: state.uncheckedCount + 1
            }
        }

        case CHECK_NOTIFICATIONS: {
            const allChecked = state.notificationList.map(note => ({
                ...note,
                checked: true
            }));
            return {
                ...state,
                notificationList: allChecked,
                uncheckedCount: 0
            }
        }

        case LOGOUT: {
            return initState;
        }

        default: {
            return state;
        }
    }
}