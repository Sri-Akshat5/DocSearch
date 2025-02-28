import { useState, useEffect } from "react";
import { MdDeleteForever } from "react-icons/md";

import axios from "axios";

export default function UploadView() {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [familyMember, setFamilyMember] = useState("");
  const [documents, setDocuments] = useState([]);

  // Fetch documents from backend
  const fetchDocuments = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No auth token found.");
        return;
      }
      const res = await axios.get("https://docsearch-y8m5.onrender.com/api/documents", {
        headers: { "x-auth-token": token },
      });
      setDocuments(res.data);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  // Handle file upload
  const handleUpload = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to add documents.");
      return;
    }

    if (!file || !name || !type || !issueDate || !idNumber || !familyMember) {
      alert("Please fill in all fields and select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("document", file);
    formData.append("name", name);
    formData.append("type", type);
    formData.append("issueDate", issueDate);
    formData.append("idNumber", idNumber);
    formData.append("familyMember", familyMember);

    try {
      await axios.post("https://docsearch-y8m5.onrender.com/api/upload", formData);
      alert("File uploaded successfully!");
      fetchDocuments();
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  // Handle document delete
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to delete documents.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this document?")) return;

    try {
      await axios.delete(`https://docsearch-y8m5.onrender.com/api/documents/${id}`, {
        headers: { "x-auth-token": token },
      });
      alert("Document deleted successfully!");
      setDocuments(documents.filter((doc) => doc.id !== id)); // Remove from UI
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      {/* Upload Section */}
      <div className="w-full max-w-lg p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-blue-400 mb-4 text-center">
          📤 Upload Document
        </h2>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Document Name"
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-lg text-gray-950 border border-gray-600"
          />
          <div className="grid grid-cols-2 gap-4">
            <select
              onChange={(e) => setType(e.target.value)}
              className="border rounded-lg p-3 text-gray-950 border-gray-600"
            >
              <option value="">Select File Type</option>
              <option value="pdf">PDF</option>
              <option value="word">Word</option>
              <option value="jpg">JPG</option>
              <option value="other">Other</option>
            </select>
            <input
              type="date"
              onChange={(e) => setIssueDate(e.target.value)}
              className="p-3 rounded-lg text-gray-950 border border-gray-600"
            />
          </div>
          <input
            type="text"
            placeholder="ID Number"
            onChange={(e) => setIdNumber(e.target.value)}
            className="w-full p-3 rounded-lg text-gray-950 border border-gray-600"
          />
          <input
            type="text"
            placeholder="Family Member (e.g. Wife, Mom, Son)"
            onChange={(e) => setFamilyMember(e.target.value)}
            className="w-full p-3 rounded-lg text-gray-950 border border-gray-600"
          />
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full p-3 rounded-lg text-gray-950 border border-gray-600"
          />
          <button
            onClick={handleUpload}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Upload
          </button>
        </form>
      </div>


      <h2 className="text-3xl font-bold text-blue-400 mt-8">📂 Uploaded Documents</h2>

      {/* Results Section */}
      <div className="w-full max-w-2xl mt-6">
        {documents.length > 0 ? (
          <ul className="space-y-4">
            {documents.map((doc) => (
              <li
                key={doc.id}
                className="p-4 rounded-lg border border-blue-500  flex justify-between "
              >
                <div>
                  <h3 className="text-lg font-semibold text-blue-500">
                    {doc.name} ({doc.type})
                  </h3>
                  <p className="text-gray-400">📅 Issue Date: {doc.issueDate}</p>
                  <p className="text-gray-400">🔖 ID Number: {doc.idNumber}</p>
                  <a
                    href={`https://docsearch-y8m5.onrender.com/uploads/${doc.filePath}`}
                    target="_blank"
                    className="text-blue-400 hover:underline mt-2 inline-block"
                  >
                    📄 View Document
                  </a>
                </div>
                <button
                  onClick={() => handleDelete(doc.id)}
                  className=" text-red-500 text-2xl"
                >
                  <MdDeleteForever />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-6 text-gray-500 text-center">No documents found.</p>
        )}
      </div>
    </div>
  );
}
