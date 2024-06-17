import React from 'react';
import './loginPage.css';
import { FaGoogle } from "react-icons/fa";
import {  auth, googleProvider } from '../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
const LoginPage = () => {
    const navigate = useNavigate();
    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const { displayName, email } = result.user;
            localStorage.setItem('user', displayName)
            console.log("User signed in:", displayName, email);
            navigate('/Home');
        } catch (error) {
            console.error("Error during sign in:", error);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h1>Welcome to <span>Reciipie</span></h1>
                <p>Please sign in to continue</p>
                <button className="google-signin" onClick={signInWithGoogle}>
                    <FaGoogle />{''}
                    Continue with Google
                </button>
            </div>
        </div>
    );
};

export default LoginPage;