import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./JobDetails.css";

const API_URL = "http://localhost:3000/jobs";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/${id}`)
      .then(res => res.json())
      .then(data => setJob(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!job) {
    return (
      <div className="job-details">
        <div className="job-glass-card">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="job-details">
      <div className="job-glass-card">
        <h1>{job.role}</h1>

        <p className="job-company">{job.company}</p>

        <div className="job-meta">
          <span><b>ID:</b> {job.id}</span>
          <span><b>Status:</b> {job.status}</span>
        </div>

        <div className="job-meta">
          <span>
            <b>Created:</b>{" "}
            {new Date(job.createdAt).toLocaleString()}
          </span>
        </div>

        <p className="job-description">
          <b>Description:</b><br />
          {job.description}
        </p>

        <div className="job-actions">
          <a
            href={job.applyLink}
            target="_blank"
            rel="noreferrer"
          >
            Apply Link
          </a>

          <button onClick={() => window.history.back()}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
