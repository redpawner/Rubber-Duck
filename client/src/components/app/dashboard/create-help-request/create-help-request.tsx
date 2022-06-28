import React from "react";
import "./create-help-request.scss";
import { useStore } from "../../../../state-stores/state-stores";

export default function CreateHelp() {
  const helpDash = useStore((state) => state.toggleShow);

  return (
    <div className="dashboard-container">
      <div className="create-help-butt-div">
        <h1 className="dashboard-title">Create Help Request</h1>
        {/* <button className="create-help-butt" onClick={helpDash}>
      <i className="fa fa-plus"></i> &nbsp; Create
    </button> */}
      </div>
      <form className="help-container">
        <p className="help-request-input">Title:</p>
        <input type="text" className="help-title" name="title" />
        <input type="password" className="login-textBox" name="password" />
      </form>
      <div className="create-req-butt-cont">
        <button className="create-cancel-btn" id="create">
          Publish
        </button>
        <button className="create-cancel-btn" id="cancel" onClick={helpDash}>
          Cancel
        </button>
      </div>
    </div>
  );
}
