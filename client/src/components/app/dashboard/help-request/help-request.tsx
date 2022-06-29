import React from "react";
import "./help-request.scss";
import { buttonsLogicStore } from "../../../../state-stores/state-stores";
export default function Help() {
  const showChat = buttonsLogicStore((state) => state.setChat);
  return (
    <div className="help-container">
      <h1 className="help-title">Daddy Issues Help!</h1>
      <p className="help-details">27.06.22 @Robert</p>
      <div className="bottom-details">
        <a id="tags">CSS</a>
        <div className="butts-cont">
          <button className="help-button">Info</button>
          <button className="help-button" onClick={showChat}>
            Help
          </button>
        </div>
      </div>
    </div>
  );
}
