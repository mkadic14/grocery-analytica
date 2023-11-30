import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await sendPasswordResetEmail(auth, email);
            setMessage('Check your email for the password reset link');
        } catch (error) {
            console.error("Error sending password reset email:", error);
            setMessage('Failed to send password reset email');
        }
    };

    return (
        <div className="signup-container"> {/* Reusing signup-container styles */}
            <h1>Reset Password</h1>
            <form onSubmit={handleSubmit}>
                <div className="signup-input-container"> {/* Reusing signup-input-container styles */}
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder=""
                    />
                </div>
                <button type="submit" className="signup-button">Send Reset Link</button> {/* Reusing signup-button styles */}
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ResetPassword;