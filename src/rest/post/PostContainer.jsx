import React, { useEffect, useState } from 'react';

const PostContainer = () => {
  
  // 게시글 1개 조회 후 
  // 데이터의 제목과, 내용을 화면에 출력하기
  const postId = 4;
  const [post, setPost] = useState({})
  const {postTitle, postContent} = post;

    useEffect(() => {
      const getPosts = async () => {
        const response = await fetch(`http://localhost:10000/posts/api/post/${postId}`)
        const posts = await response.json()
        return posts
      }
  
      getPosts().then(setPost).catch(console.error)
    }, [])
  
    return (
      <div>
        <p>제목 : {postTitle}</p>
        <p>내용 : {postContent}</p>
      </div>
    );
};

export default PostContainer;