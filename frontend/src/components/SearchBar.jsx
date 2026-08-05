import React from "react";
import styles from "./SearchBar.module.css";

export default function SearchBar({ value, onChange }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.searchBox}>
        <svg
          className={styles.icon}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          className={styles.input}
          type="text"
          placeholder="Search by name or course..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {value && (
          <button
            className={styles.clearBtn}
            onClick={() => onChange("")}
            aria-label="Clear search"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
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
