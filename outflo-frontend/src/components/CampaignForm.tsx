import React, { useState } from "react";

type CampaignFormProps = {
  onSubmit: (data: { name: string; description: string; status: string }) => void;
};

const CampaignForm: React.FC<CampaignFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("active");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, description, status });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto mt-6">
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Campaign Name</label>
        <input
          type="text"
          placeholder="Enter campaign name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Description</label>
        <textarea
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-all duration-200"
      >
        Save Campaign
      </button>
    </form>
  );
};

export default CampaignForm;
