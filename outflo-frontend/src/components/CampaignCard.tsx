import React from "react";

type Campaign = {
  _id: string;
  name: string;
  description: string;
  status: string;
  leads: string[];
};

interface CampaignCardProps {
  campaign: Campaign;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign, onEdit, onDelete }) => {
  return (
    <div className="bg-white border border-gray-200 shadow-md rounded-lg p-4 hover:shadow-lg transition-all ease-in-out duration-300">
      <h3 className="text-xl font-semibold text-gray-800">{campaign.name}</h3>
      <p className="text-gray-600 mt-2">{campaign.description}</p>
      <div className="mt-2">
        <span
          className={`px-3 py-1 rounded-md ${campaign.status === "active" ? "bg-green-500 text-white" : "bg-gray-400 text-white"}`}
        >
          {campaign.status}
        </span>
      </div>
      <div className="mt-4 space-x-3">
        <button
          onClick={() => onEdit(campaign._id)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all duration-200"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(campaign._id)}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all duration-200"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CampaignCard;
