import React from "react";
import "./dashboard.scss";
import useStore from "../../../state-stores/state-stores";

export default function Dashboard() {
  const helpDash = useStore((state) => state.toggleShow);

  return (
    <div className="dashboard-container">
      <div className="create-help-butt-div">
        <button className="help-requests-butt" onClick={helpDash}>
          Help Requests
        </button>
        <button className="create-help-butt" onClick={helpDash}>
          {" "}
          <a href="https://www.youtube.com/watch?v=4vvBAONkYwI">
            CREATE HELP REQUEST
          </a>
        </button>
      </div>
      <ul className="help-list">
        <li>HELP ME</li>
        <li> HELP ME</li>
      </ul>
    </div>
  );
}
