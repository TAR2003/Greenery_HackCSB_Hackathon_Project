'use client';

import React, { useEffect, useState } from 'react'
import SearchBar from '@/app/components/SearchBar'
import styles from './forum.module.css'
import Filter from '@/app/components/Filter'
import Cookies from 'js-cookie';
import Image from 'next/image';

const forum = () => {

    const [newQuestion, setNewQuestion] = useState('');

    const [ans, setAns] = useState('');

    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);

    const [showAnswers, setShowAnswers] = useState({});

    const [searchedText, setSearchedText] = useState('');

    const userid = Cookies.get("userid");

    const fetchData = async() => {
        try {
            const response = await fetch("/api", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                type: "getForumInfo",
                searchedText: searchedText
              }),
            });
            const data = await response.json();

            setQuestions(data.questions);
            setAnswers(data.answers);

          } catch (error) {
            console.error("Error posting data:", error);
          }
    }

    useEffect(() => {
        fetchData();
    }, [newQuestion, ans, searchedText]);


    const handleInputChange = (event) => {
        const {value} = event.target;
        setNewQuestion(value);
    };

    const updateAnswer = (event) => {
        const {value} = event.target;
        setAns(value);
    };

    const updateSearchText = (event) => {
        const {value} = event.target;
        setSearchedText(value);
    };

    function timeAgo(timestamp) {
        const now = new Date();
        const diff = Math.floor((now - new Date(timestamp)) / 1000); // difference in seconds
        
        const units = [
            { label: 'year', seconds: 31536000 }, // 60 * 60 * 24 * 365
            { label: 'month', seconds: 2592000 }, // 60 * 60 * 24 * 30
            { label: 'week', seconds: 604800 },   // 60 * 60 * 24 * 7
            { label: 'day', seconds: 86400 },     // 60 * 60 * 24
            { label: 'hour', seconds: 3600 },     // 60 * 60
            { label: 'minute', seconds: 60 },
            { label: 'second', seconds: 1 },
        ];
        
        for (let unit of units) {
            const interval = Math.floor(diff / unit.seconds);
            if (interval >= 1) {
            return `${interval} ${unit.label}${interval > 1 ? 's' : ''} ago`;
            }
        }
        
        return "just now"; // in case the difference is less than a second
    }

    const toggleView = (qid) => {
        setShowAnswers((prev) => ({
            ...prev,
            [qid]: !prev[qid]
        }));
    };

    const submitAnswer = async(question, event) => {
        try{
            const response = await fetch('/api',{
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'submitAnswer',
                    userid: userid,
                    answer: ans,
                    qid: question.qid,
                }),
            });

            const data = await response.json();

            if(data.success) {
                alert('Answer submitted successfully');
                setAns('');
            }

        }catch{

        }
    }

    const submitQuestion = async(event) => {
        event.preventDefault();
        try{
            const response = await fetch('/api',{
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'addQuestion',
                    userid: userid,
                    question: newQuestion
                }),
            });

            const data = await response.json();

            if(data.success) {
                alert('Question submitted successfully');
                setNewQuestion('');
            }

        }catch{

        }
    };

    const handleSearch = async(event) => {
        alert('Search completed successfully')
    }

    return (
        <div>
            <div className='py-10 px-10 mx-auto text-center flex items-center max-w-5xl'>
                <h1 className='px-20 text-green-300 text-5xl font-bold tracking-tight'>
                    FORUM
                </h1>
                <input className='rounded-lg w-full h-10 px-4 text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                 type='text'
                 placeholder='Search for a question'
                 value={searchedText}
                 onChange={updateSearchText}
                >
                </input>
                <button className='bg-blue-500 rounded w-20 h-9 py-4 px-2 mx-3 my-3 flex items-center justify-center hover:scale-110 transition-transform duration-300'
                 onClick={handleSearch}
                 >
                Search
                </button>
            </div>
            <hr className={styles.horizontalLine} />

            <div className='flex flex-row'>
                <div className={styles.sidebar}>
                    <Filter />
                </div>

                <div className="w-px bg-gray-300 mx-4"></div>

                <div className='flex flex-col flex-1 mx-8'>
                    <div className='h-70 flex flex-col items-center'>
                        <h1 className='py-4 font-bold text-2xl text-blue-300'>
                            Ask a new question
                        </h1>
                        <textarea
                        type='text'
                        placeholder='Type your question here'
                        className={styles.inputField}
                        value={newQuestion}
                        onChange={handleInputChange}
                        rows="6"
                        >
                        </textarea>

                        <button className='bg-blue-500 rounded w-20 h-7 py-4 px-5 mx-4 my-4 flex items-center hover:scale-110 transition-transform duration-300'
                            onClick={submitQuestion}
                        >
                            Post
                        </button>

                    </div>

                    <hr className={styles.horizontalLine} />

                    <div className='container mx-auto p-4'>
                        {questions.map((question) => (
                            <div key={question.qid} className='p-6 mb-10 text-left border border-gray-300 rounded-lg bg-[#001f3f] hover:scale-105 transition-transform duration-200'>
                                <div className='flex flex-row items-center'> 
                                    <div className='rounded-full w-10 h-10 bg-cover bg-center m-1'
                                        style={{ backgroundImage: `url(${question.image})` }}
                                    ></div>
                                    <div>{question.name}</div>
                                </div>
                                
                                <div className='text-left border-b p-3 mr-40 bg-[#008080] rounded-xl'>
                                    <h4 className='text-red-500 font-bold'>Question:</h4>
                                    <h3 className='text-lg font-semibold'>{question.text}</h3>
                                    <p className='text-sm text-black text-right'>{timeAgo(question.time)}</p>
                                </div>

                                <button className='bg-yellow-500 rounded w-15 h-4 p-3 m-3 flex items-center hover:scale-110 transition-transform duration-300'
                                onClick={() => toggleView(question.qid)}>
                                    {showAnswers[question.qid] ? 'hide answers' : 'show answers'}
                                </button>

                                {showAnswers[question.qid] && (
                                    <div>
                                        <div className='ml-40 mt-12 text-right'>
                                            {answers
                                            .filter((answer) => answer.question_id === question.qid)
                                            .map((answer) => (
                                                <div>
                                                    <div className='flex flex-row items-center justify-end'> 
                                                        <div>{answer.name}</div>
                                                        <div className='rounded-full w-10 h-10 bg-cover bg-center m-1'
                                                            style={{ backgroundImage: `url(${answer.image})` }}
                                                        ></div>
                                                    </div>
                                                    <div key={answer.aid} className='text-left mb-5 p-3 bg-[#ffe4e1] rounded-xl w-auto inline-block ml-auto'>
                                                        <h4 className='text-green-500 font-bold'>Answer:</h4>
                                                        <p className='text-base text-black'>{answer.text}</p>
                                                        <p className='text-sm text-red-600 text-right'>{timeAgo(answer.time)}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className='flex flex-col items-center justify-end mt-8'>
                                            <textarea
                                            type='text'
                                            placeholder='Submit your answer'
                                            className={styles.inputField}
                                            value={ans}
                                            onChange={updateAnswer}
                                            rows="2"
                                            >
                                            </textarea>
                                            <button className='bg-green-500 rounded w-15 h-4 p-3 m-3 flex items-center hover:scale-110 transition-transform duration-300'
                                            onClick={() => submitAnswer(question)}
                                            >submit</button>
                                        </div>

                                    </div>
                                )}
                                

                            </div>
                        ))}
                        
                    </div>

                    
                </div>
            </div>


        </div>
    )
}

export default forum