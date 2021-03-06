import { format } from 'timeago.js';
import { messageProps } from '../../../../interfaces';
import '../chat-room/chat.scss';

function Message({ message }: messageProps) {

  return (
    <div className="chat-message">
      <div className="chat-message-avatar">
        <img
          className="avatar-img"
          src={message.avatar}
          alt="avatar"
        />



        {/* <div className="chat-message-avatar-name">
          <span>{message.author}</span>
        </div> */}

      </div>
      <div className="chat-message-data">
        <div className="chat-message-info">
          <div className="chat-message-name">
            <span>{message.author}</span>
          </div>
          <div className="chat-message-time">{format(message.time)}</div>
        </div>
        {message.type === 'text' ? (
          <div className="chat-message-text">
            {message.language === '' ? (
              <div className="chat-message-text">{message.text}</div>
            ) : (
              <div className="chat-message-code">
                <pre>
                  <code className={`language-${message.language}`}>
                    {message.text}
                  </code>
                </pre>
              </div>
            )}
          </div>
        ) : (
          <img src={message.imgSource} alt={message.text} />
        )}
      </div>
    </div>
  );
}

export default Message;
