import {
    FETCH_PROFILE_START, 
    FETCH_PROFILE_FAIL, 
    FETCH_PROFILE_SUCCESS, 
    SET_PROFILE_STATS
} from '../constants/profileConstants'

const initProfileState = {
    loading: false,
    error: null,
    user: null, //firstName, lastName, username, id, profilePic, bio
    stats: null //recipeCount, followerCount, followingCount
}

export default function profileReducer(profileState=null, action) {
    switch(action.type) {
        case FETCH_PROFILE_START:
            return { ...profileState, loading: true }
            break;
        case FETCH_PROFILE_FAIL:
            return { ...profileState, loading: false, error: action.payload }
            break;
        case FETCH_PROFILE_SUCCESS:
            return { 
                ...profileState, 
                loading: false, 
                user: action.payload[0],
                stats: action.payload[1]
            }
            break;
        case SET_PROFILE_STATS:
            return { ...profileState, stats: action.payload }
            break;
        default: 
            return profileState
    }
}



