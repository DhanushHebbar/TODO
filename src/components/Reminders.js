import React, { useEffect, useState } from "react";

function Reminders({ todos }) {
  const [upcoming, setUpcoming] = useState([]);

  useEffect(() => {
    const dueSoonTasks = todos.filter(t => t.dueDate && new Date(t.dueDate) - new Date() <= 3600*24*1000 && !t.completed);
    setUpcoming(dueSoonTasks);

    dueSoonTasks.forEach(task => {
      if (Notification.permission === "granted") {
        const taskTime = new Date(task.dueDate).getTime();
        const now = Date.now();
        if (taskTime > now) {
          setTimeout(() => {
            new Notification("Task Reminder", { body: `Task "${task.text}" is due today!` });
          }, taskTime - now);
        } else {
          new Notification("Task Reminder", { body: `Task "${task.text}" is due soon!` });
        }
      }
    });
  }, [todos]);

  useEffect(() => {
    if (Notification.permission !== "granted") Notification.requestPermission();
  }, []);

  return (
    <div className="reminders-page">
      <h2>Upcoming Reminders</h2>
      {upcoming.length === 0 ? (
        <p>No upcoming reminders.</p>
      ) : (
        <ul>
          {upcoming.map(t => (
            <li key={t.id}>
              {t.text} - Due: {t.dueDate}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Reminders;
