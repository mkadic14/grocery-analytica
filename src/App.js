import React from 'react';
import './SignIn.css';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ResetPassword from './components/ResetPassword';
import Dashboard from './components/Dashboard';
import AccountProfile from './components/AccountProfile';
import GroceryList from './components/GroceryList';



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="signin-app-container">
            <div className="signin-left-container">
              <SignIn />
            </div>
            <div className="signin-right-container">
              <img src="/frontpage_image.png" alt="Logo" />
              <div className="brand-name">Grocery Analytica</div>
            </div>
          </div>
        } />
        <Route path="/signup" element={<SignUp />} /> {/* Corrected SignUp route */}
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/grocery-list" element={<Layout><GroceryList /></Layout>} />
        <Route path="/account-profile" element={<Layout><AccountProfile /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;