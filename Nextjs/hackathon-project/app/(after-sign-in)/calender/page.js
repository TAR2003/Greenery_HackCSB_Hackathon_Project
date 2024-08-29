'use client';

import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { getDay } from 'date-fns';
import { func } from 'joi';

const districts = [
    { name: 'Bagerhat', lat: 22.6654, lon: 89.7678 },
    { name: 'Bandarban', lat: 22.1958, lon: 92.1774 },
    { name: 'Barguna', lat: 22.3331, lon: 90.2254 },
    { name: 'Barishal', lat: 22.7010, lon: 90.3535 },
    { name: 'Bhola', lat: 22.6843, lon: 90.3730 },
    { name: 'Bogura', lat: 24.8470, lon: 89.3670 },
    { name: 'Brahmanbaria', lat: 23.9554, lon: 91.0977 },
    { name: 'Chandpur', lat: 23.2335, lon: 90.1608 },
    { name: 'Chattogram', lat: 22.3384, lon: 91.8310 },
    { name: 'Chuadanga', lat: 23.4632, lon: 88.8173 },
    { name: 'Cox\'s Bazar', lat: 21.4272, lon: 92.0058 },
    { name: 'Cumilla', lat: 23.4644, lon: 91.1837 },
    { name: 'Dhaka', lat: 23.8103, lon: 90.4125 },
    { name: 'Dinajpur', lat: 25.6336, lon: 88.3404 },
    { name: 'Faridpur', lat: 23.6064, lon: 89.1535 },
    { name: 'Feni', lat: 23.0261, lon: 91.3977 },
    { name: 'Gaibandha', lat: 24.8592, lon: 89.5663 },
    { name: 'Gazipur', lat: 24.0000, lon: 90.4167 },
    { name: 'Gopalganj', lat: 23.2335, lon: 89.9886 },
    { name: 'Habiganj', lat: 24.3656, lon: 91.4081 },
    { name: 'Jamalpur', lat: 24.9276, lon: 89.9310 },
    { name: 'Jashore', lat: 23.1655, lon: 89.2074 },
    { name: 'Jhalokathi', lat: 22.6540, lon: 90.1882 },
    { name: 'Jhenaidah', lat: 23.5347, lon: 88.9957 },
    { name: 'Joypurhat', lat: 24.8291, lon: 89.3041 },
    { name: 'Khagrachari', lat: 23.1552, lon: 92.1904 },
    { name: 'Khulna', lat: 22.8456, lon: 89.5403 },
    { name: 'Kishoreganj', lat: 24.3710, lon: 90.7080 },
    { name: 'Kurigram', lat: 25.7260, lon: 89.1420 },
    { name: 'Kushtia', lat: 23.9121, lon: 89.1134 },
    { name: 'Lakshmipur', lat: 22.9513, lon: 90.7686 },
    { name: 'Lalmonirhat', lat: 25.2877, lon: 89.2068 },
    { name: 'Madaripur', lat: 23.2030, lon: 90.3150 },
    { name: 'Magura', lat: 23.4858, lon: 89.3710 },
    { name: 'Manikganj', lat: 23.8477, lon: 90.0305 },
    { name: 'Meherpur', lat: 23.7593, lon: 88.6061 },
    { name: 'Moulvibazar', lat: 24.3455, lon: 91.1761 },
    { name: 'Munshiganj', lat: 23.5456, lon: 90.4943 },
    { name: 'Mymensingh', lat: 24.7470, lon: 90.4166 },
    { name: 'Naogaon', lat: 24.8464, lon: 88.7320 },
    { name: 'Narail', lat: 22.8207, lon: 89.5506 },
    { name: 'Narayanganj', lat: 23.6147, lon: 90.5029 },
    { name: 'Narsingdi', lat: 23.9163, lon: 90.7103 },
    { name: 'Natore', lat: 24.4227, lon: 89.0070 },
    { name: 'Netrokona', lat: 24.8708, lon: 90.7230 },
    { name: 'Nilphamari', lat: 25.9186, lon: 88.8594 },
    { name: 'Noakhali', lat: 22.8538, lon: 91.1830 },
    { name: 'Pabna', lat: 24.0058, lon: 89.2364 },
    { name: 'Panchagarh', lat: 26.0085, lon: 88.5497 },
    { name: 'Patuakhali', lat: 22.3552, lon: 90.1811 },
    { name: 'Pirojpur', lat: 22.5734, lon: 90.1200 },
    { name: 'Rajbari', lat: 23.6305, lon: 89.1520 },
    { name: 'Rajshahi', lat: 24.3636, lon: 88.6200 },
    { name: 'Rangamati', lat: 23.1356, lon: 92.1692 },
    { name: 'Rangpur', lat: 25.7570, lon: 89.2750 },
    { name: 'Satkhira', lat: 22.7162, lon: 89.0834 },
    { name: 'Shariatpur', lat: 23.2167, lon: 89.0167 },
    { name: 'Sherpur', lat: 24.7660, lon: 90.3541 },
    { name: 'Sirajganj', lat: 24.4624, lon: 89.7063 },
    { name: 'Sunamganj', lat: 24.5535, lon: 91.3857 },
    { name: 'Sylhet', lat: 24.8949, lon: 91.8687 },
    { name: 'Tangail', lat: 24.2500, lon: 89.9500 },
    { name: 'Thakurgaon', lat: 25.7265, lon: 88.4838 },
  ];

