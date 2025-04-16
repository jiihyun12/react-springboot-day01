import React, { useEffect, useState } from 'react';

const PostsContainer = () => {

  const [posts, setPosts] = useState([])

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch("http://localhost:10000/posts/api/posts")
      const posts = await response.json()
      return posts
    }

    getPosts().then(setPosts).catch(console.error)
  }, [])

  const postLists = posts.map(({postTitle, postContent}, i) => (
    <li key={i}>
      {postTitle}
      {postContent}
    </li>
  ))

  return (
    <ul>
      {postLists}
    </ul>
  );
};

export default PostsContainer;