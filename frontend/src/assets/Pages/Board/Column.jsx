import { useDroppable } from "@dnd-kit/core";
import Card from "./Card";
import "./Column.css";

const Column = ({ title, status, jobs, onDelete }) => {
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <div ref={setNodeRef} className={`column ${status}`}>
      <h3>{title}</h3>

      <div className="column-cards">
        {jobs.map(job => (
          <Card
            key={job.id}
            job={job}
            onDelete={onDelete}
          />
        ))}

        {isOver && <div className="drop-indicator" />}
      </div>
    </div>
  );
};

export default Column;
