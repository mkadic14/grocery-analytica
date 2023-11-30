import React, { useState } from 'react';
import { auth, signInWithEmailAndPassword } from '../firebase'; 
import { useNavigate, Link } from 'react-router-dom';
import '../SignIn.css'; 

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    const signIn = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("Signed in user:", userCredential.user);
            if (rememberMe) {
                localStorage.setItem('rememberMe', email);
            } else {
                localStorage.removeItem('rememberMe');
            }
            navigate('/dashboard');
        } catch (error) {
            console.error("Error signing in:", error);
        }
    };

    return (
        <div className="signin-container">
            <h1>Welcome Back!</h1>
            <p>Don't have an account yet? <Link to="/signup">Sign Up</Link></p>
            <form onSubmit={signIn}>
                <div className="signin-input-container">
                    <label htmlFor="email" style={{ color: 'white' }}>Email</label>
                    <input type="email" id="email" placeholder="" onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="signin-input-container">
                    <label htmlFor="password" style={{ color: 'white' }}>Password</label>
                    <input type="password" id="password" placeholder="" onChange={e => setPassword(e.target.value)} />
                </div>
                <div className="signin-options-container">
    <div>
        <input type="checkbox" id="rememberMe" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />
        <label htmlFor="rememberMe">Remember me</label>
    </div>
    <Link to="/reset-password" className="signin-forgot-password">Forgot Password?</Link>
</div>

                <button type="submit" className="signin-login-button">Log In</button>
            </form>
        </div>
    );
};

export default SignIn;