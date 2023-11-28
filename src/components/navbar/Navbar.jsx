import React, { useContext } from 'react';
import './navbar.scss';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
const Navbar = () => {
    const { currentUser,logout } = useContext(AuthContext);
   console.log(currentUser);
   const handleLogout = () => {
    logout();
    
  };
    return (
        <div className='navbar'>
            <div className="left">
                <Link>
                <span>friendify</span>
                </Link>
                <HomeOutlinedIcon/>
            </div>
            <div className="right">
                <PersonOutlinedIcon/>
                {currentUser && <p onClick={handleLogout}>Logout</p>}
                <NotificationsOutlinedIcon/>
                <div className="user">
          <img
            src={ currentUser.profilePic}
            alt=""
          />
          <span>{currentUser.name}</span>
        </div>
            </div>
        </div>
    );
};

export default Navbar;