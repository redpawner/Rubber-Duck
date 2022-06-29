//@ts-nocheck
import './chat.scss';
import io from 'socket.io-client';
import {
  useEffect,
  useState,
  useRef,
  ChangeEvent,
  SetStateAction,
} from 'react';
import Message from '../message/message';
import { ArrivalMessage } from '../../../../interfaces';

import Prism from 'prismjs';
import '../themes/prism-one-dark.css';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-python';
import Picker from 'emoji-picker-react';

const backendPORT = process.env.REACT_APP_BACKEND_PORT || '3001';

const socket = io(`http://localhost:3001/`, {
  transports: ['websocket'],
});

function Chat() {
  const [messages, setMessages] = useState([] as ArrivalMessage[]);
  const [showLangDropDown, setShowLangDropDown] = useState(false);
  const [arrivalMessage, setArrivalMessage] = useState({
    text: '',
    time: new Date(),
    language: '',
    type: '',
    mimeType: '',
    body: undefined,
    imgSource: '',
  } as ArrivalMessage);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const scrollRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  const langList = [
    'javascript',
    'css',
    'html',
    'java',
    'python',
    'typescript',
  ];

  const onEmojiClick = (event: any, emojiObject: SetStateAction<null>) => {
    setChosenEmoji(emojiObject);

    setArrivalMessage({
      ...arrivalMessage,
      type: 'text',
      text: arrivalMessage.text + emojiObject.emoji,
    });
  };

  const handleShowEmojiPicker = (event: any) => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleLanguageChange = (event: {
    target: { value: string | undefined };
  }) => {
    arrivalMessage.language = event.target.value;
  };

  const handleInputTypeClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setShowLangDropDown(!showLangDropDown);
  };

  const onEnterPress = (e: {
    keyCode: number;
    shiftKey: boolean;
    preventDefault: () => void;
  }) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      sendMessage(e);
    }
  };

  const createMessage = (e: { target: { value: string } }) => {
    //creating text object
    const messageObject = {
      text: e.target.value,
      time: new Date(),
      language: arrivalMessage.language,
      type: 'text',
    };
    setArrivalMessage(messageObject);
  };

  const sendMessage = (e: any) => {
    e.preventDefault();
    socket.emit('sendMessage', arrivalMessage);
    setArrivalMessage({
      text: '',
      time: new Date(),
      language: '',
      type: '',
      mimeType: '',
    });

    if (showLangDropDown) {
      setShowLangDropDown(!showLangDropDown);
    }
    if (showEmojiPicker) {
      setShowEmojiPicker(!showEmojiPicker);
    }
  };

  const selectFile = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.files &&
      setArrivalMessage({
        ...arrivalMessage,
        text: e.target.files[0].name,
        mimeType: e.target.files[0].type,
        blob: new Blob([e.target.files[0]], {
          type: e.target.files[0].type,
        }),
        type: 'file',
        imgSource: URL.createObjectURL(e.target.files[0]),
      });
  };

  // const selectEmoji = (e) => {};

  useEffect(() => {
    Prism.highlightAll();
  }, [messages]);

  useEffect(() => {
    socket.on('receiveMessage', (data) => {
      if (data.type === 'file') {
        const blob = new Blob([data.blob], { type: data.mimeType });

        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(blob);
      }
      setMessages([...messages, data]);
    });
  }, [messages]);

  useEffect(() => {
    if (messages.length > 0) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="chat-form">
        <form className="text-area-form" onSubmit={sendMessage}>
          {' '}
          {/* chat area */}
          <textarea
            value={arrivalMessage.text}
            onChange={createMessage}
            placeholder="Type a message..."
            onKeyDown={onEnterPress}
            required
          />
          <div className="buttons">
            {arrivalMessage.type !== 'file' && arrivalMessage.text === '' ? ( //button for sending message
              <button className="send-btn" type="submit" disabled>
                <img
                  src={require('../../../../Images/send-icon.png')}
                  alt="send icon"
                  className="send-icon"
                ></img>
              </button>
            ) : (
              <button className="send-btn" type="submit">
                <img
                  src={require('../../../../Images/send-icon.png')}
                  alt="send icon"
                  className="send-icon"
                ></img>
              </button>
            )}
            <div className="img-code-buttons">
              {showLangDropDown ? (
                <select onChange={handleLanguageChange} name="languages">
                  <option value="">Select a language</option>
                  {langList.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              ) : null}
              <button className="input-type-btn" onClick={handleInputTypeClick}>
                {showLangDropDown ? (
                  <img
                    src={require('../../../../Images/text-button-icon-48.png')}
                    alt="code-icon"
                  />
                ) : (
                  <img
                    src={require('../../../../Images/code-icon-32.png')}
                    alt="code-icon"
                  />
                )}
              </button>
              <input
                type="file"
                name="file"
                id="files"
                className="hidden"
                accept="image/*"
                onChange={selectFile}
              />
              <button className="file-btn" type="button">
                <label htmlFor="files" className="file-label">
                  <img
                    src={require('../../../../Images/upload-image-icon.png')}
                    alt="upload icon"
                    className="upload-image-icon"
                  ></img>
                </label>
              </button>

              <button
                className="emoji-btn"
                onClick={handleShowEmojiPicker}
                type="button"
              >
                <img
                  src={require('../../../../Images/emoji-icon.png')}
                  alt="emoji icon"
                  className="emoji-icon"
                ></img>
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="chat-messages">
        {messages.map((message) => (
          <div ref={scrollRef} key={message.time.toString()}>
            <Message
              key={message.time.toString() + message.text + message.language}
              message={message}
            />
          </div>
        ))}
      </div>

      {showEmojiPicker ? (
        <div className="emoji-picker">
          {chosenEmoji ? (
            <span>You chose: {chosenEmoji.emoji}</span>
          ) : (
            <span>No emoji Chosen</span>
          )}
          <Picker onEmojiClick={onEmojiClick} />
        </div>
      ) : null}
    </div>
  );
}

export default Chat;
