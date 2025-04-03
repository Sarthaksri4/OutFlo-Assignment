import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#00275a] p-4">
      <div className="bg-[#31527c] p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">
          Outreach Campaign Manager
        </h1>
        
        <div className="space-y-4">
          <button 
            onClick={() => navigate("/campaigns")}
            className="w-full py-3 px-4 rounded text-white font-medium bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Manage Campaigns
          </button>
          <button 
            onClick={() => navigate("/message-generator")}
            className="w-full py-3 px-4 rounded text-white font-medium bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Generate Messages
          </button>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
            className="text-blue-300 hover:underline text-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}