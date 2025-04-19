const { createAction, handleActions } = require("redux-actions");

// 타입 생성
const SET_USER = "user/SET_USER";
const SET_USER_STATUS = "user/SET_USER_STATUS"

export const setUser = createAction(SET_USER, (currentUser) => currentUser)
export const setUserStatus = createAction(SET_USER_STATUS, (isLogin) => isLogin)

const userInitialValue = {
  currentUser : {},
  isLogin : false
}

const user = handleActions({
  [SET_USER] : (state, action) => ({...state, currentUser : action.payload }),
  [SET_USER_STATUS] : (state, action) => ({...state, isLogin: action.payload })
}, userInitialValue)

export default user;