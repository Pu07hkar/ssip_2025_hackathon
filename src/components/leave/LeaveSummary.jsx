import React from "react";
import styles from "./LeaveSummary.module.css";

const LeaveSummary = ({ leaveCounts }) => {
  return (
    <div className={styles.leaveSummary}>
      {Object.entries(leaveCounts).map(([type, count]) => (
        <div
          key={type}
          className={`${styles.summaryCard} ${
            type.includes("Casual") ? styles.casual :
            type.includes("Sick") ? styles.sick :
            styles.earned
          }`}
        >
          <span className={styles.leaveTitle}>{type}</span>
          <span className={styles.leaveCount}>{count} Left</span>
        </div>
      ))}
    </div>
  );
};

export default LeaveSummary;
