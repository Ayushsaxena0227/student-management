import React from "react";
import styles from "./Dashboard.module.css";

export default function Dashboard({ total, filtered, search }) {
  return (
    <div className={styles.grid}>
      <div className={styles.card}>
        <div
          className={styles.cardIcon}
          style={{ background: "#eff6ff", color: "#2563eb" }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </div>
        <div className={styles.cardBody}>
          <p className={styles.cardLabel}>Total Students</p>
          <p className={styles.cardValue}>{total}</p>
        </div>
      </div>

      <div className={styles.card}>
        <div
          className={styles.cardIcon}
          style={{ background: "#f0fdf4", color: "#16a34a" }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="9 11 12 14 22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </svg>
        </div>
        <div className={styles.cardBody}>
          <p className={styles.cardLabel}>
            {search ? "Results Found" : "Registered"}
          </p>
          <p className={styles.cardValue}>{filtered}</p>
        </div>
      </div>

      <div className={styles.card}>
        <div
          className={styles.cardIcon}
          style={{ background: "#fefce8", color: "#ca8a04" }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
        </div>
        <div className={styles.cardBody}>
          <p className={styles.cardLabel}>System</p>
          <p className={styles.cardValueSmall}>Active</p>
        </div>
      </div>
    </div>
  );
}
