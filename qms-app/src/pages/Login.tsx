import React, { useState } from "react";
import { BaseURL } from "../App";
import { useNavigate } from "react-router-dom";

class loginFormData {
  userName: string;
  password: string;
}

export class userVM {
  userName: string;
  token: string;
}

const Login = () => {
  const [formData, setFormData] = useState<loginFormData>(new loginFormData());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);
    setError(null);

    const response = await fetch(`${BaseURL}/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData }),
    });
    const json = await response.json();
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      window.location.reload();
    } else {
      setError(json?.error);
    }

    setIsLoading(false);
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>

      <label>User Name:</label>
      <input
        type="text"
        onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
        value={formData.userName}
        required
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        value={formData.password}
        required
      />

      <button disabled={isLoading}>Log in</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
