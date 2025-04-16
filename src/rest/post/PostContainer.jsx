import React, { use } from 'react';

const PostContainer = () => {

    // 게시글 1개 조회 후 데이터의 제목과 내용을 화면에 출력하기

    const postId = 8;

    const [post, setPost] = useState([]);
    useEffect(()=>{
        const getPost = async () => {
            const response = await fetch(`http://localhost:10000/posts/api/posts/${postId}`)
            const post = await response.json()
            return post
        }

        getPost().then(setPost).catch(console.error)
    }, [])

    const postList = post.map(({postTitle, postContent}, i) => (
        <li key={i}>
            {postTitle}
            {postContent}
        </li>
    ))
    return (
        <div>
            {postList}
        </div>
    );
};

export default PostContainer;