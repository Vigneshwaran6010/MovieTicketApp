import React from "react";
import { useNavigate } from "react-router-dom";

const TheaterHome = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Theater Home</h2>
      <button onClick={() => navigate("/add-theaters")} style={{ margin: "10px" }}>
        Add Theater
      </button>
      {/* <button onClick={() => navigate("/screen")} style={{ margin: "10px" }}>
        Add Screen
      </button> */}
      <button onClick={() => navigate("/movie-show")} style={{ margin: "10px" }}>
        Add Show
      </button>
    </div>
  );
};

export default TheaterHome;

