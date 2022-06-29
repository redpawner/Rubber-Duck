import React from "react";
import { useState, useEffect } from "react";
import "./dashboard.scss";
import { buttonsLogicStore } from "../../../state-stores/state-stores";
import Help from "./help-request/help-request";

export default function Dashboard() {
  const helpDash = buttonsLogicStore((state) => state.setHelp);

  const [formValue, setFormValue] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    console.log(formValue);
  }, [formValue]);

  const handleChange = (e: any) => {
    setFormValue(e.target.value);
  };

  const handleClick = () => {
    setTags((tags) => [...tags, formValue]);
  };

  return (
    <div className="dashboard-container">
      <div className="flexcolumn">
        <div className="create-help-butt-div">
          <h1 className="dashboard-title">Help Requests</h1>
          <button className="create-help-butt" onClick={helpDash}>
            <i className="fa fa-plus"></i> &nbsp; Create
          </button>
        </div>
        <div className="search-me-officer">
          <form
            className="search-field"
            onSubmit={(e) => {
              e.preventDefault(); //this stops it loading URL with the name value
            }}
          >
            <input
              type="text"
              onChange={handleChange}
              name="search"
              autoComplete="off"
              placeholder="Filter..."
            />
            <button onClick={handleClick}>Bread</button>
          </form>
          <ul className="search-tags">
            <li>{tags + ","}</li>
          </ul>
        </div>
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
