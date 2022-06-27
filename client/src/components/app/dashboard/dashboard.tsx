import React from "react";
import "./dashboard.scss";
import { useStore } from "../../../state-stores/state-stores";
import Help from "./help-request/help-request";

export default function Dashboard() {
  const helpDash = useStore((state) => state.toggleShow);

  return (
    <div className="dashboard-container">
      <div className="create-help-butt-div">
        <h1 className="dashboard-title">Help Requests</h1>
        <button className="create-help-butt" onClick={helpDash}>
          <i className="fa fa-plus"></i> &nbsp; Create
        </button>
      </div>
      <div className="sort-butt-container">
        <button className="sort-button">
          Sort by &nbsp; <i className="arrow down"></i>
        </button>
      </div>
      <ul className="help-list">
        <li>
          <Help />
        </li>
        <li>
          <Help />
        </li>
        <li>
          <Help />
        </li>
        <li>
          <Help />
        </li>
        <li>
          <Help />
        </li>
        <li>
          <Help />
        </li>
        <li>
          <Help />
        </li>
        <li>
          <Help />
        </li>
      </ul>
    </div>
  );
}
