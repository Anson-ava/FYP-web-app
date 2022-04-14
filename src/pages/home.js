import React from "react";
import { Link } from "react-router-dom";
import BannerImage from "../assets/background.jpg";
import "./home.css";

class Home extends React.Component {
  render() {
    return (
      <div className="home" style={{ backgroundImage: `url(${BannerImage})` }}>
        <div className="headerContainer">
          <h1> Object Detection </h1>
          <p>Autonomous Driving</p>
          <Link to="/camera">
            <button> Try now </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Home;
