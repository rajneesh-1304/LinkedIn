import React from "react";
import "./rightside.css";

const news = [
  {
    title: "Apple's big reveal includes faster chips",
    time: "8h ago",
    readers: "41,894 readers",
  },
  {
    title: "Amazon lays off employees in robotics",
    time: "8h ago",
    readers: "10,248 readers",
  },
  {
    title: "Indian airlines boost operations",
    time: "6h ago",
    readers: "2,603 readers",
  },
  {
    title: "How women power progress",
    time: "7h ago",
    readers: "254 readers",
  },
  {
    title: "Home services platforms grow",
    time: "1d ago",
    readers: "",
  },
];

const RightSidebar: React.FC = () => {
  return (
    <div className="sidebar">

      <div className="card">
        <div className="card-header">
          <h3>LinkedIn News</h3>
        </div>

        <p className="top-stories">Top stories</p>

        {news.map((item, index) => (
          <div key={index} className="news-item">
            <p className="news-title">{item.title}</p>
            <span className="news-meta">
              {item.time} {item.readers && `• ${item.readers}`}
            </span>
          </div>
        ))}

        <button className="show-more">Show more ▾</button>

      </div>

      <div className="job-card">
        <p>Your job search powered by your network</p>

        <button className="explore-btn">Explore jobs</button>

        <img
          src="https://media.licdn.com/media/AAYAAQTPAAgAAQAAAAAAADBJg6kiYYJxTUOBq1MuLPcNcQ.png"
          alt="jobs"
        />
      </div>

      <div className="footer">
        <div className="footer-links">
          <a>About</a>
          <a>Accessibility</a>
          <a>Help Center</a>
          <a>Privacy & Terms</a>
          <a>Ad Choices</a>
          <a>Advertising</a>
          <a>Business Services</a>
          <a>Get the LinkedIn app</a>
          <a>More</a>
        </div>

        <p className="copyright">
          LinkedIn Corporation © 2026
        </p>
      </div>

    </div>
  );
};

export default RightSidebar;