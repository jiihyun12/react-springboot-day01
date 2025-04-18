import { createAction, handleActions } from "redux-actions";

// 타입 생성
const SET_USER = "user/SET/USER";

const SET_USER_STATUS = "user/SET_USER_STATUS";

const setUser = createAction(SET_USER, (currentUser)=> currentUser );
const setUserStatus = createAction(SET_USER_STATUS, (isLogin)=> isLogin );

const UserInitialValue = {
    currentUser : {},
    isLogin : false
}

const user = handleActions({
    [SET_USER] : (state, action) => ({...state, currentUser : action.payload}),
    [SET_USER_STATUS] : (state, action) => ({...state, login : action.payload})

}, UserInitialValue)

export default user;