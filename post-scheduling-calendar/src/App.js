import "./App.css";
import CalendarView from "./components/CalendarView";

function App() {
  return (
    <div className="app">

      <div className="hero">

        <h1>📅 Social Media Scheduler</h1>

        <p>
          Schedule, Manage & Organize Your Social Media Posts
        </p>

      </div>

      {/* Statistics */}

      <div className="stats">

        <div className="card blue">
          <h2>12</h2>
          <p>Total Posts</p>
        </div>

        <div className="card green">
          <h2>8</h2>
          <p>This Month</p>
        </div>

        <div className="card orange">
          <h2>5</h2>
          <p>Scheduled</p>
        </div>

      </div>

      <div className="dashboard">

        <div className="calendar-section">

          <CalendarView />

        </div>

        <div className="sidebar">

          <h2>📌 Upcoming Posts</h2>

          <div className="task instagram">
            📸 Instagram Post
            <span>5 Aug</span>
          </div>

          <div className="task linkedin">
            💼 LinkedIn Post
            <span>8 Aug</span>
          </div>

          <div className="task facebook">
            📘 Facebook Campaign
            <span>12 Aug</span>
          </div>

          <div className="task youtube">
            🎥 YouTube Video
            <span>16 Aug</span>
          </div>

          <div className="task twitter">
            🐦 Twitter Thread
            <span>22 Aug</span>
          </div>

        </div>

      </div>

    </div>
  );
}

export default App;