'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../login/login.module.css';
import Dropdown from './dropdown';



export default function signin() {


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
        "Barguna", "Barishal", "Bhola", "Jhalokathi", "Patuakhali", "Pirojpur",
        "Bandarban", "Brahmanbaria", "Chandpur", "Chattogram", "Cumilla", "Cox's Bazar",
        "Feni", "Khagrachhari", "Lakshmipur", "Noakhali", "Rangamati",
        "Dhaka", "Faridpur", "Gazipur", "Gopalganj", "Kishoreganj", "Madaripur",
        "Manikganj", "Munshiganj", "Narayanganj", "Narsingdi", "Rajbari", "Shariatpur",
        "Tangail",
        "Bagerhat", "Chuadanga", "Jashore", "Jhenaidah", "Khulna", "Kushtia",
        "Magura", "Meherpur", "Narail", "Satkhira",
        "Jamalpur", "Mymensingh", "Netrokona", "Sherpur",
        "Bogra", "Joypurhat", "Naogaon", "Natore", "Chapai Nawabganj", "Pabna",
        "Rajshahi", "Sirajganj",
        "Dinajpur", "Gaibandha", "Kurigram", "Lalmonirhat", "Nilphamari", "Panchagarh",
        "Rangpur", "Thakurgaon",
        "Habiganj", "Maulvibazar", "Sunamganj", "Sylhet",
        "Bagerhat", "Chuadanga", "Jashore", "Jhenaidah", "Khulna", "Kushtia",
        "Magura", "Meherpur", "Narail", "Satkhira"
    ];



    return (
        <div className={styles.container2}>
            <form className={styles.loginForm2}>
                <h1>Sign Up</h1>

                <label className={styles.label} htmlfor="name">Full Name</label>
                <input 
                type="text" 
                placeholder="Enter your Full Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}   
                className={styles.inputField}></input>

                <label className={styles.label} htmlfor="username">Username</label>
                <input 
                type="text" 
                placeholder="Enter your Username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}   
                className={styles.inputField}></input>

                <label className={styles.label} htmlfor="email">Email</label>
                <input 
                type="email" 
                placeholder="Enter your Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}   
                className={styles.inputField}></input>

                <label className={styles.label} htmlfor="password">Password</label>
                <input 
                type="password" 
                placeholder="Enter your password" 
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={styles.inputField}></input>

                <label className={styles.label} htmlfor="location">Location</label>
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

