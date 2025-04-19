import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';

const MyPage = () => {

  const {currentUser, isLogin} = useSelector((store) => store.user)
  const {memberEmail, memberName, memberPassword, id} = currentUser;
  
  console.log("currentUser", currentUser)
  console.log("isLogin", isLogin)

  const navagate = useNavigate()

  if(!isLogin) {
    // 이벤트가 발생해서 이동시킬 때
    // navagate("/member/login", { state : "로그인이 필요한 페이지입니다" })
    
    return <Navigate to={"/member/login"} state={{message: "로그인이 필요한 페이지입니다" }} replace={true} />
  }

  return (
    <div>
      <p>아이디: {id}</p>
      <p>이메일 : {memberEmail}</p>
      <p>이름 : {memberName}</p>
      <p>비밀번호 : {memberPassword}</p>
    </div>
  );
};

export default MyPage;