import React, { useState, useRef, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import "jspdf-autotable";
import styles from "./Payroll.module.css";

const Payroll = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [showPayslip, setShowPayslip] = useState(false);
  const [isCurrentMonth, setIsCurrentMonth] = useState("");

  const payslipRef = useRef();

  // Get the current month and year
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("default", { month: "long" });
  const currentYear = currentDate.getFullYear().toString();

  const handleMonthChange = (e) => setSelectedMonth(e.target.value);
  const handleYearChange = (e) => setSelectedYear(e.target.value);

  useEffect(() => {
    if (selectedMonth && selectedYear) {
      const selectedDate = new Date(`${selectedMonth} 1, ${selectedYear}`);
      const currentDate = new Date();
  
      if (selectedDate >= currentDate) {
        setIsCurrentMonth(true);
        setShowPayslip(false);
      } else {
        setIsCurrentMonth(false);
      }
    }
  }, [selectedMonth, selectedYear]);
  

  const generatePayslip = () => {
    if (selectedMonth && selectedYear && !isCurrentMonth) {
      setShowPayslip(true);
    } else {
      setShowPayslip(false);
    }
  };

  // Handle PDF Download with jsPDF
  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    if (typeof doc.autoTable !== "function") {
      console.error("⚠️ autoTable is not recognized. Check your imports.");
      return;
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Payslip", 90, 20);
    doc.setFontSize(12);
    doc.text("Zoonoodle Inc", 80, 30);
    doc.text("21023 Pearson Point Road, Gateway Avenue", 50, 40);

    // Employee details
    doc.setFont("helvetica", "normal");
    doc.text(`Employee Name: Sally Harley`, 15, 55);
    doc.text(`Date of Joining: 2018-06-23`, 15, 65);
    doc.text(`Designation: Marketing Executive`, 15, 75);
    doc.text(`Department: Marketing`, 15, 85);
    doc.text(`Pay Period: ${selectedMonth} ${selectedYear}`, 15, 95);
    doc.text(`Worked Days: 26`, 15, 105);

    // Salary details table
    doc.autoTable({
      startY: 115,
      head: [["Earnings", "Amount", "Deductions", "Amount"]],
      body: [
        ["Basic", "10000", "Provident Fund", "1200"],
        ["Incentive Pay", "1000", "Professional Tax", "500"],
        ["House Rent Allowance", "400", "Loan", "400"],
        ["Meal Allowance", "200", "", ""],
        ["Total Earnings", "11600", "Total Deductions", "2100"],
        ["Net Pay", "9500", "", ""],
      ],
      theme: "grid",
    });
    

    // Net Pay in words
    doc.text(`Net Pay: 9500`, 15, doc.lastAutoTable.finalY + 10);
    doc.text(`In Words: Nine Thousand Five Hundred`, 15, doc.lastAutoTable.finalY + 20);

    // Signatures
    doc.text("Employer Signature: __________", 15, doc.lastAutoTable.finalY + 40);
    doc.text("Employee Signature: __________", 120, doc.lastAutoTable.finalY + 40);

    doc.text("This is a system-generated payslip.", 15, doc.lastAutoTable.finalY + 60);

    doc.save(`Payslip_${selectedMonth}_${selectedYear}.pdf`);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Payroll</h2>

      <label className={styles.subtitle}>Select Month & Year</label>
      <div className={styles.selectionContainer}>
        <select value={selectedMonth} onChange={handleMonthChange} className={styles.dropdown}>
          <option value="">Month</option>
          {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map(month => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>

        <select value={selectedYear} onChange={handleYearChange} className={styles.dropdown}>
          <option value="">Year</option>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
        </select>

        <button onClick={generatePayslip} className={styles.generatePayslipBtn}>Generate Payslip</button>
      </div>

      {isCurrentMonth && <p className={styles.warning}>Payslip for the current month is not available yet.</p>}

      {showPayslip && (
        <div ref={payslipRef} className={styles.payslipContainer}>
          <h3 className={styles.payslipTitle}>Payslip</h3>
          <div className={styles.payslip}>
            <div className={styles.payslipHeader}>
              <p><strong>Hackathon Startup</strong></p>
              <p>this is a address</p>
            </div>

            <div className={styles.payslipDetails}>
              <p><strong>Employee Name:</strong> Jhnavi Sharma</p>
              <p><strong>Date of Joining:</strong> 2024-01-02</p>
              <p><strong>Designation:</strong> Software Developer</p>
              <p><strong>Department:</strong> Web Develeopment</p>
              <p><strong>Pay Period:</strong> {selectedMonth} {selectedYear}</p>
              <p><strong>Worked Days:</strong> 26</p>
            </div>

            <button onClick={handleDownloadPDF} className={styles.downloadBtn}>📥 Download Payslip</button>
          </div>
        </div>
      )}

      <h3 className={styles.subtitle}>Recent Salary History</h3>
      <table className={styles.salaryTable}>
        <thead>
          <tr>
            <th>Month</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>February 2025</td>
            <td>$9500</td>
            <td>5th March</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Payroll;

