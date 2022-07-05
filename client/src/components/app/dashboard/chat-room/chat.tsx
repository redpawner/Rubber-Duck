//@ts-nocheck
import './chat.scss';
import sand from '../../../../Images/icon-sandbox.png';
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
import {
  buttonsLogicStore,
  userStore,
} from '../../../../state-stores/state-stores';

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

const backendPORT = process.env.REACT_APP_BACKEND_PORT || '3001';

const socket = io(`http://localhost:3001/`, {
  transports: ['websocket'],
});

const createDefaultMessage = (room, user)=>{
  return {text:'Hey there!',
  time: new Date(),
  language: '',
  type: 'text',
  room: room,
  author: user
}
};



function Chat() {
  const setDashboard = buttonsLogicStore((state) => state.setDashboard);
  const [messages, setMessages] = useState([] as ArrivalMessage[]);
  const [showLangDropDown, setShowLangDropDown] = useState(false);
  const [helpRequestInfo, setHelpRequestInfo] = useState('');
  const [updateHR] = useMutation(UPDATE_HR);
  const [showHelpInfo, setShowHelpInfo] = useState(true);

  const uid = userStore((state) => state.uid);

  const username = userStore((state) => state.username);

  const author = helpRequestInfo.username

  const roomID = window.location.hash;

  //currently grabbing url through lazy slice method (this will have to change when URL changes)
  const url = window.location.href.slice(31);

  const toggleHelpInfo = () => {
setShowHelpInfo(()=>!showHelpInfo)
  }

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
    data && setHelpRequestInfo(data.data.userMany[0].help_request);
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
      if (helpRequestInfo.username && (username !== helpRequestInfo.username)) {
        const defaultMessage = createDefaultMessage(roomID, username)
  sendDefaultMessage(defaultMessage)
      }
    }
  }, [roomID, uid, helpRequestInfo.username, username]);

  // const cancelHandler = async (event: any) => {
  //   await updateHR({
  //     variables: {
  //       filter: {
  //         uid: uid,
  //       },
  //       record: {
  //         needHelp: true,
  //       },
  //     },
  //   });
  // };

  // const helpRequestReset = {
  //   username: '',
  //   title: '',
  //   description: '',
  //   hr_languages: '',
  //   time_created: null,
  //   url: '',
  //   sandbox: '',
  // };

  // const resolveHandler = async (event: any) => {
  //   await updateHR({
  //     variables: {
  //       filter: {
  //         uid: uid,
  //       },
  //       record: {
  //         needHelp: false,
  //         help_request: null,
  //       },
  //     },
  //   });

  //   setDashboard();
  // };

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
                // onHeightChange={(height)=>{}}
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
              <Picker onEmojiClick={onEmojiClick} />
            </div>
          ) : null}
        </div>
      </div>
      <div className="features-container" style = {showHelpInfo? {width : 35 + '%' }:{width : 32 + 'px' }}>
        <button onClick={toggleHelpInfo}><img src={require('../../../../Images/icon-arrow.png')}
                        alt="code-icon" className = {showHelpInfo? 'right': 'left'}></img></button>

          { <div className='features-container-info' style = {showHelpInfo? {opacity : 1 , transition: "opacity 50ms linear", transitionDelay: "250ms"}:{opacity : 0  }}>
           <h1 className="help-chat-title" >{helpRequestInfo.title}</h1>
           <div className="problem-div">
           <p className="problem-content">
           {helpRequestInfo.description}
           </p>
           <ul className="help-tags-list">
            {helpRequestInfo && helpRequestInfo.hr_languages.map((lang) => (
                        <li key={lang} value={lang}>
                          {lang}
                        </li> ))}

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
            {/* <a href="https://www.youtube.com/watch?v=4vvBAONkYwI&ab_channel=BritneySpearsVEVO">
              <img src={britney} alt="sand" className="avatar-img3" />
            </a> */}
            <a href="https://www.youtube.com/watch?v=4vvBAONkYwI&ab_channel=BritneySpearsVEVO">
              <img src={sand} alt="sand" className="sandbox" />
            </a>
            {/* <img src={board} alt="whiteboard" className="avatar-img3" />
            <img src={video} alt="video" className="avatar-img3" /> */}
           </div>
          </div>
        <div className="buttons-box">
          {/* <button className="res-button" onClick={cancelHandler}> */}
          <button className="res-button">Seek another mentor</button>
          {/* <button className="res-button" onClick={resolveHandler}> */}
          <button className="res-button">Resolved</button>
        </div>
        </div>}
          </div>
      </div>

  );
}

export default Chat;
