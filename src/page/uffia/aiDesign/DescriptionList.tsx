// DescriptionList.js
import React from "react";
import DescriptionItem from "./DescriptionItem";

const DescriptionList = ({ data }: any) => {
  return (
    <div style={styles.listContainer}>
      {data.map((item: any, index: any) => (
        <DescriptionItem
          key={index}
          title={item.title}
          options={item.options}
          totalRows={item.totalRows}
        />
      ))}
    </div>
  );
};

const styles = {
  listContainer: {
    maxWidth: "800px",
    margin: "0 auto",
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
  },
};

export default DescriptionList;
