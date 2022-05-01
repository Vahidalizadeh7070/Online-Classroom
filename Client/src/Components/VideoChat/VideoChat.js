import React, { useState, useCallback, useEffect } from "react";
import Video from "twilio-video";
import Lobby from "./Lobby";
import Room from "./Room";

const VideoChat = (props) => {
  
  const username = props.userName;
  const roomName =props.roomName;
  const [room, setRoom] = useState(null);
  const [connecting, setConnecting] = useState(false);

  console.log(roomName)


  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      setConnecting(true);
      const data = await fetch("https://onlineclassroom-2022.herokuapp.com/video/token", {
        method: "POST",
        body: JSON.stringify({
          identity: username,
          room: roomName,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
      Video.connect(data.token, {
        name: roomName,
      })
        .then((room) => {
          setConnecting(false);
          setRoom(room);
        })
        .catch((err) => {
          console.error(err);
          setConnecting(false);
        });
    },
    [roomName, username]
  );

  const handleLogout = useCallback(() => {
    setRoom((prevRoom) => {
      if (prevRoom) {
        prevRoom.localParticipant.tracks.forEach((trackPub) => {
          trackPub.track.stop();
        });
        prevRoom.disconnect();
      }
      return null;
    });
  }, []);

  useEffect(() => {
    if (room) {
      const tidyUp = (event) => {
        if (event.persisted) {
          return;
        }
        if (room) {
          handleLogout();
        }
      };
      window.addEventListener("pagehide", tidyUp);
      window.addEventListener("beforeunload", tidyUp);
      return () => {
        window.removeEventListener("pagehide", tidyUp);
        window.removeEventListener("beforeunload", tidyUp);
      };
    }
  }, [room, handleLogout]);

  let render;
  if (room) {
    render = (
        <div className="col-md-6 mb-3">
          <div className="shadow rounded-3">
            <div className="p-3">
              <Room roomName={roomName} room={room} handleLogout={handleLogout} />
            </div>
          </div>
        </div>
    );
  } else {
    render = (
      <div className="col-md-6">
        <div className="shadow mb-3 rounded-3">
          <div className="p-3">
            <Lobby
              username={username}
              roomName={roomName}

              handleSubmit={handleSubmit}
              connecting={connecting}
            />
          </div>
        </div>
      </div>
    );
  }
  return render;
};

export default VideoChat;
