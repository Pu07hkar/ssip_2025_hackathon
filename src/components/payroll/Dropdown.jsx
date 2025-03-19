import React from "react";
import styles from "./Dropdown.module.css";

const Dropdown = ({ label, options, selectedValue, setSelectedValue }) => {
  return (
    <select
      className={styles.dropdown}
      value={selectedValue}
      onChange={(e) => setSelectedValue(e.target.value)}
    >
      <option value="">{label}</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
