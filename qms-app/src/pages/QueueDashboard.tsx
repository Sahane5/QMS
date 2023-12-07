import React, { useEffect, useState } from "react";
import { Queue } from "../models/queue";
import { userVM } from "./Login";
import { BaseURL } from "../App";

const QueueDashboard = () => {
  const [currentToken, setCurrentToken] = useState<Queue | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const user = localStorage.getItem("user");
      // if (user) {
        // const currentUser = JSON.parse(user) as userVM;

        (async () => {
          // if (user) {
            const response = await fetch(`${BaseURL}/api/queues/current`, {
              // headers: { Authorization: `Bearer ${currentUser.token}` },
            });
            const json = await response.json();
            if (response.ok) {
              setCurrentToken(json);
            }
          // }
        })();
      // }
    };

    fetchData();

    // Set up an interval to make the server call every 5 seconds
    const intervalId = setInterval(() => {
      fetchData();
    }, 5000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  function convertToBase1000(number) {
    // Convert the number to a string
    let numberString: string = number.toString();

    // Calculate the number of zeros to pad
    const zerosToPad = 4 - numberString.length;

    // Pad the string with zeros
    for (let i = 0; i < zerosToPad; i++) {
      numberString = "0" + numberString;
    }

    return numberString;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
        background: "#fff",
      }}
    >
      {/* <h3>Token</h3> */}

      <h1 style={{ color: "#1aac83", fontSize: "10rem" }}>
        {convertToBase1000(currentToken?.token ?? 0)}
      </h1>
    </div>
  );
};

export default QueueDashboard;
