import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./EmployeePage.module.css";

const employees = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    department: "Engineering",
    profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    department: "HR",
    profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael.brown@example.com",
    department: "Marketing",
    profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: 4,
    name: "Emily Johnson",
    email: "emily.johnson@example.com",
    department: "Finance",
    profilePic: "https://randomuser.me/api/portraits/women/4.jpg",
  },
];

const EmployeePage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Employees</h2>
      <div className={styles.gridContainer}>
        {employees.map((employee) => (
          <div 
            key={employee.id} 
            className={styles.card}
            onClick={() => navigate(`/employee/${employee.id}`, { state: employee })} // ✅ Pass employee details
          >
            <img src={employee.profilePic} alt={employee.name} className={styles.profilePic} />
            <h3 className={styles.name}>{employee.name}</h3>
            <p className={styles.email}>{employee.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeePage;