const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
];

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function calender() {

    const [weatherData, setWeatherData] = useState([]);

    const [district, setDistrict] = useState('');

    const userid = Cookies.get("userid");

    const date = new Date();

    const fetchDistrict = async() => {
        try {
            const response = await fetch("/api", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    type: "getDistrict",
                    userid: userid,
                })
            });

            const data = await response.json();

            const userDistrict = data[0]?.location;

            if(userDistrict) {
                setDistrict(userDistrict);
                const districtData = districts.find(item => item.name === userDistrict);

                if(districtData) {    
                    fetchWeatherData(districtData.lat, districtData.lon);
                }
            }

            
            

        } catch(error) {
            console.log('Error while fetching!!');
        }
    }


    const fetchWeatherData = async(lat, lon) => {
        try {
            const response = await fetch("/api/weatherAPI", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    lat: lat,
                    lon: lon,
                })
            });

            const data = await response.json();

            console.log(data.days);

            setWeatherData(data.days);

        } catch(error) {
            console.log('Error while fetching!!');
        }
    }


    useEffect(() => {
        fetchDistrict();
    }, []);


    function suggestGardeningTasks(temperature, humidity, windSpeed, pop) {
        let watering, harvest, prune, planting, fertilizer, pestControl;
    
        // Watering levels
        if (temperature > 36 && humidity < 40 && windSpeed > 15) {
            watering = 'heavy watering';
        } else if (temperature > 33 && humidity < 60 && windSpeed > 12) {
            watering = 'medium watering';
        } else if (temperature > 30 && humidity < 80 && windSpeed > 8) {
            watering = 'light watering';
        } else {
            watering = 'no watering';
        }
    
        // Harvest
        harvest = 
            (temperature >= 20 && temperature <= 30 && humidity >= 60 && humidity <= 85 && pop < 30 && windSpeed < 10) ||
            (temperature >= 18 && temperature <= 32 && humidity >= 50 && humidity <= 90 && pop < 40 && windSpeed < 12) ||
            (temperature >= 22 && temperature <= 28 && humidity >= 55 && humidity <= 85 && pop < 35 && windSpeed < 8) ? true : false;
    
        // Pruning
        prune = 
            (temperature >= 15 && temperature <= 25 && humidity > 70 && pop < 20 && windSpeed < 8) ||
            (temperature >= 18 && temperature <= 28 && humidity > 65 && pop < 25 && windSpeed < 10) ||
            (temperature >= 20 && temperature <= 30 && humidity > 60 && pop < 30 && windSpeed < 12) ||
            (temperature >= 22 && temperature <= 32 && humidity > 55 && pop < 35 && windSpeed < 6) ? true : false;
    
        // Planting
        planting = 
            (temperature >= 22 && temperature <= 30 && humidity >= 60 && humidity <= 85 && pop >= 35 && pop <= 70) ||
            (temperature >= 20 && temperature <= 32 && humidity >= 55 && humidity <= 90 && pop >= 30 && pop <= 75) ||
            (temperature >= 25 && temperature <= 35 && humidity >= 50 && humidity <= 80 && pop >= 25 && pop <= 70) ||
            (temperature >= 18 && temperature <= 28 && humidity >= 65 && humidity <= 90 && pop >= 20 && pop <= 80) ? true : false;
    
        // Fertilizer
        fertilizer = 
            (temperature >= 20 && temperature <= 30 && humidity >= 60 && humidity <= 80 && pop < 40 && windSpeed < 10) ||
            (temperature >= 22 && temperature <= 35 && humidity >= 55 && humidity <= 75 && pop < 45 && windSpeed < 12) ||
            (temperature >= 25 && temperature <= 32 && humidity >= 50 && humidity <= 70 && pop < 50 && windSpeed < 8) ||
            (temperature >= 18 && temperature <= 28 && humidity >= 65 && humidity <= 85 && pop < 35 && windSpeed < 6) ? true : false;
    
        // Pest Control
        pestControl = 
            (temperature > 28 && humidity > 75 && windSpeed < 5) ||
            (temperature > 25 && humidity > 70 && windSpeed < 6) ||
            (temperature > 30 && humidity > 80 && windSpeed < 7) ||
            (temperature > 22 && humidity > 85 && windSpeed < 8) ? true : false;
    
        return {
            watering, harvest, prune, planting, fertilizer, pestControl
        };
    }

    function getRestDays() {
        const days = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        const ans = days - date.getDate() + 1;
        return ans > 16 ? 16 : ans;
    }

    function getDaysOfMonth(orderOfMonth) {
        return new Date(date.getFullYear(), date.getMonth() + 1 + orderOfMonth, 0).getDate();
    }

    function getStartOfMonth(orderOfMonth) {
        const mon = date.getMonth() + orderOfMonth + 1;
        const year = date.getFullYear();
        const dateString = year + "-" + mon + "-01";
        const newDate = new Date(dateString);
        return newDate.getDay();
    }

    function getEndOfMonth(orderOfMonth) {
        const day = new Date(date.getFullYear(), date.getMonth() + 1 + orderOfMonth, 0).getDay();
        return 6 - day;
    }


    function renderWateringLevel(watering) {
        let bgColor, text;
    
        switch (watering) {
            case 'heavy watering':
                bgColor = 'bg-blue-900';
                text = 'Heavy';
                break;
            case 'medium watering':
                bgColor = 'bg-blue-700';
                text = 'Medium';
                break;
            case 'light watering':
                bgColor = 'bg-blue-400';
                text = 'Light';
                break;
            case 'no watering':
            default:
                bgColor = 'bg-gray-300';
                text = 'None';
                break;
        }
    
        return (
            <div className={`flex w-14 h-4 text-center items-center justify-center text-white p-4 rounded-lg shadow-lg ${bgColor}`}>
                {text}
            </div>
        );
    }



    return (
        <div className='relative' style={{
            background: "linear-gradient(135deg, #6A0DAD, #BA55D3)", // Royal Purple to Medium Orchid
          }}>
            <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                    Maintain Your <span className="text-blue-400">Planting Planner</span>!
                </h1>
                <p className="mt-6 text-lg max-w-prose text-white text-muted-foreground">
                    Plan, Plant, Prosper. Your daily companion for growing success.
                    Follow daily tips and cultivate a garden that thrives with the seasons.
                </p>
                <br></br>
            </div>

            <div className='flex flex-col bg-gradient-to-r from-indigo-800 via-blue-700 to-green-400 rounded-lg shadow-lg w-60 p-4 ml-auto mr-20'>
                <div className='flex flex-row'>
                    <img src="/temperature.png" className="w-8 h-8 mr-4 mb-2" />
                    <p>Temperature</p>
                </div>
                <div className='flex flex-row'>
                    <img src="/watering.png" className="w-8 h-8 mr-4 mb-2" />
                    <p>Watering</p>
                </div>
                <div className='flex flex-row'>
                    <img src="/harvesting.png" className="w-8 h-8 mr-4 mb-2" />
                    <p>Harvesting</p>
                </div>
                <div className='flex flex-row'>
                    <img src="/pruning.png" className="w-8 h-8 mr-4 mb-2" />
                    <p>Pruning</p>
                </div>
                <div className='flex flex-row'>
                    <img src="/planting.png" className="w-8 h-8 mr-4 mb-2" />
                    <p>Planting seeds</p>
                </div>
                <div className='flex flex-row'>
                    <img src="/fertilizer.png" className="w-8 h-8 mr-4 mb-2" />
                    <p>Fertilizer</p>
                </div>
                <div className='flex flex-row'>
                    <img src="/pest-control.png" className="w-8 h-8 mr-4 mb-2" />
                    <p>Pest control</p>
                </div>
                <div className='flex flex-row'>
                    <img src="/minus.png" className="w-8 h-8 mr-4 mb-2" />
                    <p>Not needed</p>
                </div>
                <div className='flex flex-row'>
                    <img src="/shield.png" className="w-8 h-8 mr-4 mb-2" />
                    <p>Recommended</p>
                </div>

            </div>

            <div className='text-center font-bold text-3xl text-black mb-10 underline'> {months[date.getMonth()]} , {date.getFullYear()} </div>
            <div className='px-10 mr-10'>
                <div class="grid grid-cols-7 gap-6 p-6 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 rounded-xl">
                    {daysOfWeek.map((day) => (
                        <div className='underline text-center text-white font-2xl m-3 font-bold'>
                            {day}
                        </div>
                    ))}

                    {[...Array(getStartOfMonth(0))].map((_, index) => (
                        <div> </div>
                    ))}

                    {[...Array(date.getDate()-1)].map((_, index) => (
                        <div className="date-box bg-gradient-to-r from-blue-500 via-blue-700 to-blue-900 hover:bg-[#E6EE9C] hover:scale-105 shadow-lg p-4 rounded-lg transition-transform duration-300
                        hover:translate-y-1 hover:-rotate-x-3d hover:-rotate-y-3d">
                            <div className="date-number text-xl font-bold text-white">{index + 1}</div>
                        </div>
                    ))}

                    {weatherData && weatherData.slice(0,getRestDays()).map((dailyData, index) => (
                        <div
                            key={index}
                            className="date-box bg-gradient-to-r from-yellow-200 to-yellow-500 hover:bg-[#E6EE9C] hover:scale-110 shadow-lg p-4 rounded-lg transition-transform duration-300
                            hover:translate-y-1 hover:-rotate-x-3d hover:-rotate-y-3d"
                        >
                            <div className="date-number text-xl font-bold text-gray-800">{index + date.getDate()}</div>
                            <div className="task-info mt-2 text-sm text-gray-700">
                                { (() => {
                                    const tasks = suggestGardeningTasks(dailyData.temp, dailyData.humidity, dailyData.windspeed, dailyData.precipprob);
                                    return (
                                        <div>
                                            <div className='flex flex-row'>
                                                <img src="/temperature.png" className="w-8 h-8 mr-4 mb-2" />
                                                <p>{dailyData.temp}<sup>o</sup>C</p>
                                            </div>
                                            <div className='flex flex-row'>
                                                <img src="/watering.png" className="w-8 h-8 mr-4 mb-2" />
                                                <p>{renderWateringLevel(tasks.watering)}</p>
                                            </div>
                                            <div className='flex flex-row'>
                                                <img src="/harvesting.png" className="w-8 h-8 mr-4 mb-2" />
                                                <img src={tasks.harvest ? "/shield.png" : "/minus.png"} className="w-6 h-6"/>
                                            </div>
                                            <div className='flex flex-row'>
                                                <img src="/pruning.png" className="w-8 h-8 mr-4 mb-2" />
                                                <img src={tasks.prune ? "/shield.png" : "/minus.png"} className="w-6 h-6"/>
                                            </div>
                                            <div className='flex flex-row'>
                                                <img src="/planting.png" className="w-8 h-8 mr-4 mb-2" />
                                                <img src={tasks.planting ? "/shield.png" : "/minus.png"} className="w-6 h-6"/>
                                            </div>
                                            <div className='flex flex-row'>
                                                <img src="/fertilizer.png" className="w-8 h-8 mr-4 mb-2" />
                                                <img src={tasks.fertilizer ? "/shield.png" : "/minus.png"} className="w-6 h-6"/>
                                            </div>
                                            <div className='flex flex-row'>
                                                <img src="/pest-control.png" className="w-8 h-8 mr-4 mb-2" />
                                                <img src={tasks.pestControl ? "/shield.png" : "/minus.png"} className="w-6 h-6"/>
                                            </div>
                                            
                                        </div>
                                    );
                                })()}
                                
                            </div>
                        </div>
                    ))}

                    {((getDaysOfMonth(0)-date.getDate()) > 15) && [...Array(getDaysOfMonth(0)-15-date.getDate())].map((_, index) => (
                            <div className="date-box bg-gradient-to-r from-blue-500 via-blue-700 to-blue-900 hover:bg-[#E6EE9C] hover:scale-105 shadow-lg p-4 rounded-lg transition-transform duration-300
                            hover:translate-y-1 hover:-rotate-x-3d hover:-rotate-y-3d">
                                <div className="date-number text-xl font-bold text-gray-800">{index + 16 + date.getDate()}</div>
                            </div>
                        ))}
                        
                    

                    {[...Array(getEndOfMonth(0))].map((_, index) => (
                        <div> </div>
                    ))}
                    
                </div>
            </div>
            <hr className='m-8'></hr>

            {(getRestDays() < 16) && <div className='px-10 mr-10'>
                <div className='text-center font-bold text-3xl text-black mt-10 mb-10 underline'> {months[date.getMonth()+1]} , {date.getFullYear()} </div>
                <div class="grid grid-cols-7 gap-6 p-6 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 rounded-xl">
                    {daysOfWeek.map((day) => (
                        <div className='underline text-center text-white font-2xl m-3 font-bold'>
                            {day}
                        </div>
                    ))}

                    {[...Array(getStartOfMonth(1))].map((_, index) => (
                        <div> </div>
                    ))}

                    {weatherData && weatherData.slice(getRestDays()-16).map((dailyData, index) => (
                        <div
                            key={index}
                            className="date-box bg-gradient-to-r from-yellow-200 to-yellow-500 hover:bg-[#E6EE9C] hover:scale-110 shadow-lg p-4 rounded-lg transition-transform duration-300
                            hover:translate-y-1 hover:-rotate-x-3d hover:-rotate-y-3d"
                        >
                            <div className="date-number text-xl font-bold text-gray-800">{index + 1}</div>
                            <div className="task-info mt-2 text-sm text-gray-700">
                                { (() => {
                                    const tasks = suggestGardeningTasks(dailyData.temp, dailyData.humidity, dailyData.windspeed, dailyData.precipprob);
                                    return (
                                        <div>
                                            <div className='flex flex-row'>
                                                <img src="/temperature.png" className="w-8 h-8 mr-4 mb-2" />
                                                <p>{dailyData.temp}<sup>o</sup>C</p>
                                            </div>
                                            <div className='flex flex-row'>
                                                <img src="/watering.png" className="w-8 h-8 mr-4 mb-2" />
                                                <p>{renderWateringLevel(tasks.watering)}</p>
                                            </div>
                                            <div className='flex flex-row'>
                                                <img src="/harvesting.png" className="w-8 h-8 mr-4 mb-2" />
                                                <img src={tasks.harvest ? "/shield.png" : "/minus.png"} className="w-6 h-6"/>
                                            </div>
                                            <div className='flex flex-row'>
                                                <img src="/pruning.png" className="w-8 h-8 mr-4 mb-2" />
                                                <img src={tasks.prune ? "/shield.png" : "/minus.png"} className="w-6 h-6"/>
                                            </div>
                                            <div className='flex flex-row'>
                                                <img src="/planting.png" className="w-8 h-8 mr-4 mb-2" />
                                                <img src={tasks.planting ? "/shield.png" : "/minus.png"} className="w-6 h-6"/>
                                            </div>
                                            <div className='flex flex-row'>
                                                <img src="/fertilizer.png" className="w-8 h-8 mr-4 mb-2" />
                                                <img src={tasks.fertilizer ? "/shield.png" : "/minus.png"} className="w-6 h-6"/>
                                            </div>
                                            <div className='flex flex-row'>
                                                <img src="/pest-control.png" className="w-8 h-8 mr-4 mb-2" />
                                                <img src={tasks.pestControl ? "/shield.png" : "/minus.png"} className="w-6 h-6"/>
                                            </div>
                                            
                                        </div>
                                    );
                                })()}
                                
                            </div>
                        </div>
                    ))}


                    {[...Array(getDaysOfMonth(1)-16+getRestDays())].map((_, index) => (
                        <div className="date-box bg-gradient-to-r from-blue-500 via-blue-700 to-blue-900 hover:bg-[#E6EE9C] hover:scale-105 shadow-lg p-4 rounded-lg transition-transform duration-300
                        hover:translate-y-1 hover:-rotate-x-3d hover:-rotate-y-3d">
                            <div className="date-number text-xl font-bold text-gray-800">{index + 17 - getRestDays()}</div>
                        </div>
                    ))}

                    {[...Array(getEndOfMonth(0))].map((_, index) => (
                        <div> </div>
                    ))}

                </div>
            </div>}
            

            
            

        </div>
    );
}

