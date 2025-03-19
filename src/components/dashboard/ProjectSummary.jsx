import React from "react";
import styles from "./ProjectSummary.module.css";

const ProjectSummary = () => {
  return (
    <div className={styles.projectSummary}>
      <h2 className={styles.heading}>Projects</h2>
      <div className={styles.cardContainer}>
        <div className={styles.bigCircleCard}>
          <div className={styles.circle}>
            <h1>50</h1>
            <p>Projects Assigned</p>
          </div>
        </div>
        <div className={styles.detailsGrid}>
          <div className={`${styles.detailCard} ${styles.completed}`}>
            <p>Projects Completed</p>
            <h3>42</h3>
          </div>
          <div className={`${styles.detailCard} ${styles.inProcess}`}>
            <p>Projects In Process</p>
            <h3>05</h3>
          </div>
          <div className={`${styles.detailCard} ${styles.pending}`}>
            <p>Projects Pending</p>
            <h3>03</h3>
          </div>
          <div className={`${styles.detailCard} ${styles.teamsAssigned}`}>
            <p>Teams Assigned</p>
            <h3>06</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSummary;
