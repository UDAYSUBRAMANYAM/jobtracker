import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./CreateJob.css"

const API_URL = import.meta.env.VITE_API_URL;

const CreateJob = () => {
  const navigate = useNavigate()

  const [company, setCompany] = useState("")
  const [role, setRole] = useState("")
  const [applyLink, setApplyLink] = useState("")
  const [status, setStatus] = useState("applied")
  const [description, setDescription] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!company || !role) return

    const newJob = {
      company,
      role,
      applyLink,
      status,
      description,
      createdAt: new Date().toISOString()
    }

    try {
      await fetch(`${API_URL}/jobs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newJob)
      })

      navigate("/board")
    } catch (error) {
      console.error("Error creating job:", error)
    }
  }

  return (
    <div className="create-job-page">
      <form className="create-job-card" onSubmit={handleSubmit}>
        <h2>Create Job</h2>

        <input
          type="text"
          placeholder="Company Name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Role / Position"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        />

        <input
          type="url"
          placeholder="Apply Link"
          value={applyLink}
          onChange={(e) => setApplyLink(e.target.value)}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="applied">Applied</option>
          <option value="interviewed">Interviewed</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
        </select>

        <textarea
          placeholder="Job Description / Notes"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="actions">
          <button type="submit">Add Job</button>
          <button type="button" onClick={() => navigate("/")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateJob
