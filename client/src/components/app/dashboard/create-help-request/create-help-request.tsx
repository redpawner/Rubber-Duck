import React from 'react';
import './create-help-request.scss';
import { buttonsLogicStore } from '../../../../state-stores/state-stores';
import { userStore } from '../../../../state-stores/state-stores';

function string_to_slug(str: any) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
  var to = 'aaaaeeeeiiiioooouuuunc------';
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return str;
}

function CreateHelp() {
  const description = userStore((state) => state.help_request.description);
  const helpDash = buttonsLogicStore((state) => state.setDashboard);

  // CAN BE REMOVED ONCE ROUTER LOGIC IN PLACE:
  const showChat = buttonsLogicStore((state) => state.setChat);

  const publish = (event: any) => {
    // GENERATE UNIQUE CHAT ROOM LOGIC HERE
    const slugDescription = string_to_slug(description);
    const roomID = slugDescription;
    window.location.hash = roomID;

    // GATHER DATA AND SEND HELP REQUEST TO DATABASE LOGIC HERE:

    // REPLACE showChat() WITH ROUTER/URL LOGIC TO GO TO CHATROOM HERE:

    // location.hash = roomID;
    showChat();
  };

  return (
    <div className="dashboard-container">
      <div className="create-help-butt-div">
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
        <button className="create-cancel-btn" id="create" onClick={publish}>
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
