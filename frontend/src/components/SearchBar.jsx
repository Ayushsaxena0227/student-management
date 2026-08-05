import React from "react";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="w-full max-w-md">
      <div className="relative flex items-center w-full bg-white rounded-xl border border-gray-200 px-4 py-3 shadow-sm hover:border-gray-300 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all duration-200 group">
        <svg
          className="w-5 h-5 text-gray-400 shrink-0 group-focus-within:text-blue-500 transition-colors"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>

        <input
          className="w-full bg-transparent border-none px-3 text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-0"
          type="text"
          placeholder="Search by name or course..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />

        {value && (
          <button
            className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-800 transition-colors focus:outline-none shrink-0"
            onClick={() => onChange("")}
            aria-label="Clear search"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
