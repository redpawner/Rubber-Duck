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
      <div className="create-help-butt-div">
        <h1 className="dashboard-title">Create Help Request</h1>
      </div>
      <div className="create-help-container">
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
          />{' '}
          <br></br>
          <label className="help-request-input" htmlFor="description">
            Description:
          </label>
          <br></br>
          <input
            type="text"
            className="help-description"
            name="description"
            id="description"
            placeholder="Max. 50 words"
          ></input>
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
