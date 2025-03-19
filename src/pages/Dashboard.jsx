import React from "react";
// import SearchAndFilter from "../components/dashboard/SearchAndFilter";
import QuickActions from "../components/dashboard/QuickActions";
// import AttendanceTable from "../components/attendance/AttendanceTable";

// New Component
import styles from "./Dashboard.module.css";
import ProjectSummary from "../components/dashboard/ProjectSummary";
import AttendancePieChart from "../components/dashboard/AttendancePieChart";
import WorkingHoursPieChart from "../components/dashboard/WorkingHoursPieChart";


const Dashboard = () => {
  // const [searchTerm, setSearchTerm] = useState("");
  // const [filters, setFilters] = useState({});

  // const handleSearch = (term) => {
  //   setSearchTerm(term);
  //   console.log("Search Term:", term);
  // };

  // const handleFilter = (filterData) => {
  //   setFilters(filterData);
  //   console.log("Filters Applied:", filterData);
  // };

  return (
    <div className={styles.dashboard}>
      {/* Dashboard Header */}
      <header className={styles.dashboardHeader}>
        <h1 className={styles.dashboardTitle}>Dashboard Overview</h1>
      </header>

      {/* Search & Filter */}
      {/* <SearchAndFilter onSearch={handleSearch} onFilter={handleFilter} /> */}

      {/* Work Log & Projects (New Section) */}
      <ProjectSummary />
      <div className={styles.pieChartContainer}>
  <AttendancePieChart />
  <WorkingHoursPieChart />
</div>

      
      {/* Recent Attendance Table */}
      {/* <section className={styles.attendanceSection}>
        <h2 className={styles.sectionTitle}>Recent Attendance</h2> */}
        {/* <AttendanceTable searchTerm={searchTerm} filters={filters} /> */}
      {/* </section> */}

      {/* Quick Actions */}
      <QuickActions />
    </div>
  );
};

export default Dashboard;

