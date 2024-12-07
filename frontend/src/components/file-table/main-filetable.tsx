// components/FileList.tsx
"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { EyeIcon } from 'lucide-react';

type File = {
  id: number;
  filename: string;
  uploadDate: string;
  rowCount: number;
  columns: string[];
  fileUrl: string;
};

const FileList = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFiles = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/files'); // Adjust if the URL changes
        setFiles(response.data.data); // Assuming the data is under 'data' key
      } catch (err) {
        setError('Failed to fetch files.');
      }
    };

    loadFiles();
  }, []);

  return (
    <div className="">
      {error && <p className="text-red-500 text-center">{error}</p>}
      {files.length === 0 ? (
        <p className="text-center text-gray-500">No files found.</p>
      ) : (
        <ul className="grid grid-cols-3 grid-flow-row gap-12">
          {files.map((file) => (
            <div key={file.id} className="border rounded-lg shadow-sm bg-white flex flex-col justify-center p-4">
              <>
              <h2 className="text-2xl   text-gray-500 font-bold"><span>{file.filename} </span></h2>
              <p className="text-sm  font-bold text-gray-600">Uploaded on:<span  className="font-normal"> {new Date(file.uploadDate).toLocaleDateString()}</span></p>
              <p className="text-sm  font-bold text-gray-600">Row Count:<span   className="font-normal"  > {file.rowCount} </span></p>
              <p className="text-sm  font-bold text-gray-600">Columns:<span className="font-normal"> {file.columns.join(', ')}</span></p>
              </>
              <button 
                onClick={()=>window.open(`${file.fileUrl}`)}
                className='text-gray-600 hover:text-blue-500 align-baseline text-center'
              > 
              <EyeIcon/>
              </button>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileList;
