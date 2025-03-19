import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import styles from "./AttendancePieChart.module.css";

const AttendancePieChart = () => {
  const [period, setPeriod] = useState("Daily");
  const today = new Date().toLocaleString();

  const attendanceMap = {
    Daily: 95,
    Weekly: 92,
    Monthly: 90,
  };

  const attendancePercentage = attendanceMap[period];

  const data = [
    { name: "Present", value: attendancePercentage },
    { name: "Absent", value: 100 - attendancePercentage },
  ];

  const COLORS = ["#00C49F", "#FF8042"];

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3>Attendance Overview</h3>
        <select
          className={styles.dropdown}
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        >
          <option>Daily</option>
          <option>Weekly</option>
          <option>Monthly</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height={360}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={100}
            innerRadius={60}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      <div className="attendanceWorkWrapper">
        <div className="card">
          <p className={styles.todayMark}>
            Attendance marked for today: <br />
            <strong>{today}</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AttendancePieChart;