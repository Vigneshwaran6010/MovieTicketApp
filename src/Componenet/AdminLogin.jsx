
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    adminEmail: "",
    adminPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { adminEmail, adminPassword } = formData;
    if (!adminEmail || !adminPassword) {
      alert("Email and Password are required");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(adminEmail)) {
      alert("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `http://localhost:8080/admin/adminLogin?adminEmail=${formData.adminEmail}&adminPassword=${formData.adminPassword}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("Login successful!");
        navigate("/adminhome"); // Redirect to a dashboard where options can be selected
      }
    } catch (error) {
      if (error.response) {
        setError(
          error.response.data.message || "Login failed. Please try again."
        );
      } else {
        setError("An error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="login-container"
      style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}
    >
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email: </label>
          <input
            type="email"
            name="adminEmail"
            value={formData.adminEmail}
            onChange={handleChange}
            placeholder="Enter Your Email"
            required
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            name="adminPassword"
            value={formData.adminPassword}
            onChange={handleChange}
            placeholder="Enter Your Password"
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Please wait..." : "Login"}
        </button>
        <div>
        New Admin  <a onClick={() => navigate("/admin/signup")} style={{ margin: "10px" }}>
        Admin Signup
      </a>
        </div>
      </form>
      {error && <div style={{ marginTop: "20px", color: "red" }}>{error}</div>}
    </div>
  );
};

export default AdminLogin;
