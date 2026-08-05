import React from "react";

export default function ViewModal({ student, onClose }) {
  if (!student) return null;

  const fields = [
    { label: "Full Name", value: student.name },
    { label: "Email Address", value: student.email },
    { label: "Phone Number", value: student.phone },
    { label: "Course", value: student.course },
    { label: "Age", value: student.age },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative transform scale-100 zoom-in-95 transition-all">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">
            Student Details
          </h2>
          <button
            className="text-gray-400 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-full transition-colors -mr-2 focus:outline-none"
            onClick={onClose}
            aria-label="Close"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col items-center p-8 bg-gradient-to-b from-blue-50/70 to-transparent">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-4xl font-bold text-white shadow-xl mb-5 ring-4 ring-white/50">
            {student.name.charAt(0).toUpperCase()}
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{student.name}</p>
            <p className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-100/60 px-4 py-1.5 rounded-full mt-3 inline-block shadow-sm">
              {student.course}
            </p>
          </div>
        </div>

        <div className="px-8 pb-4 pt-2">
          <div className="space-y-4">
            {fields.map((f) => (
              <div
                key={f.label}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2.5 border-b border-gray-50 last:border-0"
              >
                <p className="text-sm font-semibold text-gray-500">{f.label}</p>
                <p className="text-sm font-semibold text-gray-900 mt-1 sm:mt-0 sm:text-right">
                  {f.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 px-8 py-5 flex items-center justify-between border-t border-gray-100">
          <p className="text-xs font-medium text-gray-500 flex flex-col gap-0.5">
            <span className="uppercase tracking-wider font-semibold text-gray-400 text-[10px]">
              Registered
            </span>
            {new Date(student.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <button
            className="px-6 py-2.5 text-sm font-bold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors shadow-sm"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
