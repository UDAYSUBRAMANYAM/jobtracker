import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="glass-card">
        <h1>JobTracker</h1>
        <p>Track applications like a pro</p>

        <div className="home-actions">
          <button onClick={() => navigate("/create")}>
            Create Job
          </button>

          <button onClick={() => navigate("/board")}>
            View Board
          </button>

          <button onClick={() => navigate("/analytics")}>
            Analytics
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
