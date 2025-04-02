import { useState } from "react";
import { generateMessage } from "../services/api";

export default function MessageGenerator() {
  const [form, setForm] = useState({
    name: "",
    jobTitle: "",
    company: "",
    location: "",
    summary: ""
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await generateMessage(form);
      setMessage(response.message);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">AI Message Generator</h1>
      
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-2 text-gray-300">Name*</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({...form, name: e.target.value})}
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-300">Job Title*</label>
            <input
              type="text"
              value={form.jobTitle}
              onChange={(e) => setForm({...form, jobTitle: e.target.value})}
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-300">Company*</label>
            <input
              type="text"
              value={form.company}
              onChange={(e) => setForm({...form, company: e.target.value})}
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-300">Location*</label>
            <input
              type="text"
              value={form.location}
              onChange={(e) => setForm({...form, location: e.target.value})}
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
              required
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block mb-2 text-gray-300">Summary*</label>
          <textarea
            value={form.summary}
            onChange={(e) => setForm({...form, summary: e.target.value})}
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 min-h-[100px]"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded text-white font-medium ${
            loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {loading ? 'Generating...' : 'Generate Message'}
        </button>
        
        {error && <p className="mt-3 text-red-400">{error}</p>}
      </form>

      {message && (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-semibold text-white">Generated Message</h2>
            <button
              onClick={() => navigator.clipboard.writeText(message)}
              className="text-blue-400 hover:text-blue-300 text-sm"
            >
              Copy to Clipboard
            </button>
          </div>
          <div className="bg-gray-900 p-4 rounded whitespace-pre-line text-gray-200">
            {message}
          </div>
        </div>
      )}
    </div>
  );
}