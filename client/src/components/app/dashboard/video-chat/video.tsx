//@ts-nocheck
import React, { useEffect, useRef, useState } from 'react';
import './video.scss';
import Peer from 'simple-peer';
import socket from '../chat-room/socket';

function Video({ idToCall }) {
  const [me, setMe] = useState('');
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState('');
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  // const [idToCall, setIdToCall] = useState('');
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState('');
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  console.log('helpful text message', userVideo.current);
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        // console.log(myVideo.current, 'myvideo');
        // console.log(myVideo.current.srcObject, 'srcobj');
        if (myVideo.current) {
          myVideo.current.srcObject = stream;
        }
      });

    socket.on('connect', () => {
      console.log('socket connected', socket.id);
    });

    socket.on('disconnect', () => {
      console.log('socket disconnected', socket.id);
    });

    socket.on('me', (id) => {
      console.log('use effect event me id', id);
      setMe(id);
    });

    socket.on('callUser', (data) => {
      console.log('data', data);
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });

    //make sure to return cleanup function
  }, [myVideo.current]);

  const callUser = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    peer.on('signal', (data) => {
      socket.emit('callUser', {
        userToCall: idToCall,
        signalData: data,
        from: me,
        // name: name,
      });
    });
    peer.on('stream', (stream) => {
      userVideo.current.srcObject = stream;
    });
    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on('signal', (data) => {
      // console.log('signal data', data);
      socket.emit('answerCall', { signal: data, to: caller });
    });
    peer.on('stream', (stream) => {
      console.log('stream stream', userVideo.current);
      userVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
  };

  return (
    <div className="container">
      <div className="video-container">
        <div className="video">
          {stream && (
            <video
              playsInline
              muted
              ref={myVideo}
              autoPlay
              style={{ width: '300px' }}
            />
          )}
        </div>
        <div className="video">
          {callAccepted && !callEnded ? (
            <video
              playsInline
              ref={userVideo}
              autoPlay
              style={{ width: '300px' }}
            />
          ) : null}
        </div>
      </div>

      <div className="call-button">
        {callAccepted && !callEnded ? (
          <button variant="contained" color="secondary" onClick={leaveCall}>
            End Call
          </button>
        ) : (
          <button
            color="primary"
            aria-label="call"
            onClick={() => callUser(idToCall)}
          >
            Call
          </button>
        )}
        {idToCall}
      </div>
      <div>
        {receivingCall && !callAccepted ? (
          <div className="caller">
            <h1>{name} is calling...</h1>
            <button variant="contained" color="primary" onClick={answerCall}>
              Answer
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Video;
