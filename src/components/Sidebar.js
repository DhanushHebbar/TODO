import React from "react";

function Sidebar({ filter, setFilter, activeTab, setActiveTab }) {
  return (
    <div className="sidebar">
      <button onClick={() => setActiveTab("tasks")} className={activeTab==="tasks"?"active":""}>Tasks</button>
      <button onClick={() => setActiveTab("reminders")} className={activeTab==="reminders"?"active":""}>Reminders</button>
      <button onClick={() => setActiveTab("dashboard")} className={activeTab==="dashboard"?"active":""}>Dashboard</button>
      {activeTab==="tasks" && (
        <div className="filters">
          <button onClick={()=>setFilter("all")} className={filter==="all"?"active":""}>All</button>
          <button onClick={()=>setFilter("work")} className={filter==="work"?"active":""}>Work</button>
          <button onClick={()=>setFilter("personal")} className={filter==="personal"?"active":""}>Personal</button>
          <button onClick={()=>setFilter("others")} className={filter==="others"?"active":""}>Others</button>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
