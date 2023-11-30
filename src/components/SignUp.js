import React, { useState } from 'react';
import { auth, createUserWithEmailAndPassword, updateProfile } from '../firebase'; 
import { useNavigate, Link } from 'react-router-dom';
import '../SignUp.css';

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            
      
            await updateProfile(userCredential.user, {
                displayName: name
            });

            console.log("Account created:", userCredential.user);
            navigate('/dashboard'); 
        } catch (error) {
            console.error("Error signing up:", error);
        }
    };

    return (
        <div className="signup-container">
            <img src="/frontpage_image.png" alt="Logo" className="signup-logo" />
            <h1>Create an Account</h1>
            <p>Let's get started!</p>
            <form onSubmit={handleSignUp}>
                <div className="signup-input-container">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" placeholder="" onChange={e => setName(e.target.value)} />
                </div>
                <div className="signup-input-container">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="" onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="signup-input-container">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="" onChange={e => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="signup-button">Sign Up</button>
                <p>Already have an account? <Link to="/">Sign In</Link></p>
            </form>
        </div>
    );
};

export default SignUp;