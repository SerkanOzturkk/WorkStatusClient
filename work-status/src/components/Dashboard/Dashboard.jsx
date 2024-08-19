import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import TaskCards from "./TaskCards";
import Charts from "./Charts";
import RecentActivities from "./RecentActivities";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-container">
      <Header />
      <Sidebar />
      <div className="main-content-container">
        <div className="main-content">
          <div className="dashboard-sections">
            <TaskCards />
            <Charts />
            <RecentActivities />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
