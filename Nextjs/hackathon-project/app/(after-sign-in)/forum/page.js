'use client';

import React, { useEffect, useState } from 'react'
import SearchBar from '@/app/components/SearchBar'
import styles from './forum.module.css'
import Filter from '@/app/components/Filter'
import Cookies from 'js-cookie';
import Image from 'next/image';
import { getReactStatePost, getLikeNumberPost, getDislikeNumberPost, addReactPost, removeReactPost } from "@/app/functions";
import Dropdown from '@/app/(auth)/signin/dropdown';

const forum = () => {

    const [newQuestion, setNewQuestion] = useState('');

    const [liked, setLiked] = useState(false);

    const [disliked, setDisliked] = useState(false);

    const [ans, setAns] = useState('');

    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);

    const [showAnswers, setShowAnswers] = useState({});

    const [searchedText, setSearchedText] = useState('');

    const [reactions, setReactions] = useState({});

    const [isOn, setIsOn] = useState(false);

    const [selectedOption, setSelectedOption] = useState('latest');

    const [quesId, setQuesId] = useState(0);

    const [expand, setExpand] = useState(false);

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
                searchedText: searchedText,
                order: selectedOption,
                ownPosts: isOn,
                userid: userid
              }),
            });
            const data = await response.json();

            setQuestions(data.questions);

          } catch (error) {
            console.error("Error posting data:", error);
          }
    }

    useEffect(() => {
        fetchData();
    }, [newQuestion, searchedText, isOn, selectedOption]);


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
        // Convert the timestamp to a Date object
        const originalDate = new Date(timestamp);

        // Adjust for Bangladesh Time (UTC+6)
        const bangladeshOffset = 6 * 60; // 6 hours in minutes
        const localTime = new Date(originalDate.getTime() + bangladeshOffset * 60 * 1000);

        // Calculate the difference between now and the adjusted timestamp
        const now = new Date();
        const diff = Math.floor((now - localTime) / 1000); // difference in seconds

        
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

    const fetchAnswers = async(qid) => {
        try {
            const response = await fetch("/api", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                type: "getAnswers",
                qid: qid
              }),
            });

            const data = await response.json();

            console.log(data.answers);

            setAnswers(data.answers);

          } catch (error) {
            console.error("Error posting data:", error);
          }
    } 

    useEffect(() => {
        fetchAnswers(quesId);
    }, [quesId, expand]);

    const toggleView = async(qid) => {
    
        if(quesId === qid)
            setExpand(!expand);
        else 
            setExpand(true);
        setQuesId(qid);
        

        if(expand)
            await fetchAnswers(qid);

    };

    const submitAnswer = async(event) => {
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
                    qid: quesId,
                }),
            });

            const data = await response.json();

            if(data.success) {
                alert('Answer submitted successfully');
                setAns('');
                await fetchAnswers(quesId);
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
    };

    const handleLikeClick = async(aid) => {
        try {
            
            if(!reactions[aid].liked) {
                await removeReactPost(userid, aid, 'answer');
                await addReactPost(userid, aid, 'like', 'answer');
                setLiked(true);
                setDisliked(false);
            }   
            else {
                await removeReactPost(userid, aid, 'answer');
                setLiked(false);
            }
                
            const updatedData = await fetchReactions(aid);

            setReactions((prevData) => ({
                ...prevData,
                [aid]: updatedData,
            }));
        } catch (error) {
            console.error('Error handling like click:', error);
        }
    };

    const handleDislikeClick = async(aid) => {
        try {
            
            if(!reactions[aid].disliked) {
                await removeReactPost(userid, aid, 'answer');
                await addReactPost(userid, aid, 'dislike', 'answer');
                setLiked(false);
                setDisliked(true);
            }   
            else {
                await removeReactPost(userid, aid, 'answer');
                setDisliked(false);
            }
                
            const updatedData = await fetchReactions(aid);

            setReactions((prevData) => ({
                ...prevData,
                [aid]: updatedData,
            }));
        } catch (error) {
            console.error('Error handling dislike click:', error);
        }
    };


    const fetchReactions = async(aid) => {
        try {

            const likes = await getLikeNumberPost(aid, 'answer');
            const dislikes = await getDislikeNumberPost(aid, 'answer');
            const reacts = await getReactStatePost(userid, aid, 'answer');

            const [likeCount, dislikeCount, reactState] = await Promise.all([
                likes[0].count,
                dislikes[0].count,
                reacts[0].react,
            ]);


            return {
                likeCount, dislikeCount,
                liked: reactState === 'like',
                disliked: reactState === 'dislike',
            };

        } catch (error) {
            console.error('Error fetching reactions:', error);
            return {
                likeCount: 0,
                dislikeCount: 0,
                liked: false,
                disliked: false,
            };
        }
    }; 

    useEffect(() => {
        if(Array.isArray(answers)) {
            answers.forEach((answer) => {
                fetchReactions(answer.aid).then((reactionData) => {
                    setReactions((prevData) => ({
                        ...prevData,
                        [answer.aid]: reactionData,
                    }));
                });
            });
        }
    }, [answers]);

    

    const handleSelect = (option) => {
        setSelectedOption(option);
    };


    

    const toggleSwitch = () => {
        setIsOn(!isOn);
    };



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
                    
                    <div className="flex space-x-4 m-5 p-4 bg-green-400 rounded-md">
                        <button
                            className={`px-4 py-2 rounded-md focus:outline-none ${
                                selectedOption === 'latest' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
                            }`}
                            onClick={() => handleSelect('latest')}
                        >
                            Latest
                        </button>
                        <button
                            className={`px-4 py-2 rounded-md focus:outline-none ${
                                selectedOption === 'oldest' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
                            }`}
                            onClick={() => handleSelect('oldest')}
                        >
                            Oldest
                        </button>
                    </div>

                    <div className="flex items-center space-x-4 p-5 ml-8">
                        <div
                            onClick={toggleSwitch}
                            className={`w-10 h-6 flex items-center bg-blue-300 rounded-full p-1 cursor-pointer ${
                                isOn ? 'bg-blue-600' : ''
                            }`}
                        >
                            <div
                                className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
                                    isOn ? 'translate-x-4' : ''
                                }`}
                            ></div>
                        </div>
                        <span className="text-xl text-black font-bold tracking-tight">{isOn ? 'My Posts' : 'My Posts'}</span>
                    </div>

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
                        {questions && questions.map((question) => (
                            <div key={question.qid} className='p-6 mb-10 text-left border border-gray-300 rounded-lg bg-[#001f3f] hover:scale-105 transition-transform duration-200'>
                                <div className='flex flex-row items-center'> 
                                    <div className='rounded-full w-10 h-10 bg-cover bg-center m-1'
                                        style={{ backgroundImage: `url(${question.image})` }}
                                    ></div>
                                    <div>{question.name}</div>
                                </div>
                                
                                <div className='text-left border-b p-3 mr-40 bg-[#008080] rounded-xl shadow-lg shadow-teal-700/50 bg-gradient-to-br from-teal-500 to-teal-900'>
                                    <h4 className='text-red-500 font-bold'>Question:</h4>
                                    <h3 className='text-lg font-semibold'>{question.text}</h3>
                                    <p className='text-sm text-black text-right'>{timeAgo(question.time)}</p>
                                </div>

                                <button className='bg-yellow-500 rounded w-15 h-4 p-3 m-3 flex items-center hover:scale-110 transition-transform duration-300'
                                onClick={() => toggleView(question.qid)}>
                                    {(expand && quesId === question.qid) ? 'hide answers' : 'show answers'}
                                </button>

                                { (expand && quesId === question.qid) && (
                                    <div>
                                        <div className='ml-40 mt-12 text-right'>
                                            {Array.isArray(answers) && answers.length > 0 && answers.map((answer) => (
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
                            
                                                        <div className='flex flex-row justify-end text-right'> 
                                                            <button
                                                            className={`${reactions[answer.aid]?.liked ? "bg-blue-700" : "bg-blue-300"}
                                                                rounded w-12 h-4 p-3 m-3 flex flex-warp items-center justify-center hover:scale-110 transition-transform duration-300
                                                            `}
                                                            onClick={() => handleLikeClick(answer.aid)}
                                                            >
                                                                { reactions[answer.aid] && <h5 className='p-1'> {reactions[answer.aid].likeCount} </h5> }
                                                                <img src="/like.png" className="w-4 h-4" />
                                                            </button>

                                                            <button
                                                            className={`${reactions[answer.aid]?.disliked ? "bg-red-700" : "bg-red-300"}
                                                                rounded w-12 h-4 p-3 m-3 flex flex-warp items-center justify-center hover:scale-110 transition-transform duration-300
                                                            `}
                                                            onClick={() => handleDislikeClick(answer.aid)}
                                                            >
                                                                {reactions[answer.aid] && <h5 className='p-1'> {reactions[answer.aid].dislikeCount === undefined ? 0 : reactions[answer.aid].dislikeCount} </h5>}
                                                                <img src="/dislike.png" className="w-4 h-4" />
                                                            </button>

                                                            <p className='text-sm text-red-600 m-3'>{timeAgo(answer.time)}</p>
                                                        </div>
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