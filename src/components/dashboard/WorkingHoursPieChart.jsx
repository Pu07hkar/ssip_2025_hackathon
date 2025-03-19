import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styles from "./WorkingHoursPieChart.module.css";

const dataMap = {
  daily: { worked: 7, total: 8 },
  weekly: { worked: 34, total: 40 },
  monthly: { worked: 150, total: 160 },
  yearly: { worked: 1720, total: 1920 },
};

const COLORS = ["#4CAF50", "#f44336"];

const WorkingHours = () => {
  const [period, setPeriod] = useState("weekly");

  const worked = dataMap[period].worked;
  const total = dataMap[period].total;
  const pending = total - worked;

  const data = [
    { name: "Worked", value: worked },
    { name: "Pending", value: pending },
  ];

  return (
    <div className={styles.workingCard}>
      <div className={styles.header}>
        <h3>Working Hours</h3>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className={styles.dropdown}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      <div className={styles.chartBox}>
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
          
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className={styles.legend}>
        <span style={{ color: "#4CAF50" }}>● Worked</span> &nbsp;
        <span style={{ color: "#f44336" }}>● Pending</span>
      </div>

      <div className={styles.textBox}>
        <p>
          Worked: <strong>{worked} hours</strong> out of <strong>{total} hrs</strong>
        </p>
        <p>This {period}'s data updated</p>
      </div>
    </div>
  );
};

export default WorkingHours;
