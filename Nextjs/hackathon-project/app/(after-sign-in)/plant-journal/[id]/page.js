"use client";
import {
  addJournalMessage,
  addReminder,
  getJournalMessages,
  getUserJournals,
  addUserJournal,
  timeAgo,
} from "@/app/functions";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

const JournalList = ({ params }) => {
  const [selectedJournal, setSelectedJournal] = useState(null);
  const [sampleJournals, setSampleJournals] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [reminderDate, setReminderDate] = useState("");
  const [reminderText, setReminderText] = useState("");
  const [newJournalName, setNewJournalName] = useState("");
  const [uid, setUid] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Ensure this runs only on the client
    setIsClient(true);
    const fetchData = async () => {
      if (params.id) {
        const userId = parseInt(params.id);
        setUid(userId);
        let journals = await getUserJournals(userId);
        setSampleJournals(journals);
      }
    };
    fetchData();
  }, [params.id]);

  useEffect(() => {
    if (selectedJournal) {
      const fetchMessages = async () => {
        let fetchedMessages = await getJournalMessages(selectedJournal);
        setMessages(fetchedMessages);
      };
      fetchMessages();
    }
  }, [selectedJournal]);

  const handleJournalClick = (journalId) => {
    setSelectedJournal(journalId);
  };

  const handleAddMessage = async () => {
    if (selectedJournal) {
      await addJournalMessage(selectedJournal, newMessage);
      setNewMessage("");
      const fetchedMessages = await getJournalMessages(selectedJournal);
      setMessages(fetchedMessages);
    }
  };

  const handleSetReminder = async () => {
    if (reminderDate && reminderText) {
      await addReminder(selectedJournal, reminderText, reminderDate);
      await addJournalMessage(
        selectedJournal,
        "A new Reminder added for the date " + reminderDate
      );
      const fetchedMessages = await getJournalMessages(selectedJournal);
      setMessages(fetchedMessages);
      setReminderDate("");
      setReminderText("");
    }
  };

  const handleAddJournal = async () => {
    if (newJournalName.trim() !== "" && uid !== null) {
      await addUserJournal(uid, newJournalName);
      setNewJournalName("");
      const updatedJournals = await getUserJournals(uid);
      setSampleJournals(updatedJournals);
    }
  };

  if (!isClient) {
    // Return a placeholder or nothing while client-side JavaScript is loading
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 text-black p-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        Plant Journal Manager {uid}
      </h1>
      <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="lg:w-1/3 p-4 border-b lg:border-b-0 lg:border-r bg-gray-50">
          <h2 className="text-xl font-semibold mb-4">Journals</h2>
          <ul className="space-y-2">
            {Array.isArray(sampleJournals) &&
              sampleJournals.map((journal) => (
                <li
                  key={journal.id}
                  onClick={() => handleJournalClick(journal.id)}
                  className={`relative cursor-pointer p-2 rounded-lg hover:bg-gray-200 transition-colors ${
                    selectedJournal === journal.id
                      ? "bg-gray-300 font-semibold"
                      : ""
                  }`}
                >
                  {journal.journalname}
                  <span className="absolute bottom-2 right-2 text-sm text-gray-500">
                    {timeAgo(journal.time)}
                  </span>
                </li>
              ))}
          </ul>
          {parseInt(Cookies.get("userid")) === parseInt(params.id) && (
            <div className="mt-4">
              <input
                type="text"
                value={newJournalName}
                onChange={(e) => setNewJournalName(e.target.value)}
                placeholder="Add a new journal"
                className="w-full border p-2 rounded-lg"
              />
              <button
                onClick={handleAddJournal}
                className="mt-2 w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                Add Journal
              </button>
            </div>
          )}
        </div>

        <div className="lg:w-2/3 p-4 flex flex-col">
          {selectedJournal ? (
            <>
              <h2 className="text-xl font-semibold mb-4">Messages</h2>
              <div className="flex-1 bg-gray-50 p-4 rounded-lg overflow-y-auto mb-4">
                {messages.length ? (
                  messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`p-4 mb-4 rounded-lg shadow-sm relative ${
                        msg.message.startsWith("Reminder:-")
                          ? "border border-red-500 bg-red-200"
                          : "border border-gray-300 bg-white"
                      }`}
                    >
                      <div className="mb-2 text-sm text-gray-600">
                        Date: {new Date(msg.time).toLocaleDateString()}
                      </div>
                      <p className="text-gray-800">{msg.message}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No messages yet.</p>
                )}
              </div>
              {parseInt(Cookies.get("userid")) === parseInt(params.id) && (
                <>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Add a new message"
                      className="flex-1 border p-2 rounded-lg"
                    />
                    <button
                      onClick={handleAddMessage}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">
                      Set a Reminder
                    </h3>
                    <div className="flex gap-2 items-center mb-2">
                      <input
                        type="date"
                        value={reminderDate}
                        onChange={(e) => setReminderDate(e.target.value)}
                        className="border p-2 rounded-lg flex-1"
                      />
                    </div>
                    <div className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={reminderText}
                        onChange={(e) => setReminderText(e.target.value)}
                        placeholder="Reminder text"
                        className="border p-2 rounded-lg flex-1"
                      />
                      <button
                        onClick={handleSetReminder}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                      >
                        Set Reminder
                      </button>
                    </div>
                  </div>
                </>
              )}
            </>
          ) : (
            <p className="text-gray-600">Select a journal to view messages.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default JournalList;
