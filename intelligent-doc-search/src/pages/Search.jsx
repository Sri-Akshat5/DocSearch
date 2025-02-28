import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!query.trim()) {
      alert("Please enter a search query");
      return;
    }

    try {
      const { data } = await axios.get(`http://localhost:5000/api/search?q=${query}`);
      setResults(data);
    } catch (error) {
      console.error("Search Error:", error);
      alert("Error fetching search results.");
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
    await axios.delete(`http://localhost:5000/api/documents/${id}`, {
      headers: { "x-auth-token": token },
    });
    alert("Document deleted successfully!");
    setDocuments(documents.filter((doc) => doc.id !== id)); // Remove from UI
  } catch (error) {
    console.error("Delete failed:", error);
  }
};
  return (
    <div className="flex flex-col items-center  text-white p-6">
      {/* Search Box */}
      <div className="w-full max-w-2xl p-6 rounded-lg shadow-md text-center">
        <h2 className="text-3xl font-bold text-blue-400 mb-4">🔍 Search Documents</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Enter search query..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full sm:w-2/3 p-3 rounded-lg text-gray-950 border border-gray-600 "
          />
          <button
            onClick={handleSearch}
            className="w-full sm:w-1/3 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Search
          </button>
        </div>
      </div>

      {/* Results Section */}
      <div className="w-full max-w-2xl mt-6">
        {results.length > 0 ? (
          <ul className="space-y-4">
            {results.map((doc) => (
              <li
                key={doc.id}
                className=" p-4 rounded-lg border border-blue-500  flex justify-between"
              ><div>
                <h3 className="text-lg font-semibold text-blue-500">{doc.name} ({doc.type})</h3>
                <p className="text-gray-400">📅 Issue Date: {doc.issueDate}</p>
                <p className="text-gray-400">🔖 ID Number: {doc.idNumber}</p>
                <a
                  href={`http://localhost:5000/uploads/${doc.filePath}`}
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
