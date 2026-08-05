import React, { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { getStudents, deleteStudent } from "../api/studentApi";
import Dashboard from "../components/Dashboard";
import StudentTable from "../components/StudentTable";
import StudentModal from "../components/StudentModal";
import DeleteDialog from "../components/DeleteDialog";
import ViewModal from "../components/ViewModal";
import SearchBar from "../components/SearchBar";
import styles from "./Home.module.css";

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
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.brand}>
            <span className={styles.brandIcon}>🎓</span>
            <span className={styles.brandName}>StudentMS</span>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.container}>
          {/* Page Title */}
          <div className={styles.pageHeader}>
            <div>
              <h1 className={styles.pageTitle}>Student Management</h1>
              <p className={styles.pageSubtitle}>
                Manage student records and information
              </p>
            </div>
            <button className={styles.addBtn} onClick={handleAddClick}>
              <span className={styles.addBtnIcon}>+</span>
              Add Student
            </button>
          </div>

          {/* Dashboard */}
          <Dashboard
            total={totalStudents}
            filtered={students.length}
            search={search}
          />

          {/* Search */}
          <SearchBar value={search} onChange={setSearch} />

          {/* Table */}
          <StudentTable
            students={students}
            loading={loading}
            search={search}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
          />
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
