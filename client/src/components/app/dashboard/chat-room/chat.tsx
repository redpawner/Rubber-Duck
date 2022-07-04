//@ts-nocheck
import './chat.scss';
import sand from '../../../../Images/sandbox.jpg';
import board from '../../../../Images/board.png';
import video from '../../../../Images/video.png';
import britney from '../../../../Images/britney.png';
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
import { userStore } from '../../../../state-stores/state-stores';

import Prism from 'prismjs';
import '../themes/prism-one-dark.css';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-python';
import Picker from 'emoji-picker-react';
import { useLazyQuery } from '@apollo/client';
import { GET_HR_BY_URL } from '../../../../graphql/queries-mutations';

const backendPORT = process.env.REACT_APP_BACKEND_PORT || '3001';

const socket = io(`http://localhost:3001/`, {
  transports: ['websocket'],
});

function Chat() {
  const [messages, setMessages] = useState([] as ArrivalMessage[]);
  const [showLangDropDown, setShowLangDropDown] = useState(false);
  const [helpRequestInfo, setHelpRequestInfo] = useState('');

  const uid = userStore((state) => state.uid);
  const username = userStore((state) => state.username);

  const roomID = window.location.hash;

  //currently grabbing url through lazy slice method (this will have to change when URL changes)
  const url = window.location.href.slice(31);

  const [getHR] = useLazyQuery(GET_HR_BY_URL, {
    variables: {
      filter: {
        help_request: {
          url: url,
        },
      },
    },
  });

  const getHelpRequestInfo = async () => {
    const data = await getHR();
    setHelpRequestInfo(data.data.userMany[0].help_request);
  };

  useEffect(() => {
    getHelpRequestInfo();
  }, []);

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

  // const { roomID } = useParams();

  // useEffect(() => {
  //   setRoom(roomID);
  // }, [roomID]);

  useEffect(() => {
    if (uid !== '' && roomID !== '') {
      socket.emit('join_room', roomID);
    }
  }, [roomID, uid]);

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
      room: roomID,
      author: username,
    };
    setArrivalMessage(messageObject);
  };

  const sendMessage = (e: any) => {
    e.preventDefault();
    socket.emit('sendMessage', arrivalMessage);
    setMessages([...messages, arrivalMessage]);
    console.log(arrivalMessage.room);
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
        room: roomID,
        author: username,
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
    <div className="chat-main">
      <div className="play">
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
                {arrivalMessage.type !== 'file' &&
                arrivalMessage.text === '' ? ( //button for sending message
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
                  <button
                    className="input-type-btn"
                    onClick={handleInputTypeClick}
                  >
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
                  key={
                    message.time.toString() + message.text + message.language
                  }
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
      </div>
      <div className="features-container">
        <h1 className="help-chat-title">{helpRequestInfo.title}</h1>
        <div className="problem-div">
          <p className="problem-content">
            My name is Ozymandias, King of Kings; Look on my Works, ye Mighty,
            and despair! Nothing beside remains. Round the decay Of that
            colossal Wreck, boundless and bare The lone and level sands stretch
            far away.”
          </p>
          <ul className="help-tags-list">
            <li>CSS</li>
            <li>CSS</li>
          </ul>
        </div>
        <div className="people-online">
          <h2 className="currently-online">Currently online:</h2>
          <img
            className="avatar-img2"
            src="https://yt3.ggpht.com/ytc/AKedOLSqwulPkzzEYz2Y2FveRXgtfNB0-KN4NXN29vbb=s88-c-k-c0x00ffffff-no-rj"
            alt="avatar"
          />
        </div>
        <div className="people-online">
          <h2 className="currently-online">Try:</h2>
          <div className="options">
            <a href="https://www.youtube.com/watch?v=4vvBAONkYwI&ab_channel=BritneySpearsVEVO">
              <img src={britney} alt="sand" className="avatar-img3" />
            </a>
            <img src={sand} alt="sand" className="avatar-img3" />
            <img src={board} alt="whiteboard" className="avatar-img3" />
            <img src={video} alt="video" className="avatar-img3" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
