import {RECEIVE_USERS, UPDATE_USER} from '../actions/users'

export default function users(state = {}, action) {
    switch (action.type) {
        case RECEIVE_USERS :
            return {
                ...state,
                ...action.users
            }
        case UPDATE_USER :
            const newState = Object.assign({}, state)
            newState[action.userId]['answers'][action.qid] = action.answer
            return {
                ...newState,
            }
        default :
            return state
    }
}