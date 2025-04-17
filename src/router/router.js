import { createBrowserRouter } from "react-router-dom";
import PostsContainer from "../rest/post/PostsContainer";
import PostRead from "../rest/post/PostRead";
import PostUpdate from "../rest/post/PostUpdate";
import PostDelete from "../rest/post/PostDelete";

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
        path : "/update/:id",
        element : <PostUpdate />,
        
    },
    {
        path : "/delete/:id",
        element : <PostDelete />,
        
    },

])


export default router;