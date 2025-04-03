import { useState } from "react";
import { Campaign } from "../types";

type CampaignFormProps = {
  campaign: Campaign;
  onSubmit: (data: Campaign) => void;
  onCancel: () => void;
};

export default function CampaignForm({ 
  campaign,
  onSubmit,
  onCancel
}: CampaignFormProps) {
  const [form, setForm] = useState<Campaign>(campaign);
  const [newLead, setNewLead] = useState("");
  const [newAccountID, setNewAccountID] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  const addLead = () => {
    if (newLead.trim() && !form.leads.includes(newLead.trim())) {
      setForm({
        ...form,
        leads: [...form.leads, newLead.trim()]
      });
      setNewLead("");
    }
  };

  const removeLead = (index: number) => {
    setForm({
      ...form,
      leads: form.leads.filter((_: string, i: number) => i !== index)
    });
  };

  const addAccountID = () => {
    if (newAccountID.trim() && !form.accountIDs.includes(newAccountID.trim())) {
      setForm({
        ...form,
        accountIDs: [...form.accountIDs, newAccountID.trim()]
      });
      setNewAccountID("");
    }
  };

  const removeAccountID = (index: number) => {
    setForm({
      ...form,
      accountIDs: form.accountIDs.filter((_: string, i: number) => i !== index)
    });
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
      <h2 className="text-xl font-semibold mb-4 text-white">
        {campaign._id ? "Edit Campaign" : "Create New Campaign"}
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {/* Name Field */}
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
            <label className="block mb-2 text-gray-300">Description*</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({...form, description: e.target.value})}
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 min-h-[80px]"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-300">Status*</label>
            <select
              value={form.status}
              onChange={(e) => setForm({
                ...form, 
                status: e.target.value as "ACTIVE" | "INACTIVE" | "DELETED"
              })}
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
            >
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="DELETED">Deleted</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-gray-300">LinkedIn Leads</label>
            <div className="flex gap-2 mb-2">
              <input
                type="url"
                value={newLead}
                onChange={(e) => setNewLead(e.target.value)}
                className="flex-1 p-2 rounded bg-gray-700 text-white border border-gray-600"
                placeholder="https://linkedin.com/in/username"
              />
              <button
                type="button"
                onClick={addLead}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Add
              </button>
            </div>
            {form.leads.length > 0 && (
              <div className="bg-gray-700 rounded p-2 max-h-40 overflow-y-auto">
                {form.leads.map((lead, index) => (
                  <div key={index} className="flex justify-between items-center p-2 hover:bg-gray-600 rounded">
                    <a href={lead} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline truncate">
                      {lead}
                    </a>
                    <button
                      type="button"
                      onClick={() => removeLead(index)}
                      className="text-red-400 hover:text-red-300"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block mb-2 text-gray-300">Account IDs</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newAccountID}
                onChange={(e) => setNewAccountID(e.target.value)}
                className="flex-1 p-2 rounded bg-gray-700 text-white border border-gray-600"
                placeholder="Enter Account ID"
              />
              <button
                type="button"
                onClick={addAccountID}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Add
              </button>
            </div>
            {form.accountIDs.length > 0 && (
              <div className="bg-gray-700 rounded p-2 max-h-40 overflow-y-auto">
                {form.accountIDs.map((accountID, index) => (
                  <div key={index} className="flex justify-between items-center p-2 hover:bg-gray-600 rounded">
                    <span className="text-gray-200 truncate">{accountID}</span>
                    <button
                      type="button"
                      onClick={() => removeAccountID(index)}
                      className="text-red-400 hover:text-red-300"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              {campaign._id ? "Update Campaign" : "Create Campaign"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}