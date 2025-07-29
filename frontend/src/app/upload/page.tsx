"use client"
import { useState } from "react";
import NavHeader from "../../components/NavHeader"

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = () => {
    if (!selectedFile) return;
    // You can implement actual upload logic here (e.g., to your API or S3)
    alert(`Uploading: ${selectedFile.name}`);
  };

  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
    // Handle search logic here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nav Bar */}
      <NavHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />
      <div className="min-h-[calc(100vh-5rem)] bg-white flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-xl shadow-lg border border-gray-200 p-8 bg-white">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Upload Your File</h1>

          <div className="flex flex-col items-center space-y-4">
            <label className="w-full flex flex-col items-center px-4 py-6 bg-gray-50 text-blue-500 rounded-lg shadow border border-dashed border-blue-200 cursor-pointer hover:bg-blue-50 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 mb-3 text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M4 12l8-8m0 0l8 8m-8-8v12" />
              </svg>
              <span className="font-medium">Click to select file</span>
              <input type="file" className="hidden" onChange={handleFileChange} />
            </label>

            {previewUrl && (
              <div className="w-full">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full rounded border border-gray-200 object-contain max-h-60"
                />
              </div>
            )}

            <button
              onClick={handleUpload}
              disabled={!selectedFile}
              className="w-full bg-blue-600 text-white py-2 rounded-lg shadow hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>

  );
}
