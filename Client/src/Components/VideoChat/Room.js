import React, { useEffect, useState } from "react";
import { Power } from "react-bootstrap-icons";
import Participant from "./Participant";

const Room = ({ roomName, room, handleLogout }) => {
  console.log(roomName)
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const participantConnected = (participant) => {
      setParticipants((prevParticipants) => [...prevParticipants, participant]);
    };

    const participantDisconnected = (participant) => {
      setParticipants((prevParticipants) =>
        prevParticipants.filter((p) => p !== participant)
      );
    };

    room.on("participantConnected", participantConnected);
    room.on("participantDisconnected", participantDisconnected);
    room.participants.forEach(participantConnected);
    return () => {
      room.off("participantConnected", participantConnected);
      room.off("participantDisconnected", participantDisconnected);
    };
  }, [room]);

  const remoteParticipants = participants.map((participant) => (
    <Participant key={participant.sid} participant={participant} />
  ));

  return (
    <div className="room">
      <div className="row">
        <div className="col-10">
          <h2>Room: {roomName}</h2>
        </div>
        <div className="col-2">
          <button className="btn btn-danger rounded-circle shadow float-end" onClick={handleLogout}><Power size={18} className="mb-1" /></button>
        </div>
      </div>
      <hr/>
      <div className="local-participant">
        <div className="rounded-3">
          <div className="p-3">
            {room ? (
              <Participant
                key={room.localParticipant.sid}
                participant={room.localParticipant}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <h3>Remote Participants</h3>
      <hr/>
      <div className="row">
      <div className="remote-participants ">{remoteParticipants}</div>
      </div>
    </div>

  );
};

export default Room;
