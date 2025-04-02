type CampaignTableProps = {
    campaigns: any[];
    onEdit: (campaign: any) => void;
    onDelete: (id: string) => void;
  };
  
  export default function CampaignTable({ 
    campaigns, 
    onEdit, 
    onDelete 
  }: CampaignTableProps) {
    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-700">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Leads Count</th>
              <th className="p-3 text-left">Accounts Count</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign) => (
              <tr key={campaign._id} className="border-t border-gray-600 hover:bg-gray-700/50">
                <td className="p-3">{campaign.name}</td>
                <td className="p-3 max-w-xs truncate">{campaign.description}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    campaign.status === 'Active' ? 'bg-green-500/20 text-green-400' :
                    campaign.status === 'Inactive' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {campaign.status}
                  </span>
                </td>
                <td className="p-3">{campaign.leads?.length || 0}</td>
                <td className="p-3">{campaign.accountIDs?.length || 0}</td>
                <td className="p-3 space-x-2">
                  <button 
                    onClick={() => onEdit(campaign)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => onDelete(campaign._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }