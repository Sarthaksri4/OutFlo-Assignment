import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-8">Outreach Campaign Manager</h1>
      
      <div className="flex flex-col md:flex-row gap-4 w-full max-w-md">
        <button 
          onClick={() => navigate("/campaigns")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-lg w-full"
        >
          Manage Campaigns
        </button>
        
        <button 
          onClick={() => navigate("/message-generator")}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg text-lg w-full"
        >
          Generate Messages
        </button>
      </div>
    </div>
  );
}