'use client';

import Cookies from "js-cookie";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';



export default function login() {

    const router = useRouter();
    
    //to store the email and password typed
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });


    const [showPassword, setShowPassword] = useState(false);

    const [showInvalidPopup, setShowInvalidPopup] = useState(false);


    //to update any field that being typed  
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setShowInvalidPopup(false);
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };



    //sending data to backend for email and password verification
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const response = await fetch('/api', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'login',
                    email: formData.email, 
                    password: formData.password}),
            });
           
            const data = await response.json();           

            if(data.success) {
                const id = data.userid;
                Cookies.set("userid", id);
                router.push(
                    `/profile/${id}`
                );
            }
            else {
                setShowInvalidPopup(true);
                console.log('Login failed:', data.message);
            }

        } catch (error) {
            console.error('Error:', error);
        }

        
    };


    const changeView = () => {
        setShowPassword(!showPassword);
    }



    return (
        <div className={styles.container}>
            <form className={styles.loginForm} onSubmit={handleSubmit}>
                <h1>Log in</h1>
                <label className={styles.label} htmlFor="email">Email</label>
                
                <input 
                type="email" 
                placeholder="Enter your Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}   
                className={styles.inputField}></input>

                <label className={styles.label} htmlFor="password">Password</label>
                
                <input 
                type= {showPassword ? "text" : "password"}
                placeholder="Enter your password" 
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={styles.inputField}></input>

                <p className={styles.showPass} onClick={changeView}>{showPassword ? 'hide password' : 'show password' }</p>
                
                <button 
                type="submit" 
                className={styles.submitButton}
                >Login</button>
                
                <p align='center'>Don't have an account? <br></br> 
                    <a href='/signin' className={styles.link}>Sign up</a></p>
            </form>
            {showInvalidPopup && (
                <div className={styles.invalidPopup}>
                    Invalid username or password
                </div>
            )}
            

        </div>
    );
}

