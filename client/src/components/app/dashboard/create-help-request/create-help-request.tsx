import React, { useState } from 'react';
import './create-help-request.scss';
import { userStore } from '../../../../state-stores/state-stores';
import { useMutation } from '@apollo/client';
import { useNavigate, Link } from 'react-router-dom';
import { UPDATE_HR } from '../../../../graphql/queries-mutations';
import langTags from '../../../../utils/tags';
import Tag from '../tag/tag';
import Popup from 'reactjs-popup';

function string_to_slug(str: any) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  let from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
  let to = 'aaaaeeeeiiiioooouuuunc------';
  for (let i = 0, l = from.length; i < l; i++) {
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

  const userState = userStore((state) => state);
  const [showDrop, setShowDrop] = useState(false);
  const navigate = useNavigate();

  // SHOWCHAT CAN BE REMOVED ONCE ROUTER LOGIC IN PLACE:

  const [updateHR] = useMutation(UPDATE_HR);
  const [formValue, setFormValue] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  const handleChange = (e: any) => {
    setFormValue(e.target.value);
  };

  const publish = async (event: any) => {
    event.preventDefault();

    if (tags.length === 0) {
      setMessage('Please add tags');
      return;
    }
    setShowDrop(false);
    const description = event.target.description.value;

    const slugDescription = string_to_slug(description);
    const roomID = slugDescription;

    let sandbox = 'https://codesandbox.io/';

    if (event.target.sandbox.value) {
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

    console.log(helpRequest);

    try {
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
    } catch (error) {
      console.log(error);
    }

    navigate(`/chatroom/${roomID}`);
  };

  const handleClick = (e: any) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    if (tags.includes(value)) {
      return;
    }
    if (tags.length < 3) {
      setTags((tags) => [...tags, value]);
    }
  };

  const mapLang = langTags
    .filter((tag) => tag.toLowerCase().includes(formValue.toLowerCase()))
    .map((tag, index) => {
      return (
        <div className="searchTile" onClick={handleClick} key={index}>
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
        <div className="main-helper-box">
          <div className="create-help-button-div">
            <div className="create-help-button-div">
              <h1 className="dashboard-title" id="create-id">
                Create Help Request
              </h1>
            </div>
          </div>

          <div className="rules-container">
            <div className="qn">
              <Link to="/dashboard">
                <button className="back-btn">Back</button>
              </Link>
              <div className="qn" onClick={() => setOpen((o) => !o)}>
                <img
                  className="info"
                  src={require('../../../../Images/icon-info.png')}
                  alt="info"
                ></img>
              </div>
            </div>
          </div>
        </div>
        <Popup open={open} closeOnDocumentClick onClose={closeModal}>
          <div className="guide-box">
            <div id="guide-box-headline">
              <h1>When you're stuck, Rubber Duck!</h1>
              <h2 className="h2title">
                To improve your chances of getting help, please follow the
                advice below:
              </h2>
            </div>
            <div>
              <ol>
                <div className="guide-outerbox">
                  <li className="guide-box-title">
                    Write a title that summarises the specific problem -
                  </li>
                  <div>
                    <div className="guide-box-point">
                      Spelling, grammar and punctuation are important! An easy
                      to read title is more likely to be selected.
                    </div>
                    <div className="guide-box-point">
                      If you're having trouble summarising the problem, write
                      the title last - sometimes writing the rest of the
                      question first can make it easier to describe the problem.
                    </div>
                  </div>
                </div>

                <div className="guide-outerbox">
                  <li className="guide-box-title">
                    Describe the problem clearly -
                  </li>

                  <div>
                    <div className="guide-box-point">
                      In the body of your question, start by expanding on the
                      summary you put in the title.
                    </div>
                    <div className="guide-box-point">
                      <i>Explain</i> how you encountered the problem you are
                      trying to solve, and any difficulties that have prevented
                      you from solving it yourself.
                    </div>
                  </div>
                </div>

                <div className="guide-outerbox">
                  <li className="guide-box-title">Select relevant tags -</li>

                  <div>
                    <div className="guide-box-point">
                      Try to include a tag for the language, library, software
                      or technology your question relates to. You can select up
                      to three tags.
                    </div>
                    <div className="guide-box-point">
                      If the tag you want is not available, choose the closest
                      option and then make a reference to the correct option in
                      the title and description.
                    </div>
                  </div>
                </div>

                <div className="guide-outerbox">
                  <li className="guide-box-title">
                    Proof-read before posting -
                  </li>
                  <div>
                    <div className="guide-box-point">
                      Now that you're ready to ask your question, take a deep
                      breath and read through it from start to finish.
                      <i>Pretend </i>
                      you're seeing it for the first time and ask yourself if it
                      makes sense.
                    </div>
                    <div className="guide-box-point">
                      Add any details you missed and read through it again. Now
                      is a good time to make sure that your title still
                      describes the problem!{' '}
                    </div>
                  </div>
                </div>
                <div className="guide-outerbox">
                  <li className="guide-box-title">Pass it on! </li>
                  <div>
                    <div className="guide-box-point">
                      Pass it on by helping someone with their help request!{' '}
                    </div>
                  </div>
                </div>

                <div className="thankyou">
                  <h2>Thank you and quack quack!</h2>
                </div>
              </ol>
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
              minLength={10}
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
              minLength={10}
              required
            ></textarea>
            <label className="help-request-input" htmlFor="tags">
              Tags:
            </label>
            <div className="dropdown-tags">
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
                {message}
              </div>
              <div className="tags-display-box">
                {tags.sort().map((tag) => {
                  return <Tag name={tag} onClick={deselect} />;
                })}
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
      </div>
    </div>
  );
}

export default CreateHelp;
