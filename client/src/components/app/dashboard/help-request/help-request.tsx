import { useState } from 'react';
import './help-request.scss';
import { buttonsLogicStore } from '../../../../state-stores/state-stores';
import { HelpReqSchema } from '../../../../interfaces';
import Popup from 'reactjs-popup';

interface Props {
  helpRequest: HelpReqSchema;
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
    const roomID = helpRequest.url;
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
                <div className="HR-title">{helpRequest.title}</div>
                <div>{helpRequest.description}</div>
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
