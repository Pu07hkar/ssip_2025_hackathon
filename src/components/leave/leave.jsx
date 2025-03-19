import React, { useState } from "react";
import LeaveSummary from "./LeaveSummary";
import LeaveForm from "./LeaveForm";
import LeaveRequests from "./LeaveRequests";
import styles from "./leave.module.css";

const Leave = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  
  // Initial leave counts
  const [leaveCounts, setLeaveCounts] = useState({
    "Casual Leave (CL)": 10,
    "Sick Leave (SL)": 10,
    "Earned Leave (EL)": 10,
  });

  const handleApplyLeave = (newLeaveRequest) => {
    const { type } = newLeaveRequest;

    if (leaveCounts[type] > 0) {
      setLeaveRequests([...leaveRequests, newLeaveRequest]);
      setLeaveCounts((prevCounts) => ({
        ...prevCounts,
        [type]: prevCounts[type] - 1,
      }));
    } else {
      alert(`${type} are exhausted!`);
    }
  };

  return (
    <div className={styles.leaveContainer}>
      <h2>Leave Management</h2>
      <LeaveSummary leaveCounts={leaveCounts} />
      <LeaveForm leaveTypes={Object.keys(leaveCounts)} onApplyLeave={handleApplyLeave} />
      <LeaveRequests leaveRequests={leaveRequests} />
    </div>
  );
};

export default Leave;









