import { useEffect, useState } from "react";
import { DndContext } from "@dnd-kit/core";
import Column from "./Column";
import "./Board.css";

const API_URL = "http://localhost:3000/jobs";

const Board = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setJobs(data));
  }, []);

  const updateStatus = async (id, newStatus) => {
    await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus })
    });

    setJobs(prev =>
      prev.map(job =>
        job.id === id ? { ...job, status: newStatus } : job
      )
    );
  };

  const handleDragEnd = ({ active, over }) => {
    if (!over) return;

    const job = jobs.find(j => j.id === active.id);
    if (!job || job.status === over.id) return;

    updateStatus(active.id, over.id);
  };

  const columns = [
    { title: "Applied", status: "applied" },
    { title: "Interviewed", status: "interviewed" },
    { title: "Accepted", status: "accepted" },
    { title: "Rejected", status: "rejected" },
    { title: "Deleted", status: "deleted" }
  ];

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="board">
        {columns.map(col => (
          <Column
            key={col.status}
            title={col.title}
            status={col.status}
            jobs={jobs.filter(j => j.status === col.status)}
            onDelete={updateStatus}
          />
        ))}
      </div>
    </DndContext>
  );
};

export default Board;
