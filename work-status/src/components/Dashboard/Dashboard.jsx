import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import TaskCards from "./TaskCards";
import Charts from "./Charts";
import RecentActivities from "./RecentActivities";
import ProjectsList from "./ProjectsList";
import TasksList from "./TasksList";
import EmployeesList from "./EmployeesList";
import TeamsList from "./TeamsList";
import TimeLogsList from "./TimeLogsList";
import ReportsList from "./ReportsList";
import "./Dashboard.css";

function Dashboard() {
  const [view, setView] = useState("default");

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const renderContent = () => {
    switch (view) {
      case "projects":
        return <ProjectsList />;
      case "tasks":
        return <TasksList />;
      case "employees":
        return <EmployeesList />;
      case "teams":
        return <TeamsList />;
      case "timeLogs":
        return <TimeLogsList />;
      case "reports":
        return <ReportsList />;
      default:
        return (
          <>
            <TaskCards />
            <Charts />
            <RecentActivities />
          </>
        );
    }
  };

  return (
    <div className="dashboard-container">
      <Header onWorkStatusClick={() => handleViewChange("default")} />
      <Sidebar onViewChange={handleViewChange} />
      <div className="main-content-container">
        <div className="main-content">{renderContent()}</div>
      </div>
    </div>
  );
}

export default Dashboard;
