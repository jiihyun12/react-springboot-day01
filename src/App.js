
import { RouterProvider } from 'react-router-dom';
import './App.css';
import DeleteContainer from './rest/member/DeleteContainer';
import router from './router/router';


function App() {
  return (
   <>
    <RouterProvider router={router} />
   </>
  );
}

export default App;
