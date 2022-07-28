import {ADD_QUESTION, ANSWER_QUESTION, RECEIVE_QUESTIONS} from "../actions/questions";

export default function questions (state = {}, action) {
    switch(action.type) {
        case RECEIVE_QUESTIONS :
            return {
                ...state,
                ...action.questions
            }
        case ANSWER_QUESTION:
            return {
                ...state,
                [action.question.id]: Object.assign({}, action.question)
            }
        case ADD_QUESTION:
            return {
                ...state,
                [action.question.id]: Object.assign({}, action.question)
            }
        default :
            return state
    }
}