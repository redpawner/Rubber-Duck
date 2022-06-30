import React from 'react';
import './help-request.scss';
import { buttonsLogicStore } from '../../../../state-stores/state-stores';
import { HelpReqSchema } from '../../../../interfaces';

interface Props {
  helpRequest: HelpReqSchema;
}

function Help({ helpRequest }: Props) {
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

  return (
    <div className="help-container">
      <h1 className="help-title">{helpRequest.title}</h1>
      <p className="help-details">
        {prettyTime}&nbsp;
        {prettyDate} @{helpRequest.username}
      </p>
      <div className="bottom-details">
        <a id="tags">{helpRequest.hr_languages.map((e) => e + ' ')}</a>
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

export default Help;
