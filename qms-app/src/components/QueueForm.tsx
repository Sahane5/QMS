import React, { useEffect, useState } from "react";
import { BaseURL } from "../App";
import { userVM } from "../pages/Login";

class queueFormData {
  name: string;
  phone: string;
}

interface Props {
  callback: () => void;
}

const QueueForm = ({ callback }: Props) => {
  const [formData, setFormData] = useState<queueFormData>(new queueFormData());
  const [currentUser, setCurrentUser] = useState<userVM | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const printInformation = (token: string) => {
    const printContent = `
      <html>
        <head>
          <title>Generated Information</title>
          <style>
            /* Add any additional styles here */
          </style>
        </head>
        <body>
          <p>${token}</p>
          <p>Full Name: ${formData.name}</p>
          <p>Contact: ${formData.phone}</p>
          <p>${new Date().toUTCString()}</p>
        </body>
      </html>
    `;

    const printWindow = window.open("", "_blank");
    printWindow?.document.write(printContent);
    printWindow?.document.close();
    printWindow?.print();
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!currentUser) return;

    if (!formData.name || !formData.phone) {
      setError("Neither of the fields can be left blank.");
      return;
    }

    setIsLoading(true);

    const response = await fetch(`${BaseURL}/api/queues`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser.token}`,
      },
      body: JSON.stringify({ ...formData }),
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json?.error);
      setIsLoading(false);
      return;
    }

    // Extract the generated token from the response
    const generatedToken = json?.token;

    // Print only the specific information (token, name, phone, and date/time)
    printInformation(generatedToken);

    callback();
    setIsLoading(false);
    setFormData({ name: "", phone: "" });
  };

  return (
    <div>
      <h3>Add a New Queue</h3>

      <label>Full Name:</label>
      <input
        type="text"
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        value={formData.name}
        required
      />

      <label>Contact:</label>
      <input
        type="text"
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        value={formData.phone}
        required
      />

      <button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? "Processing ..." : "Add To Queue"}
      </button>

      <button onClick={() => printInformation("Token No. X")}>Print</button>

      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default QueueForm;
