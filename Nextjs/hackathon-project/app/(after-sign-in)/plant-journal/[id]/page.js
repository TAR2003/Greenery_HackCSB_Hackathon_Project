"use client";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

const JournalList = ({ params }) => {
  // Sample data
  // const sampleJournals = [
  //   { id: 1, journalname: "Spring Planting" },
  //   { id: 2, journalname: "Summer Growth" },
  //   { id: 3, journalname: "Autumn Harvest" },
  // ];

  // const sampleMessages = {
  //   1: [
  //     { message: "Started planting tomatoes." },
  //     { message: "Added fertilizer to the soil." },
  //   ],
  //   2: [
  //     { message: "Tomatoes are growing well." },
  //     { message: "Need to water daily." },
  //   ],
  //   3: [
  //     { message: "Harvested the first batch." },
  //     { message: "Prepared for winter planting." },
  //   ],
  // };

  const [selectedJournal, setSelectedJournal] = useState(null);
  const [sampleJournals, setsampleJournals] = useState([]);
  const [journals, setjournals] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [reminderDate, setReminderDate] = useState("");
  const [uid, setuid] = useState(0);

  const fetchData = async () => {
    setuid(parseInt(Cookies.get("userid")));
    //setMessages(messages)
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleJournalClick = (journalId) => {
    setSelectedJournal(journalId);
  };

  const handleAddMessage = () => {
    if (selectedJournal) {
      setMessages([...messages, { message: newMessage }]);
      setNewMessage("");
    }
  };

  const handleSetReminder = () => {
    console.log(
      `Reminder set for journal ${selectedJournal} on ${reminderDate}`
    );
    // Here you would make an API call to set the reminder
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black p-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        Plant Journal Manager {parseInt(params.id)}
      </h1>
      <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="lg:w-1/3 p-4 border-b lg:border-b-0 lg:border-r bg-gray-50">
          <h2 className="text-xl font-semibold mb-4">Journals</h2>
          <ul className="space-y-2">
            {sampleJournals.map((journal) => (
              <li
                key={journal.id}
                onClick={() => handleJournalClick(journal.id)}
                className={`cursor-pointer p-2 rounded-lg hover:bg-gray-200 transition-colors ${
                  selectedJournal === journal.id
                    ? "bg-gray-300 font-semibold"
                    : ""
                }`}
              >
                {journal.journalname}
              </li>
            ))}
          </ul>
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
                      className="p-2 mb-2 bg-white border rounded-lg shadow-sm"
                    >
                      {msg.message}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No messages yet.</p>
                )}
              </div>
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
              <div className="mt-4 flex gap-2 items-center">
                <input
                  type="date"
                  value={reminderDate}
                  onChange={(e) => setReminderDate(e.target.value)}
                  className="border p-2 rounded-lg flex-1"
                />
                <button
                  onClick={handleSetReminder}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                  Set Reminder
                </button>
              </div>
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
