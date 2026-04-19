import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/tasks")
      .then(res => setTasks(res.data));
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>📋 SmartTasks</h1>
      {tasks.map((t, i) => <p key={i}>{t}</p>)}
    </div>
  );
}

export default App;