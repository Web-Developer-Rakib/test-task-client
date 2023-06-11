import React from "react";
import "./GetData.css";

const GetData = ({ data }) => {
  return (
    <div className="data-box">
      <b>Name: </b>
      <span>{data.name}</span>
      <br />
      <br />
      <label htmlFor="sectors">Saved sectors:</label>
      <select multiple size="5">
        {data?.sectors?.map((sector) => (
          <option>{sector}</option>
        ))}
      </select>
    </div>
  );
};

export default GetData;
