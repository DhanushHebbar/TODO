import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard({ todos }) {
  const completed = todos.filter(t => t.completed).length;
  const pending = todos.length - completed;

  const data = {
    labels: ["Completed", "Pending"],
    datasets: [{
      data: [completed, pending],
      backgroundColor: ["#28a745", "#dc3545"],
      hoverOffset: 10
    }]
  };

  return (
    <div className="dashboard-page">
      <h2>Task Overview</h2>
      <Doughnut data={data} />
      <div className="dashboard-tasks">
        <h3>Pending Tasks</h3>
        <ul>
          {todos.filter(t => !t.completed).map(t => (
            <li key={t.id}>
              {t.text} [{t.priority}] {t.dueDate && `- Due: ${t.dueDate}`}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
