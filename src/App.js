 import './App.scss';
import Login from './pages/login/Login';
import Home from './pages/Home/Home';
import Register from './pages/register/Register'; 
import Posts from '../src/components/posts/Posts.jsx'
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom"; 
import Navbar from './components/navbar/Navbar.jsx';
import Profile from './pages/profile/Profile.jsx';


function App() {
 const currentUser = true;
const Layout = () => {
  return (
     <div>
       <Navbar/>
       <div stlye={{flex: 6}}>
       <Outlet />
       </div>
     </div>
  );
};

const ProtectedRoute = ({ children }) => {
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return children;
};
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);
  return (
    <div className="App">
     <div>
      <RouterProvider router={router} />
    </div>
    </div>
  );
}

export default App;
