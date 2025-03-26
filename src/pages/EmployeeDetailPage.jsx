import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./EmployeeDetailPage.css"; // Importing CSS for styling

const EmployeeDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const employee = location.state;

  if (!employee) {
    return <h2 className="error-message">Employee not found!</h2>;
  }

  return (
    <div className="employee-container">
      <div className="employee-card">
        {/* Profile Section */}
        <div className="profile-section">
          <img src={employee.profilePic} alt={employee.name} className="employee-image" />
          <h2 className="employee-name">{employee.name}</h2>
        </div>

        {/* Employee Details Section (Left Aligned) */}
        <div className="details-section">
          <p><strong>Department:</strong> {employee.department}</p>
          <p><strong>Email:</strong> {employee.email}</p>
        </div>

        {/* Chat Button */}
        <button className="chat-button" onClick={() => navigate(`/chat/${employee.id}`, { state: { name: employee.name } })}>
          Start Chat
        </button>
      </div>
    </div>
  );
};

export default EmployeeDetailPage;
