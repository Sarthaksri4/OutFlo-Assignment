// import { useState } from "react";
// import { generateMessage } from "../api";

// export default function MessageForm() {
//   const [form, setForm] = useState({ name: "", job_title: "", company: "" });
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();
//     const res = await generateMessage(form);
//     setMessage(res.message);
//   };

//   return (
//     <div className="p-6 bg-[#00275a] rounded-lg shadow-md text-white">
//       <h2 className="text-2xl font-semibold mb-4">✉️ AI Message Generator</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Recipient's Name"
//           value={form.name}
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//           className="border p-2 w-full mb-2 rounded bg-white text-black"
//         />
//         <input
//           type="text"
//           placeholder="Job Title"
//           value={form.job_title}
//           onChange={(e) => setForm({ ...form, job_title: e.target.value })}
//           className="border p-2 w-full mb-2 rounded bg-white text-black"
//         />
//         <input
//           type="text"
//           placeholder="Company Name"
//           value={form.company}
//           onChange={(e) => setForm({ ...form, company: e.target.value })}
//           className="border p-2 w-full mb-2 rounded bg-white text-black"
//         />
//         <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">Generate Message</button>
//       </form>
//       {message && <p className="mt-4 p-4 bg-white text-black border rounded">{message}</p>}
//     </div>
//   );
// }
