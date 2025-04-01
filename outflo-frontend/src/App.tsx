import React, { useEffect, useState } from "react";
import { getCampaigns, createCampaign } from "./services/api";
import CampaignCard from "./components/CampaignCard";
import CampaignForm from "./components/CampaignForm";
import MessageGenerator from "./components/MessageGenerator";


const App: React.FC = () => {
  const [campaigns, setCampaigns] = useState<any[]>([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      const data = await getCampaigns();
      setCampaigns(data);
    };

    fetchCampaigns();
  }, []);

  const handleCreateCampaign = async (data: any) => {
    await createCampaign(data);
    const updatedCampaigns = await getCampaigns();
    setCampaigns(updatedCampaigns);
  };

  const handleDeleteCampaign = (id: string) => {
    // API call to delete campaign (soft delete)
  };

  const handleEditCampaign = (id: string) => {
    // API call to edit campaign
  };

  return (
    <div className="container mx-auto p-8 space-y-8">
      <h1 className="text-3xl font-semibold text-center text-gray-800">OutFlo Campaign Management</h1>
      <CampaignForm onSubmit={handleCreateCampaign} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((campaign) => (
          <CampaignCard key={campaign._id} campaign={campaign} onEdit={handleEditCampaign} onDelete={handleDeleteCampaign} />
        ))}
      </div>

      <MessageGenerator />
    </div>
  );
};

export default App;
