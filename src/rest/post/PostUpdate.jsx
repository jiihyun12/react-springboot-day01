import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';

const PostUpdate = () => {
  const {register, handleSubmit, getValues, reset, formState: { isSubmitting, isSubmitted, errors }} = useForm({mode:"onChange"})

  const {id} = useParams();

  return (
    <form onSubmit={handleSubmit(async (data) => {
      
      const postVO = {...data, id};
      console.log(postVO)

      await fetch(`http://localhost:10000/posts/api/post/${id}`, {
        method : "PUT",
        headers : {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(postVO)
      }).then((res) => {
        console.log("fetch 성공!")
      }).catch((e) => {
        console.log("fetch 실패!")
      })
    })}>
      
      <label>
        <p>제목</p>
        <input 
          type="text" placeholder='제목'
          {...register("postTitle", {
            required : true,
          })}
        />
        {errors && errors?.postTitle?.type === "required" && (
          <p>제목을 입력하세요</p>
        )}
      </label>

      <label>
        <p>내용</p>
        <input 
          type="text" placeholder="내용을 입력하세요"
          {...register("postContent", {
            required : true,
          })}
        />
        {errors && errors?.postContent?.type === "required" && (
          <p>내용을 입력하세요</p>
        )}
      </label>

      <button disabled={isSubmitting}>게시글 수정</button>
      <Link to={`/read/${id}`}>뒤로가기</Link>
    </form>
  );
};

export default PostUpdate;