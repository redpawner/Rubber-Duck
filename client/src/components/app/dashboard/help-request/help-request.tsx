import { useState } from 'react';
import './help-request.scss';

import { userStore } from '../../../../state-stores/state-stores';

import { HelpReqSchema } from '../../../../interfaces';
import { useMutation } from '@apollo/client';
import { UPDATE_HR } from '../../../../graphql/queries-mutations';
import { useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';

interface Props {
  helpRequest: HelpReqSchema;
}

function Help({ helpRequest }: Props) {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const [updateHR] = useMutation(UPDATE_HR);

  const navigate = useNavigate();

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

  const answerHelpRequests = async (event: any) => {
    await updateHR({
      variables: {
        filter: {
          username: helpRequest.username,
        },
        record: {
          needHelp: false,
        },
      },
    });
    const roomID = helpRequest.url;
    window.history.replaceState(null, '', '/chatroom');
    window.location.hash = roomID;

    //We can take this out if we can get the specific hr frome the db

    navigate('/chatroom#' + roomID);
  };

  return (
    <div className="help-container">
      <h1 className="help-title">{helpRequest.title}</h1>
      <p className="help-details">
        <img src={helpRequest.avatar} alt="" className="user-avatar" />
        <span className="username">
          {prettyTime}&nbsp;
          {prettyDate} @{helpRequest.username}
        </span>
      </p>
      <div className="bottom-details">
        <div id="tags">
          {helpRequest.hr_languages.map((e, index) => {
            return <span key={index}>{e}</span>;
          })}
        </div>

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
                <div className="X-outerbox">
                  <div className="userbox">
                    <div className="usernamebox">{helpRequest.username}</div>
                    <div className="askbox"> asked:</div>
                  </div>
                  <div className="close" onClick={closeModal}>
                    X
                  </div>
                </div>
                <div className="HR-title">{helpRequest.title}</div>
                <div className="desc-box">{helpRequest.description}</div>
                <button className="help-buttonx" onClick={answerHelpRequests}>
                  Help
                </button>
              </div>
            </Popup>
          </div>
          {/* <button className="help-button" onClick={answerHelpRequests}>
            Help
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default Help;
