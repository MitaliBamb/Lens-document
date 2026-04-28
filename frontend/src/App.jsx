import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus("Please select a file first!");
      return;
    }
    
    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploadStatus("Uploading...");
      const res = await axios.post("http://localhost:8000/upload", formData);
      setUploadStatus(res.data.message);
    } catch (error) {
      setUploadStatus("Upload failed. Is the Python server running?");
    }
  };

  const handleAsk = async () => {
    try {
      const res = await axios.post("http://localhost:8000/ask", { prompt: question });
      setAnswer(res.data.answer);
    } catch (error) {
      setAnswer("Error: Could not connect to the AI backend.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 flex flex-col items-center font-sans">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-blue-400 mb-8 border-b border-slate-700 pb-4">
            Lens: Document Analysis
        </h1>
        
        {/* Step 1: Upload */}
        <div className="bg-slate-800 p-6 rounded-xl shadow-xl mb-8 border border-slate-700">
          <label className="block text-sm font-medium text-slate-400 mb-2">1. Select Document</label>
          <input 
            type="file" 
            onChange={(e) => setFile(e.target.files[0])} 
            className="block w-full text-sm text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500 mb-4"
          />
          <button onClick={handleUpload} className="w-full bg-blue-600 py-2 rounded-lg font-bold hover:bg-blue-500 transition">
            Upload & Process
          </button>
          {uploadStatus && (
            <p className={`mt-3 text-sm font-medium ${uploadStatus.includes("Success") ? "text-green-400" : "text-yellow-400"}`}>
              {uploadStatus}
            </p>
          )}
        </div>

        {/* Step 2: Ask */}
        <div className="bg-slate-800 p-6 rounded-xl shadow-xl border border-slate-700">
          <label className="block text-sm font-medium text-slate-400 mb-2">2. Ask a Question</label>
          <input 
            className="w-full p-3 bg-slate-700 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="e.g., What is the conclusion of this report?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button onClick={handleAsk} className="w-full bg-green-600 py-2 rounded-lg font-bold hover:bg-green-500 transition">
            Ask Document
          </button>
        </div>

        {/* Answer Section (Always at the bottom) */}
        {answer && (
          <div className="mt-10 p-6 bg-blue-900/20 border border-blue-500/50 rounded-xl animate-fade-in">
            <h3 className="text-blue-400 font-bold mb-2 text-sm uppercase tracking-wider">AI Analysis:</h3>
            <p className="text-lg leading-relaxed">{answer}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;