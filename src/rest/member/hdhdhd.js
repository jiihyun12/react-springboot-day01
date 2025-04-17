import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const UpdateContainer = () => {
  const memberId = 1; // 로그인한 사용자 ID라고 가정
  const [member, setMember] = useState(null);

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { isSubmitting, errors }
  } = useForm({ mode: "onChange" });

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/;

  // ✅ 기존 회원 정보 불러오기
  useEffect(() => {
    fetch(`http://localhost:10000/members/api/member/${memberId}`)
      .then(res => res.json())
      .then(data => {
        setMember(data);
        setValue("memberEmail", data.memberEmail);
        setValue("memberName", data.memberName);
        // 비밀번호는 보안상 제외
      })
      .catch(err => console.error("회원 정보 불러오기 실패", err));
  }, [memberId, setValue]);

  // ✅ 수정 요청
  const onSubmit = async (data) => {
    const { hobbies, passwordConfirm, ...memberVO } = data;
    memberVO.id = memberId;

    console.log("수정 데이터:", memberVO);

    try {
      const response = await fetch("http://localhost:10000/members/api/modify", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(memberVO)
      });

      if (!response.ok) throw new Error("회원 정보 수정 실패");

      alert("회원 정보가 수정되었습니다.");
    } catch (error) {
      console.error(error);
      alert("수정 중 오류가 발생했습니다.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        <p>이메일</p>
        <input
          type="text"
          placeholder="이메일 입력하세요"
          {...register("memberEmail", {
            required: true,
            pattern: { value: emailRegex }
          })}
        />
        {errors.memberEmail?.type === "required" && <p>이메일을 입력하세요</p>}
        {errors.memberEmail?.type === "pattern" && <p>이메일 양식을 지켜주세요</p>}
      </label>

      <label>
        <p>비밀번호</p>
        <input
          type="password"
          placeholder="비밀번호를 입력하세요"
          {...register("memberPassword", {
            required: true,
            pattern: { value: passwordRegex }
          })}
        />
        {errors.memberPassword?.type === "required" && <p>비밀번호를 입력하세요</p>}
        {errors.memberPassword?.type === "pattern" && (
          <p>소문자, 숫자, 특수문자(!@#) 포함 8자리 이상</p>
        )}
      </label>

      <label>
        <p>비밀번호 확인</p>
        <input
          type="password"
          placeholder="비밀번호를 확인하세요"
          {...register("passwordConfirm", {
            required: true,
            validate: {
              matchPassword: (value) =>
                value === getValues("memberPassword") || "비밀번호가 일치하지 않습니다"
            }
          })}
        />
        {errors.passwordConfirm && <p>{errors.passwordConfirm.message}</p>}
      </label>

      <label>
        <p>이름</p>
        <input
          type="text"
          placeholder="이름 입력하세요"
          {...register("memberName", {
            required: true
          })}
        />
        {errors.memberName && <p>이름을 입력하세요</p>}
      </label>

      {/* 체크박스: 취미 선택 (서버로 보내지 않음) */}
      <p>취미</p>
      <label>
        <span>축구</span>
        <input name="hobby" type="checkbox" {...register("hobbies")} />
      </label>
      <label>
        <span>야구</span>
        <input name="hobby" type="checkbox" {...register("hobbies")} />
      </label>

      <button type="submit" disabled={isSubmitting}>
        회원 정보 수정
      </button>
    </form>
  );
};

export default UpdateContainer;
