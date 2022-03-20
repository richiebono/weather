import React from "react";
import "./Hour.css";

export default (props) => {
  if (!props.hour) {
    return false;
  }

  let hour = props.hour[0].split(":");
  let period = hour[0] < 12 ? "am" : "pm";
  hour = `${hour[0]}:${hour[1]}`;

  if (hour === "L:undefined") {
    hour = "";
    period = "";
  }

  return (
    <div className="hour-container">
      <div className="hour-hours">
        <h1>{hour}</h1>
      </div>
      <div className="hour-period">
        <h6>{period}</h6>
      </div>
    </div>
  );
};
