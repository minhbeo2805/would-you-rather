import {saveAnswer, saveQuestion} from '../utils/api'
import {updateUsers} from "./users";

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'
export const ADD_QUESTION = 'ADD_QUESTION'

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    }
}

export function answerQuestion(question) {
    return {
        type: ANSWER_QUESTION,
        question
    }
}

export function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question,
    }
}


export function handleAnswerQuestion(authedUser, qid, answer, question) {
    return (dispatch) => {
        return saveAnswer({ authedUser, qid, answer })
            .then(() => {
                const updatedQuestion = Object.assign({}, question)
                updatedQuestion[answer].votes.push(authedUser)
                dispatch(answerQuestion(updatedQuestion))
                dispatch(updateUsers(authedUser, qid, answer))

            })
    }
}

export function handleAddQuestion(optionOne, optionTwo, authedUser) {
    return (dispatch) => {
        const newQuestion = {optionOneText: optionOne, optionTwoText: optionTwo, author: authedUser}
        return saveQuestion(newQuestion)
            .then((addedQuestion) => {
                dispatch(addQuestion(addedQuestion))
            })
    }
}