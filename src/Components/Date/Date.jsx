import React from "react";
import "./Date.css";

export default (props) => {
  let date = props.date;

  if (!date) {
    return null;
  }
  date = date.split(",").join("");
  date = date.split(" ");

  return (
    <div className="date-container">
      <p>
        {date[0]}, {date[2]} {date[1]} {date[3]}
      </p>
    </div>
  );
};
