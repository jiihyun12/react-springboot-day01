import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const PostDelete = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const handleDelete = async () => {
            if (!window.confirm("마 진짜 삭제합니더?")) {
                navigate(`/read/${id}`);
                return;
            }

            try {
                const res = await fetch(`http://localhost:10000/posts/api/post/${id}`, {
                    method: "DELETE"
                });

                if (res.ok) {
                    alert("삭제 했지렁~");
                    navigate("/");
                } else {
                    alert("삭제 실패했지렁~");
                    navigate(`/read/${id}`);
                }
            } catch (error) {
                console.error("삭제 중 오류 발생했지렁", error);
                navigate(`/read/${id}`);
            }
        };

        handleDelete(); 
    }, [id]);

    return (
        <div>
            <p>삭제 중입니더 학!씨~</p>
        </div>
    );
};

export default PostDelete;
