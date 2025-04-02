// import { useState } from "react";
// import { scrapeLinkedIn } from "../services/api";

// export default function LinkedInScraper() {
//   const [profileUrl, setProfileUrl] = useState("");
//   const [data, setData] = useState<any>(null);

//   const handleScrape = async () => {
//     const res = await scrapeLinkedIn(profileUrl);
//     setData(res);
//   };

//   return (
//     <div className="p-6 bg-gray-800 rounded-lg">
//       <h2 className="text-2xl font-semibold mb-4">🔍 LinkedIn Profile Scraper</h2>
//       <input
//         type="text"
//         placeholder="Enter LinkedIn Profile URL"
//         value={profileUrl}
//         onChange={(e) => setProfileUrl(e.target.value)}
//         className="border p-2 w-full mb-2 bg-gray-700 text-white"
//       />
//       <button onClick={handleScrape} className="bg-blue-500">Scrape Profile</button>
//       {data && (
//         <div className="mt-4 p-4 bg-gray-700 border rounded">
//           <p><strong>Name:</strong> {data.name}</p>
//           <p><strong>Job Title:</strong> {data.jobTitle}</p>
//           <p><strong>Company:</strong> {data.company}</p>
//         </div>
//       )}
//     </div>
//   );
// }
