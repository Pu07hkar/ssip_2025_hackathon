import React from "react";
import styles from "./SalaryTable.module.css";

const SalaryTable = ({ salaryHistory }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Month</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {salaryHistory.map((entry, index) => (
            <tr key={index}>
              <td>{entry.month}</td>
              <td>{entry.amount}</td>
              <td>{entry.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalaryTable;
