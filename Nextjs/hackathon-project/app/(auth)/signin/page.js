'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../login/login.module.css';
import Dropdown from './dropdown';
import bcrypt from 'bcryptjs';


export default function signin() {

    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        location: '',
        pass2: '',
    });

    const [selectedLocation, setSelectedLocation] = useState('');

    const [showInvalidPopup, setShowInvalidPopup] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setShowInvalidPopup(false);
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    const handleSelectLocation = (value) => {
        setSelectedLocation(value);
        setShowInvalidPopup(false);
        setFormData((prevData) => ({
            ...prevData,
            location: value,
        }));
    }

    const districts = [
        "Bagerhat", "Bandarban", "Barguna", "Barishal", "Bhola", "Bogura", "Brahmanbaria", "Chandpur", "Chattogram",
        "Chuadanga", "Cox's Bazar", "Cumilla", "Dhaka", "Dinajpur", "Faridpur", "Feni", "Gaibandha", "Gazipur", 
        "Gopalganj", "Habiganj", "Jamalpur", "Jashore", "Jhalokathi", "Jhenaidah", "Joypurhat", "Khagrachari", "Khulna",
        "Kishoreganj", "Kurigram", "Kushtia", "Lakshmipur", "Lalmonirhat", "Madaripur", "Magura", "Manikganj", "Meherpur",
        "Moulvibazar", "Munshiganj", "Mymensingh", "Naogaon", "Narail", "Narayanganj", "Narsingdi", "Natore", "Netrokona", 
        "Nilphamari", "Noakhali", "Pabna", "Panchagarh", "Patuakhali", "Pirojpur", "Rajbari", "Rajshahi", "Rangamati",
        "Rangpur", "Satkhira", "Shariatpur", "Sherpur", "Sirajganj", "Sunamganj", "Sylhet", "Tangail", "Thakurgaon"
    ];




    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {

            if(formData.password === formData.pass2) {
                const hashedPassword = await bcrypt.hash(formData.password, 10);

                const response = await fetch('/api', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        type: 'signup',
                        email: formData.email, 
                        password: hashedPassword,
                        name: formData.name,
                        location: formData.location,
                    }),
                });

                const data = await response.json();        

                if(data.success) {
                    router.push(
                        "/login"
                    );
                }
                else {
                    setShowInvalidPopup(true);
                }
            }
            else 
                window.alert('Check the passwords again!!');

            

        } catch (error) {
            console.error('Error:', error);
        }

        
    };


    const changeView = () => {
        setShowPassword(!showPassword);
    }




    return (
        <div className={styles.container2}>
            <form className={styles.loginForm2} onSubmit={handleSubmit}>
                <h1>Sign Up</h1>

                <label className={styles.label} htmlFor="name">Full Name</label>
                <input 
                type="text" 
                placeholder="Enter your Full Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}   
                className={styles.inputField}></input>

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

                <label className={styles.label} htmlFor="pass2">Confirm Password</label>
                <input 
                type= {showPassword ? "text" : "password"}
                placeholder="Re-enter your password" 
                name="pass2"
                value={formData.pass2}
                onChange={handleInputChange}
                className={styles.inputField}></input>

                <p className={styles.showPass} onClick={changeView}>{showPassword ? 'hide password' : 'show password' }</p>

                <label className={styles.label} htmlFor="location">Location</label>
                
                <Dropdown options={districts} onSelect={handleSelectLocation} className={styles.dropdown}>
                    {selectedLocation}
                </Dropdown>
                
                
                <button 
                type="submit" 
                className={styles.submitButton}
                >Sign Up</button>
                <p align='center'>Already have an account? <br></br> 
                    <a href='/login' className={styles.link}>Log In</a></p>
            </form>
            {showInvalidPopup && (
                <div className={styles.invalidPopup1}>
                    Another account for this email already exists
                </div>
            )}
            

        </div>
    );
}

