import {getLatestData} from '../utils/api'
import {receiveUsers} from './users'
import {receiveQuestions} from "./questions";

export function handleGetLatestData() {
    return (dispatch) => {
        return getLatestData()
            .then(({users, questions}) => {
                dispatch(receiveUsers(users))
                dispatch(receiveQuestions(questions))
            })
    }
}