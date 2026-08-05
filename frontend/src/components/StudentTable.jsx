import React from "react";

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
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-16 flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-10 h-10 rounded-full border-4 border-gray-100 border-t-blue-600 animate-spin mb-4" />
        <p className="text-gray-500 font-medium animate-pulse">
          Loading students...
        </p>
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-16 flex flex-col items-center justify-center min-h-[400px] text-center">
        <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 mb-5 shadow-sm border border-gray-100">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {search ? "No results found" : "No students yet"}
        </h3>
        <p className="text-gray-500 max-w-sm">
          {search
            ? `No students match "${search}". Try a different search term.`
            : "Your database is empty. Add your first student to get started."}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead>
            <tr className="bg-gray-50/80 border-b border-gray-100">
              <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider w-16">
                #
              </th>
              <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">
                Course
              </th>
              <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">
                Age
              </th>
              <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-right pr-8">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {students.map((student, index) => (
              <tr
                key={student._id}
                className="hover:bg-gray-50/50 transition-colors duration-150 group"
              >
                <td className="py-4 px-6 text-sm font-medium text-gray-400">
                  {index + 1}
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm shrink-0 shadow-sm border border-blue-100/50">
                      {student.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-semibold text-gray-900">
                      {student.name}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-6 text-sm text-gray-600">
                  {student.email}
                </td>
                <td className="py-4 px-6 text-sm text-gray-600">
                  {student.phone}
                </td>
                <td className="py-4 px-6">
                  <span className="inline-flex px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100/50">
                    {student.course}
                  </span>
                </td>
                <td className="py-4 px-6 text-sm text-gray-600 font-medium">
                  {student.age}
                </td>
                <td className="py-4 px-6 pr-8">
                  <div className="flex items-center justify-end gap-2  transition-opacity duration-200">
                    <button
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 hover:shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20"
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
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      View
                    </button>
                    <button
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 hover:shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
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
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                      Edit
                    </button>
                    <button
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 hover:shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-red-500/20"
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
                        strokeLinecap="round"
                        strokeLinejoin="round"
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

      <div className="bg-gray-50/50 px-6 py-4 border-t border-gray-100 flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">
          Showing <strong className="text-gray-900">{students.length}</strong>{" "}
          student{students.length !== 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
}
