import React from "react";
import styles from "./LeaveRequests.module.css";

const LeaveRequests = ({ leaveRequests }) => {
  return (
    <div className={styles.leaveRequests}>
      <h3>Your Leave Requests</h3>
      {leaveRequests.length === 0 ? (
        <p>No leave requests yet.</p>
      ) : (
        <table className={styles.leaveTable}>
          <thead>
            <tr>
              <th>Leave Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((leave, index) => (
              <tr key={index}>
                <td>{leave.type}</td>
                <td>{leave.startDate}</td>
                <td>{leave.endDate}</td>
                <td className={`${styles.status} ${
                  leave.status === "Pending"
                    ? styles.pendingStatus
                    : leave.status === "Approved"
                    ? styles.approvedStatus
                    : styles.rejectedStatus
                }`}>
                  {leave.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LeaveRequests;
