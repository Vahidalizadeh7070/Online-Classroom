import React from "react";

const Lobby = ({
  handleSubmit,
  connecting,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <h2>Enter a room</h2>
      <div>
        Please Click on Join to enter the classroom
      </div>
      <div className="pb-5 pt-3">
        <button className="btn btn-primary rounded-3 float-end" type="submit" disabled={connecting}>
          {connecting ? "Connecting" : "Enter"}
        </button>
      </div>
    </form>
  );
};

export default Lobby;
