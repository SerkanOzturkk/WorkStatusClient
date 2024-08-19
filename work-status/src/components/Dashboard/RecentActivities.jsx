import React from "react";
import "./RecentActivities.css";

const activities = [
  { id: 1, activity: "Completed Task A" },
  { id: 2, activity: "Started Task B" },
  { id: 3, activity: "Updated Project C" },
];

function RecentActivities() {
  return (
    <div className="recent-activities">
      <h3>Recent Activities</h3>
      <ul>
        {activities.map((activity) => (
          <li key={activity.id}>{activity.activity}</li>
        ))}
      </ul>
    </div>
  );
}

export default RecentActivities;
