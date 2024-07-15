'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from '../login/login.module.css';
import Dropdown from './dropdown';



export default function signin() {

    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get('email');

    

    console.log('In signin email: ', email);

    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        location: '',
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
        console.log('selected :', value);
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



    return (
        <div className={styles.container2}>
            <form className={styles.loginForm2}>
                <h1>Sign Up</h1>

                <label className={styles.label} htmlFor="name">Full Name</label>
                <input 
                type="text" 
                placeholder="Enter your Full Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}   
                className={styles.inputField}></input>

                <label className={styles.label} htmlFor="username">Username</label>
                <input 
                type="text" 
                placeholder="Enter your Username"
                name="username"
                value={formData.username}
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
                type="password" 
                placeholder="Enter your password" 
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={styles.inputField}></input>

                <label className={styles.label} htmlFor="location">Location</label>
                <Dropdown options={districts} onSelect={handleSelectLocation} className={styles.dropdown}>
                    {selectedLocation}
                </Dropdown>
                
                <button 
                type="submit" 
                className={styles.submitButton}
                >Login</button>
                <p align='center'>Already have an account? <br></br> 
                    <a href='/login' className={styles.link}>Log In</a></p>
            </form>
            {showInvalidPopup && (
                <div className={styles.invalidPopup}>
                    Invalid username or password
                </div>
            )}
            

        </div>
    );
}

