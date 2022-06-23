import React from "react";
import "./dashboard.css"

export default function Dashboard () {
  return (
    <div className="dashboard-container">
      <div className="create-help-butt-div">
        <button className="create-help-butt"> <a href="https://www.youtube.com/watch?v=4vvBAONkYwI">CREATE HELP REQUEST</a></button>
      </div>
        <ul className="help-list">
          <li>HELP ME</li>
          <li> HELP ME</li>
        </ul>
    </div>
  )
}