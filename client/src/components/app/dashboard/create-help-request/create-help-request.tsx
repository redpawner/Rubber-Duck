import React from 'react';
import './create-help-request.scss';
import { buttonsLogicStore } from '../../../../state-stores/state-stores';

function CreateHelp() {
  const helpDash = buttonsLogicStore((state) => state.setDashboard);
  const showChat = buttonsLogicStore((state) => state.setChat);

  return (
    <div className="dashboard-container">
      <div className="helper">
        <div className="create-help-button-div">
          <h1 className="dashboard-title">Create Help Request</h1>
        </div>
      </div>
      <div className="middle-section-cont">
        {/* <div className="create-help-container"> */}
        <form className="help-form">
          <label className="help-request-input">Title:</label>
          <br></br>
          <input
            type="text"
            className="help-title2"
            name="title"
            maxLength={40}
            placeholder="Max 40 characters..."
            required
          />
          <br></br>
          <label className="help-request-input">Description:</label>
          <br></br>
          <textarea
            className="help-description"
            name="description"
            placeholder="Max. 500 characters"
            maxLength={500}
            required
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
        {/* </div> */}
        <div className="rules-container">
          <h1 className="readme-title">Before you publish:</h1>
          <ul className="rules-list">
            <li className="rules-element">
              1st RULE: You do not talk about FIGHT CLUB.
            </li>
            <li className="rules-element">
              2nd RULE: You DO NOT talk about FIGHT CLUB.
            </li>
            <li className="rules-element">
              3rd RULE: If someone says "stop" or goes limp, taps out the fight
              is over.
            </li>
            <li className="rules-element">
              4th RULE: Only two guys to a fight.
            </li>
            <li className="rules-element">5th RULE: One fight at a time.</li>
            <li className="rules-element">
              7th RULE: Fights will go on as long as they have to.
            </li>
            <li className="rules-element">
              8th RULE: If this is your first night at FIGHT CLUB, you HAVE to
              fight.
            </li>
          </ul>
        </div>
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

export default CreateHelp;
