import React, { useEffect, useState } from "react";
import QueueDetails from "../components/QueueDetails";
import QueueForm from "../components/QueueForm";
import { userVM } from "./Login";
import { BaseURL } from "../App";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [queues, setQueues] = useState([]);
  const [currentUser, setCurrentUser] = useState<userVM | null>(null);
  const [reload, setReload] = useState<boolean | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const u = JSON.parse(user) as userVM;
      setCurrentUser(u);

      (async () => {
        if (user) {
          const response = await fetch(`${BaseURL}/api/queues`, {
            headers: { Authorization: `Bearer ${u.token}` },
          });
          const json = await response.json();
          if (response.ok) {
            setQueues(json);
          }
        }
      })();
    }
  }, [reload]);

  const onNextClick = async () => {
    if (!currentUser) return;

    setIsLoading(true);

    const response = await fetch(`${BaseURL}/api/queues/next`, {
      headers: { Authorization: `Bearer ${currentUser.token}` },
    });
    if (response.ok) setReload((prev) => (prev === undefined ? true : !prev));

    setIsLoading(false);
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button
          style={{
            padding: "10px",
            background: "#424242",
            border: 0,
            color: "#fff",
            fontFamily: "Poppins",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={() => navigate("/queue")}
          disabled={isLoading}
        >
          {isLoading ? "Processing ..." : "Go to Dashboard"}
        </button>

        <button
          style={{
            padding: "10px",
            background: "#FFC107",
            border: 0,
            color: "#fff",
            fontFamily: "Poppins",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={onNextClick}
          disabled={isLoading}
        >
          {isLoading ? "Processing ..." : "Next Token"}
        </button>
      </div>
      <div className="home">
        <QueueForm
          callback={() =>
            setReload((prev) => (prev === undefined ? true : !prev))
          }
        />
        <div className="workouts">
          {queues &&
            queues.map((queue, idx) => (
              <QueueDetails key={idx} queue={queue} />
            ))}
        </div>
      </div>
    </>
  );
};

export default Home;
