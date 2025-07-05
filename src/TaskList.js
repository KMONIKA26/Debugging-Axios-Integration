import React from "react";
import axios from "axios";

function TaskList() {
  const [tasks, setTasks] = React.useState([]);
  const [error, setError] = React.useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://your-project-id-default-rtdb.firebaseio.com/tasks.json");
        // Check if response data is not null and is an object

      if (response.data) {
        const taskArray = Object.entries(response.data).map(([id, task]) => ({
          id,
          ...task,
        }));
        setTasks(taskArray);
      } else {
        setTasks([]);
      }

      setError(null);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError("Failed to fetch tasks. Please try again later.");
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Task List</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.name || "Unnamed Task"}</li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
