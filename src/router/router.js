import { createBrowserRouter } from "react-router-dom";
import PostsContainer from "../rest/post/PostsContainer";
import PostRead from "../rest/post/PostRead";
import PostUpdate from "../rest/post/PostUpdate";

const router = createBrowserRouter([
    {
        path : "/",
        element : <PostsContainer />
    }, 
    {
        path : "/read",
        element : <PostRead />,
        children : [
            {
            path : ":id",
            element : <PostRead />
        }
    ]
    },  
    {
        path : "/update",
        element : <PostUpdate />,
        children : [
            {
            path : ":id",
            element : <PostUpdate />

        }
    ]
    },

    
])

export default router;