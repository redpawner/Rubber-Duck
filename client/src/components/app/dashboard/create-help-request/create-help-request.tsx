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
import Popup from 'reactjs-popup';

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
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
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
    <div className="dashboard-container1">
      <div className="helper">
        <div className="create-help-button-div">
          <h1 className="dashboard-title">Create Help Request</h1>
        </div>
        <div className="qn" onClick={() => setOpen((o) => !o)}>
          i
        </div>
        <Popup open={open} closeOnDocumentClick onClose={closeModal}>
          <div className="guide-box">
            <div id="guide-box-title">Guideline</div>
            <div>

              <div>
                <div>Write a title that summarizes the specific problem</div>
                <div>
                  <div>1</div>
                  <div>1.1</div>
                </div>
              </div>

            </div>
          </div>
        </Popup>
      </div>
      <div className="middle-section-cont">
        <form className="help-form" onSubmit={publish}>
          <div className="container-height">
            <label className="help-request-input" htmlFor="title">
              Title:
            </label>
            <input
              type="text"
              className="help-title1"
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
              className="help-title3"
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
            <ul className="search-tags">
              <div className="tags-display-box">
                {tags.sort().map((tag) => {
                  return <Tag name={tag} onClick={deselect} />;
                })}
              </div>
            </ul>
          </div>
          <button className="back-btn" id="cancel" onClick={helpDash}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateHelp;
