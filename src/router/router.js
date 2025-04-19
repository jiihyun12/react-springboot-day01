import { createBrowserRouter } from "react-router-dom";
import PostsContainer from "../rest/post/PostsContainer";
import PostRead from "../rest/post/PostRead";
import PostUpdate from "../rest/post/PostUpdate";
import MemberLogin from "../rest/member/MemberLogin";
import JoinContainer from "../rest/member/JoinContainer";
import UpdateContainer from "../rest/member/UpdateContainer";
import DeleteContainer from "../rest/member/DeleteContainer";
import MyPage from "../rest/mypage/MyPage";
import PostLayout from "../rest/post/PostLayout";

const router = createBrowserRouter([
  {
    path : "/post",
    element : <PostLayout />,
    children : [
      {
        index : true,
        element : <PostsContainer />
      },
      {
        path : "read",
        element : <PostRead />,
        children : [
          {
            path : ":id",
            element : <PostRead />,
          }
        ]
      },
      {
        path : "update",
        element : <PostUpdate />,
        children : [
          {
            path : ":id",
            element : <PostUpdate />,
          }
        ]
      },
    ]
  },
  {
    path : "/member/login",
    element : <MemberLogin />
  },
  {
    path : "/member/join",
    element : <JoinContainer />
  },
  {
    path : "/member/update",
    element : <UpdateContainer />
  },
  {
    path : "/member/delete",
    element : <DeleteContainer />
  },
  {
    path : "/mypage",
    element : <MyPage />
  },
])

export default router;