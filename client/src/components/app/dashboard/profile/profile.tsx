import React from "react";
import "./profile.scss";
import { buttonsLogicStore } from "../../../../state-stores/state-stores";

export default function Profile() {
  const help = buttonsLogicStore((state) => state.setDashboard);

  return (
    <div className="dashboard-container">
      <div className="create-help-butt-div">
        <h1 className="dashboard-title">Profile</h1>
      </div>
      <button className="save-profile-button" onClick={help}>
        SAVE
      </button>
    </div>
  );
}
