import React, { useState } from 'react';
import './help-request.scss';
import { buttonsLogicStore } from '../../../../state-stores/state-stores';
import { HelpReqSchema } from '../../../../interfaces';
import Popup from 'reactjs-popup';

interface Props {
  helpRequest: HelpReqSchema;
}

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

function Help({ helpRequest }: Props) {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const showChat = buttonsLogicStore((state) => state.setChat);

  const prettyDate = new Date(helpRequest.time_created).toLocaleDateString(
    'en-gb',
    {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }
  );
  const prettyTime = new Date(helpRequest.time_created).toLocaleTimeString(
    'en-gb',
    {
      hour: '2-digit',
      minute: '2-digit',
    }
  );

  const answerHelpRequests = () => {
    const slugDescription = string_to_slug(helpRequest.description);
    const roomID = slugDescription;
    window.history.replaceState(null, '', '/chatroom');
    window.location.hash = roomID;
    showChat();
  };

  const infoHandler = (e: any) => {
    console.log(helpRequest.description);
  };

  return (
    <div className="help-container">
      <h1 className="help-title">{helpRequest.title}</h1>
      <p className="help-details">
        {prettyTime}&nbsp;
        {prettyDate} @{helpRequest.username}
      </p>
      <div className="bottom-details">
        <a id="tags">{helpRequest.hr_languages.map((e) => e + ' ')}</a>
        {/* <div>
          <Popup
            trigger={<button className="help-button">Info</button>}
            position="right center"
          >
            <div>{helpRequest.description}</div>
          </Popup>
        </div> */}
        <div className="butts-cont">
          <div>
            <button
              type="button"
              className="help-button"
              onClick={() => setOpen((o) => !o)}
            >
              Info
            </button>

            <Popup open={open} closeOnDocumentClick onClose={closeModal}>
              <div className="HR-popup">
                {helpRequest.description}
              </div>
            </Popup>
          </div>
          {/* <button className="help-button">Info</button> */}
          <button className="help-button" onClick={answerHelpRequests}>
            Help
          </button>
        </div>
      </div>
    </div>
  );
}

export default Help;
