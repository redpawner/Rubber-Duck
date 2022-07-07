// @ts-nocheck
import './chat.scss';
import sand from '../../../../Images/icon-sandbox.png';
import io from 'socket.io-client';
import {
  useEffect,
  useState,
  useRef,
  ChangeEvent,
  SetStateAction,
  FormEvent,
} from 'react';
import Message from '../message/message';
import { ArrivalMessage } from '../../../../interfaces';
import { userStore } from '../../../../state-stores/state-stores';
import { useNavigate, useParams } from 'react-router-dom';
import Prism from 'prismjs';
import '../themes/prism-one-dark.css';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-python';
import Picker from 'emoji-picker-react';
import { useLazyQuery, useMutation } from '@apollo/client';
import {
  GET_HR_BY_URL,
  UPDATE_HR,
} from '../../../../graphql/queries-mutations';
import TextareaAutosize from 'react-textarea-autosize';
import { auth } from '../../../../firebase';

const BACKEND_PORT = process.env.REACT_APP_BACKEND_PORT;

const socket = io(BACKEND_PORT, {
  transports: ['websocket'],
});

const createDefaultMessage = (roomID, user, avatar) => {
  return {
    text: 'Hey there!',
    time: new Date(),
    language: '',
    type: 'text',
    roomID: roomID,
    author: user,
    avatar: avatar,
  };
};

