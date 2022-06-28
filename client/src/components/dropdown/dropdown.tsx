import React from "react";
import "./dropdown.scss";
export default function Dropdown() {
  function unfold() {}
  return (
    <div className="dropdown-container">
      <div className="dropdown-select-btn" onClick={unfold}>
        <span className="btn-txt">Select technology</span>
        <span className="arrow-dwn">
          <i className="fa-solid fa-chevron-down"></i>
        </span>
      </div>
      <ul className="list-items">
        <li className="item">
          <span className="checkbox">
            <i className="fa-solid fa-check check-icon"></i>
          </span>
          <span className="item-text">HTML/CSS</span>
        </li>
        <li className="item">
          <span className="checkbox">
            <i className="fa-solid fa-check check-icon"></i>
          </span>
          <span className="item-text">JavaScript</span>
        </li>
        <li className="item">
          <span className="checkbox">
            <i className="fa-solid fa-check check-icon"></i>
          </span>
          <span className="item-text">Python</span>
        </li>
      </ul>
    </div>
  );
}
