import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";

const PostUpdate = () => {

const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:10000/posts/api/post/${id}`);
        const data = await response.json();
        setPost(data);
        setTitle(data.postTitle);
        setContent(data.postContent);
      } catch (error) {
        console.error("게시글 불러오기 실패:", error);
      }
    };

    fetchPost();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:10000/posts/api/post/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          postTitle: title,
          postContent: content
        })
      });

      if (response.ok) {
        alert('게시글이 수정되었습니다!');
        navigate(`/posts/${id}`); 
      } else {
        alert('수정에 실패하였습니다.');
      }
    } catch (error) {
      console.error('수정 에러 발생:', error);
    }
  };

  return (
    <div>
      <p>게시글 수정</p>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목"
      />
      <br />
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="내용"
      />
      <br />
      <button onClick={handleUpdate}>수정하기</button>
    </div>
  );
};

export default PostUpdate;