import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

const Mypage = () => {

    console.log("currentUser", currentUser)
    console.log("isLogin", isLogin)

    if(!isLogin){
        //
        <Navigate to ={"/member/login"} replace={true} />
    }

    const {currentUser, isLogin} =  useSelector((store)=> store.user)
    const {memberEmail, memberName, memberPassword, id} = currentUser

    return (
        <div>
           <p>아이디 : {id}</p> 
           <p>이메일 : {memberEmail}</p> 
           <p>이름 : {memberName}</p> 
           <p>비밀번호 : {memberPassword}</p> 
        </div>
    );
};

export default Mypage;