function Chat() {
  const [messages, setMessages] = useState([] as ArrivalMessage[]);
  const [showLangDropDown, setShowLangDropDown] = useState(false);
  const [helpRequestInfo, setHelpRequestInfo] = useState('');
  const [updateHR] = useMutation(UPDATE_HR);
  const [showHelpInfo, setShowHelpInfo] = useState(true);
  const [otherAvatar, setOtherAvatar] = useState('');

  const navigate = useNavigate();
  const uid = userStore((state) => state.uid);

  const username = userStore((state) => state.username);

  const userAvatar = userStore((state) => state.avatar);

  // const roomID = window.location.hash;
  const { roomID } = useParams();

  //currently grabbing url through lazy slice method (this will have to change when URL changes)
  // const url = window.location.href.slice(42);

  const toggleHelpInfo = () => {
    setShowHelpInfo(() => !showHelpInfo);
  };

  const [getHR] = useLazyQuery(GET_HR_BY_URL, {
    variables: {
      filter: {
        help_request: {
          url: roomID,
        },
      },
    },
    fetchPolicy: 'network-only',
  });

  const getHelpRequestInfo = async () => {
    const data = await getHR();

    if (data.data) {
      let result = {
        ...data.data.userMany[0].help_request,
        avatar: data.data.userMany[0].avatar,
      };

      setHelpRequestInfo(result);
    } else alert('Error fetching Help Request data.');
  };

  useEffect(() => {
    if (roomID && auth.currentUser) {
      getHelpRequestInfo();
    }
  }, [roomID, auth.currentUser]); // eslint-disable-line react-hooks/exhaustive-deps

  const [arrivalMessage, setArrivalMessage] = useState<ArrivalMessage>({
    text: '',
    time: new Date(),
    language: '',
    type: '',
    mimeType: '',
    body: undefined,
    imgSource: '',
    author: '',
    avatar: '',
    roomID: '',
  });
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

  useEffect(() => {
    if (uid !== '' && roomID !== '') {
      socket.emit('join_room', roomID);

      if (helpRequestInfo.username && username !== helpRequestInfo.username) {
        const defaultMessage = createDefaultMessage(
          roomID,
          username,
          userAvatar
        );
        sendDefaultMessage(defaultMessage);
      }
    }
  }, [roomID, uid, helpRequestInfo.username, username]); // eslint-disable-line react-hooks/exhaustive-deps

  const cancelHandler = async () => {
    await updateHR({
      variables: {
        filter: {
          uid: uid,
        },
        record: {
          needHelp: true,
        },
      },
    });
  };

  const resolveHandler = async () => {
    navigate('/dashboard');
  };

  const onEmojiClick = (
    event: FormEvent,
    emojiObject: SetStateAction<null>
  ) => {
    setChosenEmoji(emojiObject);
    setArrivalMessage({
      ...arrivalMessage,
      type: 'text',
      text: arrivalMessage.text + emojiObject.emoji,
      avatar: userAvatar,
      roomID: roomID,
    });
  };

  const handleShowEmojiPicker = (event: FormEvent) => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleLanguageChange = (event: {
    target: { value: string | undefined };
  }) => {
    arrivalMessage.language = event.target.value;
  };

  const handleInputTypeClick = (event: { preventDefault: () => void }) => {
    event.preventDefault();
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
      roomID: roomID,
      author: username,
      avatar: userAvatar,
    };
    setArrivalMessage(messageObject);
  };

  const sendMessage = (event: FormEvent) => {
    event.preventDefault();
    socket.emit('sendMessage', arrivalMessage);
    setMessages([...messages, arrivalMessage]);
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
  const sendDefaultMessage = (message: ArrivalMessage) => {
    socket.emit('sendMessage', message);
    setMessages([...messages, message]);
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
        roomID: roomID,
        author: username,
        avatar: userAvatar,
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

        // const fileReader = new FileReader();
        // fileReader.readAsArrayBuffer(blob);
        const url = URL.createObjectURL(blob);
        data = { ...data, imgSource: url };
      }
      setMessages([...messages, data]);
    });
  }, [messages]);

  useEffect(() => {
    if (messages.length) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.author !== username) {
        setOtherAvatar(lastMessage.avatar);
      }
    }
  }, [messages]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (messages.length > 0) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="chat-main">
      <div className="play">
        <div className="chat-container">
          <div className="chat-messages">
            {messages.map((message) => (
              <div
                ref={scrollRef}
                key={message.time.toString() + Math.random()}
              >
                <Message
                  // key={
                  //   message.time.toString() + message.text + message.language
                  // }
                  message={message}
                />
              </div>
            ))}
          </div>
          <div className="chat-form">
            <form className="text-area-form" onSubmit={sendMessage}>
              {' '}
              {/* chat area */}
              <TextareaAutosize
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
                        src={require('../../../../Images/icon-code.png')}
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
                        src={require('../../../../Images/icon-img.png')}
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
                      src={require('../../../../Images/icon-emoji-morado.png')}
                      alt="emoji icon"
                      className="emoji-icon"
                    ></img>
                  </button>
                </div>
              </div>
            </form>
          </div>

          {showEmojiPicker ? (
            <div className="emoji-picker">
              {chosenEmoji ? (
                <span>You chose: {chosenEmoji.emoji}</span>
              ) : (
                <span>No emoji Chosen</span>
              )}
              <Picker key={Math.random()} onEmojiClick={onEmojiClick} />
            </div>
          ) : null}
        </div>
      </div>
      <div
        className="features-container"
        style={showHelpInfo ? { width: 35 + '%' } : { width: 32 + 'px' }}
      >
        <button onClick={toggleHelpInfo}>
          <img
            src={require('../../../../Images/icon-arrow.png')}
            alt="code-icon"
            className={showHelpInfo ? 'right' : 'left'}
          ></img>
        </button>

        {
          <div
            className="features-container-info"
            style={
              showHelpInfo
                ? {
                    opacity: 1,
                    transition: 'opacity 50ms linear',
                    transitionDelay: '250ms',
                  }
                : { opacity: 0, pointerEvents: 'none' }
            }
          >
            <h1 className="help-chat-title">{helpRequestInfo.title}</h1>
            <div className="problem-div">
              <h2 className="description-div-title">Description:</h2>
              <p className="problem-content">{helpRequestInfo.description}</p>
              <div className="divider1">
                <ul className="help-tags-list">
                  {helpRequestInfo &&
                    helpRequestInfo.hr_languages.map((lang) => (
                      <li key={lang} value={lang} className="tag1">
                        {lang}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
            <div className="people-online">
              <h2 className="currently-online">Online:</h2>
              <div>
                <img className="avatar-img2" src={userAvatar} alt="avatar" />
                <p>{username}</p>
              </div>
              {username === helpRequestInfo.username ? (
                otherAvatar &&
                ((
                  <img className="avatar-img2" src={otherAvatar} alt="avatar" />
                ),
                (<p>{username}</p>))
              ) : (
                <div>
                  <img
                    className="avatar-img2"
                    src={helpRequestInfo.avatar}
                    alt="avatar"
                  />
                  <p>{helpRequestInfo.username}</p>
                </div>
              )}
            </div>
            <div className="creator-links">
              <h2 className="current-links">Sandbox link:</h2>

              <div className="options">
                <a
                  href={helpRequestInfo.sandbox}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {helpRequestInfo.sandbox}
                </a>
                <a
                  href={helpRequestInfo.sandbox}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={sand} alt="sand" className="sandbox" />
                </a>
                {/* <img src={board} alt="whiteboard" className="avatar-img3" />
            <img src={video} alt="video" className="avatar-img3" /> */}
              </div>
            </div>
            {username === helpRequestInfo.username ? (
              <div className="buttons-box">
                <button className="seek-button" onClick={cancelHandler}>
                  Ask again
                </button>
                <button className="res-button" onClick={resolveHandler}>
                  Resolved
                </button>
              </div>
            ) : (
              <div className="buttons-box">
                <button className="quit-button" onClick={resolveHandler}>
                  Leave Help Request
                </button>
              </div>
            )}
          </div>
        }
      </div>
    </div>
  );
}

export default Chat;
