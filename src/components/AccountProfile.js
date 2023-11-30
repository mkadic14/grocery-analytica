import React, { useState } from 'react';
import '../AccountProfile.css';

const AccountProfile = () => {
    const [profileData, setProfileData] = useState({
        name: 'John Doe',
        email: 'johndoe@example.com',
        memberSince: 'January 2021',
    });

    
    const [profilePic, setProfilePic] = useState('/profilepic.jpg'); 

    
    const handleProfilePictureUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfilePic(e.target.result); 
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="account-profile">
            <div className="profile-header">
                <h2>User Profile</h2>
            </div>
            <div className="profile-picture">
                <img src={profilePic} alt="Profile" /> {/* Updated to use profilePic state */}
                <input type="file" onChange={handleProfilePictureUpload} accept="image/*" />
            </div>
            <div className="profile-details">
                <div className="profile-info">
                    <label>Name:</label>
                    <span>{profileData.name}</span>
                </div>
                <div className="profile-info">
                    <label>Email:</label>
                    <span>{profileData.email}</span>
                </div>
                <div className="profile-info">
                    <label>Member Since:</label>
                    <span>{profileData.memberSince}</span>
                </div>
            </div>
            <div className="profile-actions">
                <button className="edit-button">Edit Profile</button>
            </div>
        </div>
    );
};

export default AccountProfile;
