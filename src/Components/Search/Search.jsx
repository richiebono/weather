import React from "react";
import "./search.css";
import { FiSearch } from "react-icons/fi";

export default (props) => {
  const _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      props.onclick();
    }
  };

  return (
    <div className="search-container">
      <div className="search-search">
        <input onChange={props.change} onKeyDown={_handleKeyDown}></input>
        <button onClick={props.onclick}>
          <FiSearch className="search-icon" />
        </button>
      </div>
    </div>
  );
};
