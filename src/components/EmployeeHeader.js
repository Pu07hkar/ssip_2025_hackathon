import React from "react";
// import employeeLogo from "../../assets/employee-logo.png";

const EmployeeHeader = () => {
  return (
    <header style={styles.header}>
      <img src={employeeLogo} alt="Employee Logo" style={styles.logo} />
      <h1>Employee Dashboard</h1>
    </header>
  );
};

const styles = {
  header: { display: "flex", alignItems: "center", padding: "10px" },
  logo: { width: "50px", marginRight: "10px" },
};

export default EmployeeHeader;
