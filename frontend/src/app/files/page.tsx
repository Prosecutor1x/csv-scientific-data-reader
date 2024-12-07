// pages/index.tsx
import FileList from '@/components/file-table/main-filetable';

const FilesPage = () => {
  return (
    <div className="min-h-screen  p-4">
      <h1 className="text-4xl font-bold text-center mb-8">All uploaded files</h1>
      <FileList />
    </div>
  );
};
 
export default FilesPage;
