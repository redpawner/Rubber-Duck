import { format } from "timeago.js";
import { messageProps } from "../../../../interfaces";
import "../chat-room/chat.scss";

function Message({ message }: messageProps) {
  return (
    <div className="chat-message">
      <div className="chat-message-avatar">
        <img
          className="avatar-img"
          src="https://yt3.ggpht.com/ytc/AKedOLSqwulPkzzEYz2Y2FveRXgtfNB0-KN4NXN29vbb=s88-c-k-c0x00ffffff-no-rj"
          alt="avatar"
        />

        <div className="chat-message-avatar-name">
          <span>John Doe</span>
        </div>
      </div>

      {message.type === "text" ? (
        <div className="chat-message-text">
          {message.language === "" ? (
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
