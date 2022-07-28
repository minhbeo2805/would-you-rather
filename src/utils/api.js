import {
  _getQuestions,
  _getUsers, _saveQuestion, _saveQuestionAnswer,
} from './_DATA.js'

export function getLatestData () {
  return Promise.all([
    _getUsers(),
    _getQuestions(),
  ]).then(([users, questions]) => ({
    users,
    questions,
  }))
}

export function saveQuestion (question) {
  return _saveQuestion(question)
}

export function saveAnswer ({ authedUser, qid, answer }) {
  return _saveQuestionAnswer({ authedUser, qid, answer })
}

export function getQuestions () {
  return _getQuestions()
}

export function getUsers () {
  return _getUsers()
}
// export function saveTweet (info) {
//   return _saveTweet(info)
// }