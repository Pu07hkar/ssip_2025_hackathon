import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaBuilding, FaSearch, FaFilter, FaPhone, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styles from './EmployeePage.module.css';

const EmployeePage = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockEmployees = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@company.com',
        department: 'Engineering',
        profilePicture: null,
        status: 'Active',
        phone: '+1 234 567 8900',
        location: 'New York, USA',
        joiningDate: '2023-01-15',
        role: 'Senior Developer'
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@company.com',
        department: 'Design',
        profilePicture: null,
        status: 'Active',
        phone: '+1 234 567 8901',
        location: 'San Francisco, USA',
        joiningDate: '2023-02-20',
        role: 'UI/UX Designer'
      },
      {
        id: 3,
        name: 'Mike Johnson',
        email: 'mike.j@company.com',
        department: 'Marketing',
        profilePicture: null,
        status: 'Away',
        phone: '+1 234 567 8902',
        location: 'Chicago, USA',
        joiningDate: '2023-03-10',
        role: 'Marketing Manager'
      },
      {
        id: 4,
        name: 'Sarah Wilson',
        email: 'sarah.w@company.com',
        department: 'Sales',
        profilePicture: null,
        status: 'Offline',
        phone: '+1 234 567 8903',
        location: 'Boston, USA',
        joiningDate: '2023-04-05',
        role: 'Sales Representative'
      }
    ];
    setEmployees(mockEmployees);
    setLoading(false);
  }, []);

  const departments = ['all', 'Engineering', 'Design', 'Marketing', 'Sales', 'HR'];

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || employee.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const handleEmployeeClick = (employeeId) => {
    navigate(`/chat/${employeeId}`);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return '#22c55e';
      case 'away':
        return '#f59e0b';
      case 'offline':
        return '#ef4444';
      default:
        return '#64748b';
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <h1>Employees</h1>
          <div className={styles.viewToggle}>
            <button 
              className={`${styles.viewButton} ${viewMode === 'grid' ? styles.active : ''}`}
              onClick={() => setViewMode('grid')}
            >
              Grid
            </button>
            <button 
              className={`${styles.viewButton} ${viewMode === 'list' ? styles.active : ''}`}
              onClick={() => setViewMode('list')}
            >
              List
            </button>
          </div>
        </div>
        <div className={styles.searchContainer}>
          <div className={styles.searchBox}>
            <FaSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <div className={styles.filterBox}>
            <FaFilter className={styles.filterIcon} />
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className={styles.filterSelect}
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>
                  {dept.charAt(0).toUpperCase() + dept.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className={`${styles.employeeContainer} ${viewMode === 'list' ? styles.listView : ''}`}>
        {filteredEmployees.map(employee => (
          <div
            key={employee.id}
            className={styles.employeeCard}
            onClick={() => handleEmployeeClick(employee.id)}
          >
            <div className={styles.cardHeader}>
              <div className={styles.profilePicture}>
                {employee.profilePicture ? (
                  <img src={employee.profilePicture} alt={employee.name} />
                ) : (
                  <FaUser className={styles.defaultAvatar} />
                )}
              </div>
              <div className={styles.statusBadge} style={{ backgroundColor: getStatusColor(employee.status) }}>
                {employee.status}
              </div>
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.employeeName}>{employee.name}</h3>
              <div className={styles.employeeRole}>{employee.role}</div>
              <div className={styles.employeeInfo}>
                <div className={styles.infoItem}>
                  <FaEnvelope className={styles.icon} />
                  <span>{employee.email}</span>
                </div>
                <div className={styles.infoItem}>
                  <FaPhone className={styles.icon} />
                  <span>{employee.phone}</span>
                </div>
                <div className={styles.infoItem}>
                  <FaBuilding className={styles.icon} />
                  <span>{employee.department}</span>
                </div>
                <div className={styles.infoItem}>
                  <FaMapMarkerAlt className={styles.icon} />
                  <span>{employee.location}</span>
                </div>
                <div className={styles.infoItem}>
                  <FaCalendarAlt className={styles.icon} />
                  <span>Joined: {new Date(employee.joiningDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeePage; 