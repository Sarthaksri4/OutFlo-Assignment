import { useEffect, useState } from "react";
import CampaignForm from "../components/CampaignForm";
import CampaignTable from "../components/CampaignTable";
import { 
  fetchCampaigns, 
  createCampaign, 
  updateCampaign, 
  deleteCampaign 
} from "../services/api";
import { Campaign } from "../types";

export default function CampaignPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [currentCampaign, setCurrentCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadCampaigns();
  }, []);

  const loadCampaigns = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchCampaigns();
      setCampaigns(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData: Campaign) => {
    setLoading(true);
    setError("");
    try {
      if (currentCampaign?._id) {
        await updateCampaign(currentCampaign._id, formData);
      } else {
        await createCampaign(formData);
      }
      loadCampaigns();
      setCurrentCampaign(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    setError("");
    try {
      await deleteCampaign(id);
      loadCampaigns();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-2xl font-bold mb-6">Campaign Management</h1>
      
      {currentCampaign ? (
        <CampaignForm 
          campaign={currentCampaign} 
          onSubmit={handleSubmit} 
          onCancel={() => setCurrentCampaign(null)}
        />
      ) : (
        <>
          <button
            onClick={() => setCurrentCampaign({
              name: "",
              description: "",
              status: "ACTIVE",
              leads: [],
              accountIDs: []
            })}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mb-4"
          >
            Create New Campaign
          </button>
          <CampaignTable 
            campaigns={campaigns} 
            onEdit={setCurrentCampaign} 
            onDelete={handleDelete} 
          />
        </>
      )}
    </div>
  );
}