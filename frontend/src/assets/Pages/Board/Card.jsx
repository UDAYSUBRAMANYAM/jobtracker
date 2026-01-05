import { useDraggable } from "@dnd-kit/core";
import { useNavigate } from "react-router-dom";
import "./Card.css";

const Card = ({ job, onDelete }) => {
  const navigate = useNavigate();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform
  } = useDraggable({
    id: job.id,
    disabled: job.status === "deleted"
  });

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  const handleDelete = () => {
    onDelete(job.id, "deleted");
  };

  const handleView = () => {
    navigate(`/job/${job.id}`);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`card glass ${job.status === "deleted" ? "disabled" : ""}`}
    >
      <div className="card-drag-area" {...listeners} {...attributes}>
        <h4 className="role">{job.role}</h4>
        <p className="company">{job.company}</p>
      </div>

      <div className="card-actions">
        <button
          className="view-btn"
          onClick={handleView}
          disabled={job.status === "deleted"}
        >
          View
        </button>

        <button
          className="delete-btn"
          onClick={handleDelete}
          disabled={job.status === "deleted"}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Card;
