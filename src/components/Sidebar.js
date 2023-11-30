import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaList, FaUser, FaSignOutAlt } from 'react-icons/fa';
import '../Sidebar.css';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();
    const auth = getAuth();
  
    const handleLogout = async () => {
      try {
        await signOut(auth);
        navigate('/');
      } catch (error) {
        console.error('Logout failed:', error);
      }
    };

    return (
        <aside className="sidebar">
            <img src="/frontpage_image.png" alt="Logo" className="sidebar-logo" />
            <div> {/* Start of the div wrapping the ul */}
                <ul className="sidebar-nav">
                    <li><NavLink to="/dashboard" className="sidebar-nav-item"><FaHome className="sidebar-icon" />Dashboard</NavLink></li>
                    <li><NavLink to="/grocery-list" className="sidebar-nav-item"><FaList className="sidebar-icon" />Grocery List</NavLink></li>
                    <li><NavLink to="/account-profile" className="sidebar-nav-item"><FaUser className="sidebar-icon" />Account Profile</NavLink></li>
                </ul>
            </div> {/* End of the div */}
            <button onClick={handleLogout} className="sidebar-logout"><FaSignOutAlt className="sidebar-icon" />Logout</button>
        </aside>
    );
};

export default Sidebar;
