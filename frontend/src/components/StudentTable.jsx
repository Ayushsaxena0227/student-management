import React from "react";
import styles from "./StudentTable.module.css";

export default function StudentTable({
  students,
  loading,
  search,
  onView,
  onEdit,
  onDelete,
}) {
  if (loading) {
    return (
      <div className={styles.card}>
        <div className={styles.loadingWrapper}>
          <div className={styles.spinner} />
          <p className={styles.loadingText}>Loading students...</p>
        </div>
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <div className={styles.card}>
        <div className={styles.emptyWrapper}>
          <div className={styles.emptyIcon}>
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <p className={styles.emptyTitle}>
            {search ? "No results found" : "No students yet"}
          </p>
          <p className={styles.emptySubtitle}>
            {search
              ? `No students match "${search}". Try a different search.`
              : "Add your first student to get started."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>#</th>
              <th className={styles.th}>Name</th>
              <th className={styles.th}>Email</th>
              <th className={styles.th}>Phone</th>
              <th className={styles.th}>Course</th>
              <th className={styles.th}>Age</th>
              <th className={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student._id} className={styles.row}>
                <td className={styles.td}>
                  <span className={styles.index}>{index + 1}</span>
                </td>
                <td className={styles.td}>
                  <div className={styles.nameCell}>
                    <div className={styles.avatar}>
                      {student.name.charAt(0).toUpperCase()}
                    </div>
                    <span className={styles.name}>{student.name}</span>
                  </div>
                </td>
                <td className={styles.td}>
                  <span className={styles.email}>{student.email}</span>
                </td>
                <td className={styles.td}>
                  <span className={styles.phone}>{student.phone}</span>
                </td>
                <td className={styles.td}>
                  <span className={styles.courseBadge}>{student.course}</span>
                </td>
                <td className={styles.td}>
                  <span className={styles.age}>{student.age}</span>
                </td>
                <td className={styles.td}>
                  <div className={styles.actions}>
                    <button
                      className={`${styles.actionBtn} ${styles.viewBtn}`}
                      onClick={() => onView(student)}
                      title="View"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      View
                    </button>
                    <button
                      className={`${styles.actionBtn} ${styles.editBtn}`}
                      onClick={() => onEdit(student)}
                      title="Edit"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                      Edit
                    </button>
                    <button
                      className={`${styles.actionBtn} ${styles.deleteBtn}`}
                      onClick={() => onDelete(student)}
                      title="Delete"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                        <path d="M10 11v6M14 11v6" />
                        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.tableFooter}>
        <p className={styles.footerText}>
          Showing <strong>{students.length}</strong> student
          {students.length !== 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
}
