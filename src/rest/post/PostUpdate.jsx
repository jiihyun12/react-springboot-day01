import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";

const PostUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const updatePost = async () => {
      try {
        const response = await fetch(`http://localhost:10000/posts/api/post/${id}`);
        const data = await response.json();
        setPost(data);
        setTitle(data.postTitle);
        setContent(data.postContent);
      } catch (error) {
        console.error("게시글 못 불러온다 안하나!", error);
      }
    };

    updatePost();
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
        alert('수정 했다잇');
        navigate(`/`);
      } else {
        alert('수정 실패다잇');
      }
    } catch (error) {
      console.error('수정 에러 발생 애옹애옹', error);
    }
  };

  return (
    <div>
      <h2>게시글 수정</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목을 입력하세요"
      />
      <br />
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="내용을 입력하세요"
      />
      <br />
      <button onClick={handleUpdate}>
        수정 완료 하기
      </button>
    </div>

  );
};

export default PostUpdate;
