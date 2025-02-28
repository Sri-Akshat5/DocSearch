import { useState } from "react";

export default function Dashboard() {

  return (
    <div className="flex justify-center mt-5 p-4">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">🚀 Welcome to <span className="text-blue-600">DocSearch</span></h2>
        <p className="text-gray-700 text-lg font-medium">Login to Access Your Storage</p>

        <div className="my-6 border-t border-gray-300"></div>

  
        <div className="text-left">
          <h3 className="text-xl font-semibold mb-3 text-gray-800">📌 How to Use:</h3>
          <ul className="list-none space-y-3 text-gray-600">
            <li className="flex items-center">
              ✅ Upload and manage your documents securely.
            </li>
            <li className="flex items-center">
              🔍 Search and retrieve files quickly.
            </li>
            <li className="flex items-center">
              🌎 Access your storage anytime, anywhere.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
