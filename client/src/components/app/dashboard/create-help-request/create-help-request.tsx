import { useState } from 'react';
import './create-help-request.scss';
import {
  buttonsLogicStore,
  userStore,
} from '../../../../state-stores/state-stores';
import { useMutation } from '@apollo/client';
import { UPDATE_HR } from '../../../../graphql/queries-mutations';
import langTags from '../../../../utils/tags';
import Tag from '../tag/tag';

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
  const helpDash = buttonsLogicStore((state) => state.setDashboard);
  const userState = userStore((state) => state);
  const [showDrop, setShowDrop] = useState(false);

  // SHOWCHAT CAN BE REMOVED ONCE ROUTER LOGIC IN PLACE:
  const showChat = buttonsLogicStore((state) => state.setChat);

  const [updateHR] = useMutation(UPDATE_HR);
  const [formValue, setFormValue] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const handleChange = (e: any) => {
    setFormValue(e.target.value);
  };

  const publish = async (event: any) => {
    event.preventDefault();
    setShowDrop(false);
    const description = event.target.description.value;
    // GENERATE UNIQUE CHAT ROOM LOGIC HERE
    const slugDescription = string_to_slug(description);
    const roomID = slugDescription;
    window.history.replaceState(null, '', '/chatroom');
    window.location.hash = roomID;

    let sandbox = 'https://codesandbox.io/';

    if (event.target.sandbox.value > 0) {
      sandbox = event.target.sandbox.value;
    }

    const helpRequest = {
      username: userState.username,
      title: event.target.title.value,
      description: event.target.description.value,
      hr_languages: tags,
      time_created: Date.now(),
      url: roomID,
      sandbox: sandbox,
    };

    await updateHR({
      variables: {
        filter: {
          uid: userState.uid,
        },
        record: {
          needHelp: true,
          help_request: helpRequest,
        },
      },
    });

    showChat();
  };

  const handleClick = (e: any) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    if (tags.includes(value)) {
      return;
    }
    setTags((tags) => [...tags, value]);
  };

  const mapLang = langTags
    .filter((tag) => tag.includes(formValue))
    .map((tag) => {
      return (
        <div className="searchTile" onClick={handleClick}>
          {tag}
        </div>
      );
    });

  const deselect = (e: any) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    setTags((tags) => tags.filter((tag) => tag !== value));
  };

  return (
    <div className="dashboard-container">
      <div className="helper">
        <div className="create-help-button-div">
          <h1 className="dashboard-title">Create Help Request</h1>
        </div>
      </div>
      <div className="middle-section-cont">
        <form className="help-form" onSubmit={publish}>
          <div className="container-height">
            <label className="help-request-input" htmlFor="title">
              Title:
            </label>
            <input
              type="text"
              className="help-title2"
              name="title"
              id="title"
              maxLength={40}
              placeholder="Max 40 characters..."
              required
            />{' '}
            <label className="help-request-input" htmlFor="description">
              Description:
            </label>
            <textarea
              className="help-description"
              name="description"
              id="description"
              placeholder="Max. 500 characters"
              maxLength={500}
              required
            ></textarea>
            <label className="help-request-input" htmlFor="tags">
              Tags:
            </label>
            <div className="dropdown-box">
              <input
                type="text"
                onChange={handleChange}
                name="tags"
                id="tags"
                className="help-title2"
                autoComplete="off"
                placeholder="Filter..."
              />
              <div
                className={
                  showDrop ? 'dropdown-context' : 'dropdown-context-none'
                }
              >
                {mapLang}
              </div>
            </div>
            <label className="help-request-input" htmlFor="sandbox">
              Sandbox link:
            </label>
            <input
              type="text"
              className="help-title2"
              name="sandbox"
              id="sandbox"
              placeholder="https://codesandbox.io/..."
            />
          </div>
          <button className="create-cancel-btn" id="submit">
            Publish
          </button>
        </form>
        <div className="rules-container">
          <div className="container-height2">
            <h2 className="readme-title">Rules and guidance:</h2>
            <ul className="rules-list">
              <li className="rules-element">
                1st RULE: You do not talk about FIGHT CLUB.
              </li>
              <li className="rules-element">
                2nd RULE: You DO NOT talk about FIGHT CLUB.
              </li>
              <li className="rules-element">
                3rd RULE: If someone says "stop" or goes limp, taps out the
                fight is over.
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
            <ul className="search-tags">
              {tags.map((tag) => {
                return (
                  <div>
                    <Tag name={tag} onClick={deselect} />
                  </div>
                );
              })}
            </ul>
          </div>
          <button className="create-cancel-btn" id="cancel" onClick={helpDash}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateHelp;
