import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import "./Analytics.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

const API_URL = "http://localhost:3000/jobs";

const Analytics = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setJobs(data));
  }, []);

  
  const roles = [...new Set(jobs.map(j => j.role))];
  const statuses = ["applied", "interviewed", "accepted", "rejected"];

  const roleStatusData = statuses.map(status => ({
    label: status,
    data: roles.map(role =>
      jobs.filter(j => j.role === role && j.status === status).length
    ),
    backgroundColor:
      status === "applied" ? "#facc15" :
      status === "interviewed" ? "#fb923c" :
      status === "accepted" ? "#4ade80" :
      "#f87171"
  }));

  const roleCounts = {};
  jobs.forEach(j => {
    roleCounts[j.role] = (roleCounts[j.role] || 0) + 1;
  });

  const sortedRoles = Object.entries(roleCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const dateCounts = {};
  jobs.forEach(j => {
    const date = new Date(j.createdAt).toLocaleDateString();
    dateCounts[date] = (dateCounts[date] || 0) + 1;
  });

  const dates = Object.keys(dateCounts);
  const dateValues = Object.values(dateCounts);

  return (
    <div className="analytics">
      <div className="analytics-glass">
        <h1>Job Analytics</h1>

        <h2>Role vs Status</h2>
        <Bar
          data={{
            labels: roles,
            datasets: roleStatusData
          }}
          options={{
            responsive: true,
            plugins: { legend: { position: "top" } },
            scales: { x: { stacked: true }, y: { stacked: true } }
          }}
        />

        <h2>Top Applied Roles</h2>
        <Bar
          data={{
            labels: sortedRoles.map(r => r[0]),
            datasets: [
              {
                label: "Applications",
                data: sortedRoles.map(r => r[1]),
                backgroundColor: "#93c5fd"
              }
            ]
          }}
        />

        <h2>Applications Per Day</h2>
        <Line
          data={{
            labels: dates,
            datasets: [
              {
                label: "Applications",
                data: dateValues,
                borderColor: "#fff",
                tension: 0.3
              }
            ]
          }}
        />

        <div className="analytics-actions">
          <button onClick={() => navigate("/")}>Home</button>
          <button onClick={() => navigate("/create")}>Create Job</button>
          <button onClick={() => navigate("/board")}>Board</button>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
