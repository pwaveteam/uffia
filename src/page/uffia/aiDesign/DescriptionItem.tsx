// DescriptionItem.js
import React from "react";

const DescriptionItem = ({ title, options, totalRows }: any) => {
  return (
    <div style={styles.itemContainer}>
      <div style={styles.title}>{title}</div>
      <div style={styles.options as any}>
        {options.slice(0, totalRows).map((optionRow: any, rowIndex: any) => (
          <div key={rowIndex} style={styles.optionRow as any}>
            {optionRow.map((option: any, index: any) => (
              <span key={index} style={styles.option}>
                {option}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  itemContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "10px",
    borderBottom: "1px solid #ddd",
  },
  title: {
    fontWeight: "bold",
    marginRight: "20px",
    minWidth: "100px",
  },
  options: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  optionRow: {
    display: "flex",
    flexWrap: "wrap",
  },
  option: {
    marginRight: "10px",
    marginBottom: "5px",
  },
};

export default DescriptionItem;
