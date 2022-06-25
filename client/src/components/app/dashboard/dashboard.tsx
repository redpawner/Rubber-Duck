import React from "react";
import "./dashboard.scss";
import { useStore } from "../../../state-stores/state-stores";

export default function Dashboard() {
  const helpDash = useStore((state) => state.toggleShow);

  return (
    <div className="dashboard-container">
      <div className="create-help-butt-div">
        <h1 className="dashboard-title">Dashboard</h1>
        <button className="create-help-butt" onClick={helpDash}>
          Create Help Request
        </button>
      </div>
      <ul className="help-list">
        <li>HELP ME</li>
        <li> HELP ME</li>
      </ul>
    </div>
  );
}
