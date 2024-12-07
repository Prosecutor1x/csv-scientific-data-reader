"use client";

import React, { useState, ChangeEvent } from "react";
import axios from "axios";

interface UploadResponse {
  metadata: {
    filename: string;
    rowCount: number;
    columns: string[];
    fileUrl: string;
    id?: string;
  };
}

const UploadFile: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadResponse, setUploadResponse] = useState<UploadResponse | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  // Handle file input change
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      setError(null); // Clear error on file selection
    }
  };

  // Handle file upload
  const handleUpload = async (): Promise<void> => {
    if (!selectedFile) {
      setError("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post<UploadResponse>(
        "http://localhost:5000/api/upload", // Replace with your backend server URL
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUploadResponse(response.data);
      setError(null); // Clear errors on successful upload
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Error uploading file. Please try again."
      );
    }
  };

  console.log(uploadResponse?.metadata.fileUrl);
  return (
    <div className="justify-center items-center flex flex-col h-screen space-y-4">
      <div className="border-2 border-white bg-gray-200 text-black p-12 rounded-md ">
        <h1 className="text-center mb-12 font-bold ">Upload a CSV File</h1>
        <div className="border-2 border-black p-4 rounded-lg" >
          <input type="file" accept=".csv" onChange={handleFileChange} />
          <button
            onClick={handleUpload}
            className="bg-gray-950 hover:bg-gray-700 rounded-md p-4 text-white font-bold  active:scale-95"
          >
            Upload
          </button>
        </div>
      </div>
      {error && <p className="text-red-600 mt-10">{error}</p>}
      {uploadResponse && (
        <div className="py-14 border-2 border-white  bg-gray-200 text-black flex flex-col p-4 rounded-md space-y-2">
          <h2 className="text-center font-bold">Upload Successful!</h2>
          <p>
            <strong>Filename:</strong> {uploadResponse.metadata.filename}
          </p>
          <p>
            <strong>Row Count:</strong> {uploadResponse.metadata.rowCount}
          </p>
          <p>
            <strong>Columns:</strong>{" "}
            {uploadResponse.metadata.columns.join(", ")}
          </p>
          <a
            href={uploadResponse.metadata.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
             className="bg-gray-950 hover:bg-gray-700 rounded-md p-4 text-white font-bold  active:scale-95"
          >
            View Uploaded File
          </a>
        </div>
      )}
    </div>
  );
};

export default UploadFile;
