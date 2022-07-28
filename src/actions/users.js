export const RECEIVE_USERS = 'RECEIVE_USERS'
export const UPDATE_USER = 'UPDATE_USERS'

export function receiveUsers (users) {
  return {
    type: RECEIVE_USERS,
    users,
  }
}

export function updateUsers (userId, qid, answer) {
  return {
    type: UPDATE_USER,
    userId, qid, answer
  }
}