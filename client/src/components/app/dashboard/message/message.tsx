import { format } from 'timeago.js';
import { messageProps } from '../../../../interfaces';

function Message({ message }: messageProps) {
  return (
    <div className="chat-message">
      <div className="chat-message-avatar">
        <img src="https://via.placeholder.com/150" alt="avatar" />

        <div className="chat-message-avatar-name">
          <span>John Doe</span>
        </div>
      </div>

      {message.type === 'text' ? (
        <div className="chat-message-text">
          {message.language === '' ? (
            <div className="chat-message-text">{message.text}</div>
          ) : (
            <div className="chat-message-text">
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

      <div className="chat-message-time">{format(message.time)}</div>
    </div>
  );
}

export default Message;
