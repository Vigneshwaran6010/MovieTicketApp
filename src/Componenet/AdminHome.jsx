import React from "react";
import { useNavigate } from "react-router-dom";

const AdminHome = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Admin Home</h2>
      <button onClick={() => navigate("/theater-home")} style={{ margin: "10px" }}>
        Theater Home
      </button>
      <button onClick={() => navigate("/add-movie")} style={{ margin: "10px" }}>
        Add Movie
      </button>
    </div>
  );
};

export default AdminHome;