import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../components/admin/AdminLayout";
import { FaTrash, FaWhatsapp, FaEnvelope } from "react-icons/fa";

const ITEMS_PER_PAGE = 10;
const Enquiry = () => {
  const [data, setData] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    let isCancelled = false;

    const loadEnquiries = async () => {
      const res = await axios.get("http://localhost:5000/api/enquiry");
      if (!isCancelled) {
        setData(res.data);
      }
    };

    loadEnquiries();

    return () => {
      isCancelled = true;
    };
  }, []);

  /* ✅ DELETE FIXED */
  const deleteEnquiry = async (id) => {
    if (!window.confirm("Delete this enquiry?")) return;
    await axios.delete(`http://localhost:5000/api/enquiry/${id}`);
    setData((prev) => prev.filter((e) => e._id !== id));
  };

  /* DATE FILTER */
  const filtered = data.filter((e) => {
    const d = new Date(e.createdAt).getTime();
    if (fromDate && d < new Date(fromDate).getTime()) return false;
    if (toDate && d > new Date(toDate).getTime()) return false;
    return true;
  });

  /* PAGINATION */
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const paginated = filtered.slice(start, start + ITEMS_PER_PAGE);

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6 text-white">Enquiries</h1>

      {/* FILTER */}
      <div className="flex gap-4 mb-6">
        <input
          type="date"
          onChange={(e) => setFromDate(e.target.value)}
          className="bg-[#111] text-white border border-[#333] px-3 py-2 rounded 
          [color-scheme:dark]"
        />
        <input
          type="date"
          onChange={(e) => setToDate(e.target.value)}
          className="bg-[#111] text-white border border-[#333] px-3 py-2 rounded 
          [color-scheme:dark]"
        />
      </div>

      {/* TABLE */}
      <div className="bg-[#111] rounded-xl overflow-hidden">
        <div className="max-h-[520px] overflow-y-auto custom-scrollbar">
          <table className="w-full text-sm text-gray-300">
            <thead className="bg-[#1a1a1a] text-white sticky top-0 z-10">
              <tr>
                <th className="px-4 py-4 text-left">S.No</th>
                <th className="px-4 py-4 text-left">User</th>
                <th className="px-4 py-4 text-left">Phone</th>
                <th className="px-4 py-4 text-left">Subject</th>
                <th className="px-4 py-4 text-left">Message</th>
                <th className="px-4 py-4 text-left">Date</th>
                <th className="px-4 py-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {paginated.map((e, i) => (
                <tr key={e._id} className="border-t border-[#222] align-top">
                  <td className="px-4 py-4">
                    {start + i + 1}
                  </td>

                  <td className="px-4 py-4">
                    <p className="text-white font-medium">{e.name}</p>
                    <p className="text-xs text-gray-400 mt-1">{e.email}</p>
                  </td>

                  <td className="px-4 py-4">{e.phone}</td>
                  <td className="px-4 py-4">{e.subject || "-"}</td>
                  <td className="px-4 py-4 break-words max-w-[260px]">
                    {e.message}
                  </td>

                  <td className="px-4 py-4 text-xs text-gray-400">
                    {new Date(e.createdAt).toLocaleDateString("en-GB")}
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex justify-center gap-4 text-lg">
                      {/* MAIL */}
                      <a
                        href={`mailto:${e.email}`}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <FaEnvelope />
                      </a>

                      {/* WHATSAPP */}
                      <a
                        href={`https://wa.me/91${e.phone}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-green-500 hover:text-green-400"
                      >
                        <FaWhatsapp />
                      </a>

                      {/* DELETE */}
                      <button
                        onClick={() => deleteEnquiry(e._id)}
                        className="text-red-500 hover:text-red-400"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {paginated.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-gray-500">
                    No enquiries found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-end mt-5 gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded text-sm ${
                page === i + 1
                  ? "bg-purple-600 text-white"
                  : "bg-[#222] text-gray-300 hover:bg-[#333]"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default Enquiry;
