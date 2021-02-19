import {getLocalStorage} from '../../helpers'
import {
    FETCH_PROFILE_START, 
    FETCH_PROFILE_FAIL, 
    FETCH_PROFILE_SUCCESS, 
    SET_PROFILE_STATS
} from '../actions/types'

const initProfileState = getLocalStorage('profile') || {
    loading: false,
    error: null,
    user: null, //firstName, lastName, username, id, profilePic, bio
    stats: null //recipeCount, followerCount, followingCount
}

export default function profileReducer(profileState=initProfileState, action) {
    switch(action.type) {
        case FETCH_PROFILE_START:
            return { ...profileState, loading: true }
        case FETCH_PROFILE_FAIL:
            return { ...profileState, loading: false, error: action.payload }
        case FETCH_PROFILE_SUCCESS:
            return { 
                ...profileState, 
                loading: false, 
                user: action.payload.user,
                stats: action.payload.stats
            }
        case SET_PROFILE_STATS:
            return { ...profileState, stats: action.payload }

        default: 
            return profileState
    }
}



