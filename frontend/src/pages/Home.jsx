import React, { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { getStudents, deleteStudent } from "../api/studentApi";
import Dashboard from "../components/Dashboard";
import StudentTable from "../components/StudentTable";
import StudentModal from "../components/StudentModal";
import DeleteDialog from "../components/DeleteDialog";
import ViewModal from "../components/ViewModal";
import SearchBar from "../components/SearchBar";

export default function Home() {
  const [students, setStudents] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editStudent, setEditStudent] = useState(null);

  const [showDelete, setShowDelete] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [showView, setShowView] = useState(false);
  const [viewStudent, setViewStudent] = useState(null);

  const fetchStudents = useCallback(async (q = "") => {
    setLoading(true);
    try {
      const res = await getStudents(q);
      setStudents(res.data.data);
      setTotalStudents(res.data.total);
    } catch (err) {
      toast.error("Failed to load students");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchStudents(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search, fetchStudents]);

  const handleAddClick = () => {
    setEditStudent(null);
    setShowModal(true);
  };

  const handleEdit = (student) => {
    setEditStudent(student);
    setShowModal(true);
  };

  const handleView = (student) => {
    setViewStudent(student);
    setShowView(true);
  };

  const handleDeleteClick = (student) => {
    setDeleteTarget(student);
    setShowDelete(true);
  };

  const handleDeleteConfirm = async () => {
    setDeleteLoading(true);
    try {
      await deleteStudent(deleteTarget._id);
      toast.success("Student deleted successfully");
      setShowDelete(false);
      setDeleteTarget(null);
      fetchStudents(search);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete student");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleModalSuccess = () => {
    setShowModal(false);
    fetchStudents(search);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5 cursor-default">
            <span className="text-2xl">🎓</span>
            <span className="text-xl font-bold tracking-tight text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
              StudentMS
            </span>
          </div>
          {/* Optional: Add user profile or settings icon here later if needed */}
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6 sm:gap-8">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                Student Management
              </h1>
              <p className="text-sm sm:text-base text-gray-500 mt-1 font-medium">
                Manage student records, registrations, and information
              </p>
            </div>
            <button
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 whitespace-nowrap active:scale-[0.98]"
              onClick={handleAddClick}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Add Student
            </button>
          </div>

          {/* Dashboard */}
          <Dashboard
            total={totalStudents}
            filtered={students.length}
            search={search}
          />

          {/* SearchBar */}
          <div className="w-full">
            <SearchBar value={search} onChange={setSearch} />
          </div>

          {/* Table */}
          <div className="w-full">
            <StudentTable
              students={students}
              loading={loading}
              search={search}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
            />
          </div>
        </div>
      </main>

      {/* Modals */}
      {showModal && (
        <StudentModal
          student={editStudent}
          onClose={() => setShowModal(false)}
          onSuccess={handleModalSuccess}
        />
      )}

      {showDelete && (
        <DeleteDialog
          student={deleteTarget}
          loading={deleteLoading}
          onConfirm={handleDeleteConfirm}
          onCancel={() => {
            setShowDelete(false);
            setDeleteTarget(null);
          }}
        />
      )}

      {showView && (
        <ViewModal
          student={viewStudent}
          onClose={() => {
            setShowView(false);
            setViewStudent(null);
          }}
        />
      )}
    </div>
  );
}
