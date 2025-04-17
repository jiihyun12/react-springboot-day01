import React from 'react';
import { useForm } from 'react-hook-form'; // 폼 상태 관리 및 유효성 검사 기능 제공

const MemberLogin = () => {

  const {
    register, // input을 react-hook-form에 등록할 때 사용
    handleSubmit, // 폼 제출 시 실행할 함수 지정
     getValues, // 현재 input 값들을 가져오는 함수
     formState: { 
      isSubmitting, // 제출중 여부
      isSubmitted,  // 제출 완료 여부
      errors // 유효성 검사에서 발생한 에러 정보
    }
    } = useForm({mode:"onChange"}) // onchange 모드는 input 값이 변경될 때마다 유효성 검사가 실행된다.

  // 이메일 형식을 맞춘 정규식
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // 소문자, 특수문자, 숫자를 포함한 8자리 이상의 정규식
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/;

  return (
    <form onSubmit={handleSubmit(async (data) => { // 사용자가 form을 제출하면 이 함수가 실행된다.

        console.log(data)
       const  {hobbies, passwordConfirm, ...memberVO} = data 
       // 객체 비구조화 할당을 사용하여 hobbies와 passwordConfirm을 제외한 나머지 값을 memberVO에 담는다.
      //  passwordConfirm은 비밀번호 확인을 위한 값이므로 제외한다.
      //  hobbies는 체크박스의 값이므로 제외한다.
      //  나머지 값들을 memberVO에 담는다.
      

        // const {memberEmail, memberPassword, memberName} = data;
        // const memberVO = {
        //     memberEmail,
        //     memberPassword,
        //     memberName
        // }

        console.log(memberVO); // 서버에 보낼 회원 정보 확인용

    //   console.log(data) 

    // 백엔드(Spring Boot)로 회원가입 정보를 전송한다.
    fetch("http://localhost:10000/members/api/join", { // 회원가입 API 호출
        method : "POST", // POST 요청을 보낸다.
        // fetch는 기본적으로 GET 요청을 보낸다. POST 요청을 보내기 위해서는 method를 POST로 설정해야 한다.
        headers : { // 요청 헤더를 설정한다.
          "Content-Type" : "application/json" // JSOn 타입으로 전송한다.
        }, 
        body : JSON.stringify(memberVO) // JsvaScript 객체를 JSON 문자열로 변환하여 전송한다.
      })


    })}>

      
      <label>
        <p>이메일</p>
        <input 
          type="text" placeholder='이메일 입력하세요'
          {...register("memberEmail", {
            required : true, // 필수 입력값
            pattern : { // 정규표현식 검사(이메일 형식이 맞는지)
              value : emailRegex
            }
          })}
        />
        {/* 이메일 형식이 맞지 않으면 에러 메시지를 출력한다. */}
        {/* errors는 react-hook-form에서 제공하는 에러 객체이다. */}
        {/* errors?.memberEmail?.type === "required"는 memberEmail이 필수 입력값으로 설정되어 있고, 값이 없을 때 에러 메시지를 출력한다. */}
        {errors && errors?.memberEmail?.type === "required" && (
          <p>이메일을 입력하세요</p>
        )}
         {/* errors?.memberEmail?.type === "pattern"는 memberEmail이 정규표현식 검사에서 실패했을 때 에러 메시지를 출력한다. */}
        {errors && errors?.memberEmail?.type === "pattern" && (
          <p>이메일 양식을 지켜주세요</p>
        )}
      </label>

      <label>
        <p>비밀번호</p>
        <input 
          type="password" placeholder="비밀번호를 입력하세요."
          {...register("memberPassword", {
            required : true, // 필수 입력값
            pattern : {
              value : passwordRegex 
            }
          })}
        />
        {errors && errors?.memberPassword?.type === "required" && (
          <p>비밀번호를 입력하세요</p>
        )}
        {errors && errors?.memberPassword?.type === "pattern" && (
          <p>소문자, 숫자, 특수문자(!@#)을 포함한 8자리 이상의 비밀번호를 사용하세요.</p>
        )}
      </label>

      <label>
        <p>비밀번호 확인</p>
        <input 
          type="password" placeholder="비밀번호를 입력하세요."
          {...register("passwordConfirm", {
            required : true,
            validate : {
              matchPassword : (passwordConfirm) => {
                const { memberPassword } = getValues();
                console.log(memberPassword === passwordConfirm)
                return memberPassword === passwordConfirm
              }
            }
          })}
        />
        {errors && errors?.passwordConfirm === "required" && (
          <p>비밀번호가 일치하지 않습니다</p>
        )}
      </label>

      <label>
        <p>이름</p>
        <input 
          type="text" placeholder="비밀번호를 입력하세요."
          {...register("memberName", {
            required : true,
          })}
        />
        {errors && errors?.memberName?.type === "required" && (
          <p>이름을 입력하세요</p>
        )}
      </label>

      {/* 체크박스 */}
      <p>취미</p>
      <label>
        <span>축구</span><input name="hobby" type="checkbox" {...register("hobbies")}/>
      </label>
      <label>
        <span>야구</span><input name="hobby" type="checkbox" {...register("hobbies")}/>
      </label>

      {/* isSubmitting이 true일 때 버튼을 비활성화한다. --> 자동으로 react-hook-form이 설정해준다. */}
      <button disabled={isSubmitting}>회원가입</button> 
    </form>
  );
};

export default MemberLogin;