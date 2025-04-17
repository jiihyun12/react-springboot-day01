import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

const PostRead = () => {
    // 쿼리스트링
    // const [searchParams] = useSearchParams();
    // console.log(useSearchParams.length("id"))


    // URL 파라미터
    const {id} = useParams();
    const navigate = useNavigate();
    console.log(id)

    // post 게시글 한 개 조회하기
    const [post, setPost] = useState({});
    const {postTitle, postContent} = post;
    

    useEffect(()=>{
        const posts = async () => {
            const response = await fetch(`http://localhost:10000/posts/api/post/${id}`)
            const datas = await response.json();
            return datas;
        }
        posts()
        .then(setPost)
        .catch(console.error);
    }, [id]);

    const handleGoToEdit = () => {
        navigate(`/posts/edit/${id}`);
      };
    
    return (
        <div>
        <p>{postTitle}</p>
        <p>{postContent}</p>
        <button onClick={handleGoToEdit}>수정하기</button>
      </div>
  
);
};

export default PostRead;