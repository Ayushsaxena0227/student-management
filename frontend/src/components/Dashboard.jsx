import React from "react";

export default function Dashboard({ total, filtered, search }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Total Students Card */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 flex items-center gap-5 cursor-default">
        <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 bg-blue-50 text-blue-600">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
            Total Students
          </p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{total}</p>
        </div>
      </div>

      {/* Results / Registered Card */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 flex items-center gap-5 cursor-default">
        <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 bg-green-50 text-green-600">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 11 12 14 22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </svg>
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
            {search ? "Results Found" : "Registered"}
          </p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{filtered}</p>
        </div>
      </div>

      {/* System Status Card */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 flex items-center gap-5 cursor-default">
        <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 bg-yellow-50 text-yellow-600">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
            System
          </p>
          <p className="text-xl font-bold text-gray-900 mt-2 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
            Active
          </p>
        </div>
      </div>
    </div>
  );
}
