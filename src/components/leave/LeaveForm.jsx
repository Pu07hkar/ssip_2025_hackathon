import React, { useState } from "react";
import styles from "./leave.module.css";

const LeaveForm = ({ leaveTypes, onApplyLeave }) => {
  const [leaveType, setLeaveType] = useState("");
  const [leaveReason, setLeaveReason] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = () => {
    if (!leaveType || !leaveReason.trim() || !startDate || !endDate) {
      alert("Please fill all the fields.");
      return;
    }

    if (new Date(endDate) < new Date(startDate)) {
      alert("End date cannot be before start date.");
      return;
    }

    onApplyLeave({
      type: leaveType,
      reason: leaveReason.trim(),
      startDate,
      endDate,
      status: "Pending",
    });

    // Reset form fields
    setLeaveType("");
    setLeaveReason("");
    setStartDate("");
    setEndDate("");
  };

  return (
    <div className={styles.leaveForm}>
    <div className={styles.formGroup}>
      <label>Leave Type:</label>
      <select value={leaveType} onChange={(e) => setLeaveType(e.target.value)}>
        <option value="">Select Leave Type</option>
        {leaveTypes.map((type, index) => (
          <option key={index} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  
    <div className={styles.formGroup}>
      <label>Reason:</label>
      <textarea
        value={leaveReason}
        onChange={(e) => setLeaveReason(e.target.value)}
        placeholder="Enter reason for leave"
      />
    </div>
  
    <div className={styles.formGroup}>
      <label>Start Date:</label>
      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
    </div>
  
    <div className={styles.formGroup}>
      <label>End Date:</label>
      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
    </div>
  
    <button onClick={handleSubmit}>Apply Leave</button>
  </div>
  

  );
};

export default LeaveForm;
