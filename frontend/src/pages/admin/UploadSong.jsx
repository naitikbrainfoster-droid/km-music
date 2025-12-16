import AdminLayout from "../../components/admin/AdminLayout";
import SongUploadForm from "../../components/admin/SongUploadForm";

const UploadSong = () => {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold text-white mb-6">
        Upload New Song
      </h1>

      <SongUploadForm />
    </AdminLayout>
  );
};

export default UploadSong;
