import { format } from 'timeago.js';
import { messageProps } from '../../../../interfaces';
import { userStore } from '../../../../state-stores/state-stores';
import '../chat-room/chat.scss';

function Message({ message }: messageProps) {
  const avatar = userStore((state) => state.avatar);
  const profile = `static/media/${avatar}`;

  return (
    <div className="chat-message">
      <div className="chat-message-avatar">
        <img className="avatar-img" src={profile} alt="avatar" />

        <div className="chat-message-avatar-name">
          <span>{message.author}</span>
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
