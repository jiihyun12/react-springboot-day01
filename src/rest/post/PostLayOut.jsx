import React from 'react';
import { Outlet } from 'react-router-dom';

const PostLayout = () => {
  return (
    <div>
      레이아웃
      <Outlet />
    </div>
  );
};

export default PostLayout;