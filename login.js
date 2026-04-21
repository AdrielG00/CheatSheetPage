import axios from "axios";
import { useState } from "react";

export default function Login({ setUser }) {
  const [username, setUsername] = useState("");

  const login = async () => {
    const res = await axios.post("http://localhost:5000/login", { username });
    localStorage.setItem("user", res.data.user);
    setUser(res.data.user);
  };

  return (
    <div style={{ textAlign: "center", marginTop: 100 }}>
      <h2>Login</h2>
      <input onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <button onClick={login}>Login</button>
    </div>
  );
}