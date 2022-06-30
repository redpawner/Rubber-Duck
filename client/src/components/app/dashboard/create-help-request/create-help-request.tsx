import React from 'react';
import './create-help-request.scss';
import { buttonsLogicStore } from '../../../../state-stores/state-stores';

export default function CreateHelp() {
  const helpDash = buttonsLogicStore((state) => state.setDashboard);
  const showChat = buttonsLogicStore((state) => state.setChat);

  return (
    <div className="dashboard-container">
      <div className="create-help-button-div">
        <h1 className="dashboard-title">Create Help Request</h1>
      </div>
      <div className="create-help-container">
        <form className="help-form">
          <label className="help-request-input">Title:</label>
          <br></br>
          <input type="text" className="help-title2" name="title" /> <br></br>
          <label className="help-request-input">Description:</label>
          <br></br>
          <textarea
            className="help-description"
            name="description"
            placeholder="Max. 50 words"
          ></textarea>
          <br></br>
          <label className="help-request-input">Tags:</label>
          <br></br>
          <input
            type="text"
            className="help-title2"
            name="tags"
            placeholder="Followed by ',' "
          />
        </form>
      </div>
      <div className="create-req-butt-cont">
        <button className="create-cancel-btn" id="create" onClick={showChat}>
          Publish
        </button>
        <button className="create-cancel-btn" id="cancel" onClick={helpDash}>
          Cancel
        </button>
      </div>
    </div>
  );
}
