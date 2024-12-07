"use client"
export default function Home() {
  return (
    <div className="justify-center flex flex-col items-center h-screen">
      <div className="flex gap-4">
        <button onClick={()=> window.open('/file-upload')} className="bg-gray-50 hover:bg-gray-200 rounded-md p-4 text-black font-bold  active:scale-95">Upload Files</button>
        <button onClick={()=> window.open('/files')} className="bg-gray-50 hover:bg-gray-200 rounded-md p-4 text-black font-bold  active:scale-95"> View and Download Files </button>
      </div>
    </div>
  );
}
