import React, { useState } from "react";
import axios from "axios";


const MessageGenerator: React.FC = () => {
  const [linkedinProfile, setLinkedinProfile] = useState({
    name: "",
    job_title: "",
    company: "",
    location: "",
    summary: "",
  });
  const [message, setMessage] = useState("");

  const generateMessage = async () => {
    const response = await axios.post("/personalized-message", linkedinProfile);
    setMessage(response.data.message);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto mt-8 space-y-6">
      <h3 className="text-2xl font-semibold text-gray-800">LinkedIn Message Generator</h3>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Name</label>
        <input
          type="text"
          placeholder="Enter Name"
          value={linkedinProfile.name}
          onChange={(e) => setLinkedinProfile({ ...linkedinProfile, name: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Job Title</label>
        <input
          type="text"
          placeholder="Enter Job Title"
          value={linkedinProfile.job_title}
          onChange={(e) => setLinkedinProfile({ ...linkedinProfile, job_title: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Company</label>
        <input
          type="text"
          placeholder="Enter Company Name"
          value={linkedinProfile.company}
          onChange={(e) => setLinkedinProfile({ ...linkedinProfile, company: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Location</label>
        <input
          type="text"
          placeholder="Enter Location"
          value={linkedinProfile.location}
          onChange={(e) => setLinkedinProfile({ ...linkedinProfile, location: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Summary</label>
        <textarea
          placeholder="Enter Summary"
          value={linkedinProfile.summary}
          onChange={(e) => setLinkedinProfile({ ...linkedinProfile, summary: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        onClick={generateMessage}
        className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-all duration-200"
      >
        Generate Message
      </button>

      <div className="mt-6">
        <h4 className="font-semibold text-gray-800">Generated Message:</h4>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
};

export default MessageGenerator;
