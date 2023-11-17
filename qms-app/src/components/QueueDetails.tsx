import React from "react";
import { Queue } from "../models/queue";

interface Props {
  queue: Queue;
}

const QueueDetails = ({ queue }: Props) => {
  return (
    <div className="workout-details">
      <h4>Token No. {queue.token}</h4>
      <p>
        <strong>Full Name </strong>
        {queue.name}
      </p>
      <p>
        <strong>Contact: </strong>
        {queue.phone}
      </p>
      <p>{new Date(queue.createdAt).toUTCString()}</p>
      {/* <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span> */}
    </div>
  );
};

export default QueueDetails;
