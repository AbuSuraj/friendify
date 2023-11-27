 import './App.scss';
import Login from './pages/login/Login';
import Home from './pages/Home/Home';
import Register from './pages/register/Register'; 
 
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom"; 
import Navbar from './components/navbar/Navbar.jsx';
import Profile from './pages/profile/Profile.jsx';
import { useContext } from 'react';
import { AuthContext } from './context/authContext.js';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const { currentUser } = useContext(AuthContext);
  const queryClient = new QueryClient();
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
