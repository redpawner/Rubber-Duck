import { useState } from 'react';
import './create-help-request.scss';
import {
  buttonsLogicStore,
  userStore,
} from '../../../../state-stores/state-stores';
import { useMutation } from '@apollo/client';
import { UPDATE_HR } from '../../../../graphql/queries-mutations';

function CreateHelp() {
  const helpDash = buttonsLogicStore((state) => state.setDashboard);
  const userState = userStore((state) => state);

  // SHOWCHAT CAN BE REMOVED ONCE ROUTER LOGIC IN PLACE:
  const showChat = buttonsLogicStore((state) => state.setChat);

  const [updateHR] = useMutation(UPDATE_HR);
  const [formValue, setFormValue] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const handleChange = (e: any) => {
    setFormValue(e.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setTags((tags) => [...tags, formValue]);
  };

  const publish = async (event: any) => {
    event.preventDefault();
    // GENERATE UNIQUE CHAT ROOM LOGIC HERE
    const title: string = event.target.title.value;
    console.log(title);
    const description: string = event.target.title.value;
    console.log(description);
    // GATHER DATA AND SEND HELP REQUEST TO DATABASE LOGIC HERE:

    // const helpRequest = {
    //   username: userState.username,
    //   title: event.target.title.value,
    //   description: event.target.description.value,
    //   hr_languages: tags,
    //   time_created: Date.now(),
    //   url: 'filler url',
    // };

    // await updateHR({
    //   variables: {
    //     filter: {
    //       uid: userState.uid,
    //     },
    //     record: {
    //       needHelp: true,
    //       help_request: helpRequest,
    //     },
    //   },
    // });
    // REPLACE showChat() WITH ROUTER/URL LOGIC TO GO TO CHATROOM HERE:

    // showChat();
  };

  return (
    <div className="dashboard-container">
      <div className="helper">
        <div className="create-help-button-div">
          <h1 className="dashboard-title">Create Help Request</h1>
        </div>
      </div>

      <div className="middle-section-cont">
        {/* <div className="create-help-container"> */}
        <form className="help-form" onSubmit={publish}>
          <label className="help-request-input" htmlFor="title">
            Title:
          </label>
          <br></br>
          <input
            type="text"
            className="help-title2"
            name="title"
            id="title"
            maxLength={40}
            placeholder="Max 40 characters..."
            required
          />{' '}
          <br></br>
          <label className="help-request-input" htmlFor="description">
            Description:
          </label>
          <br></br>
          <textarea
            type="text"
            className="help-description"
            name="description"
            id="description"
            placeholder="Max. 500 characters"
            maxLength={500}
            required
          ></textarea>
          <br></br>
          <label className="help-request-input">Tags:</label>
          <br></br>
          <input
            type="text"
            onChange={handleChange}
            className="help-title2"
            name="tags"
            placeholder="Javascript"
          />
          <button />
          {tags}
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
          <button className="create-cancel-btn" id="cancel" onClick={helpDash}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateHelp;
