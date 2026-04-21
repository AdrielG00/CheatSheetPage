import { useEffect, useState } from "react";
import axios from "axios";

function Admin() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/logs").then((res) => {
      setLogs(res.data);
    });
  }, []);

  return (
    <div>
      <h2>Login Activity</h2>
      <table border="1">
        <thead>
          <tr>
            <th>User</th>
            <th>Time</th>
            <th>IP</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, i) => (
            <tr key={i}>
              <td>{log.username}</td>
              <td>{log.login_time}</td>
              <td>{log.ip}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;