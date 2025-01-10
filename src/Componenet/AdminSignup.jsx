import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const AdminSignup = () => {
  const [formData, setFormData] = useState({
    adminName: "",
    adminEmail: "",
    adminContact: "",
    adminPassword: "",
    confirmAdminPassword: "",
  });

  const [loading, setLoading] = useState(false); // Loader state
  const [fetchData, setFetchData] = useState(false); // State to trigger data fetch
  const [fetchedAdminData, setFetchedAdminData] = useState(null); // Store fetched data
  const navigate = useNavigate();
  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate form fields
  const validateForm = () => {
    const {
      adminName,
      adminEmail,
      adminContact,
      adminPassword,
      confirmAdminPassword,
    } = formData;

    if (
      !adminName ||
      !adminEmail ||
      !adminContact ||
      !adminPassword ||
      !confirmAdminPassword
    ) {
      alert("All fields are required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(adminEmail)) {
      alert("Please enter a valid email address");
      return false;
    }

    const contactRegex = /^[0-9]{10}$/;
    if (!contactRegex.test(adminContact)) {
      alert("Contact number must be a valid 10-digit number");
      return false;
    }

    if (adminPassword !== confirmAdminPassword) {
      alert("Passwords do not match");
      return false;
    }

    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true); // Show loader
    try {
      const response = await axios.post(
        "http://`:8080/admin",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Signup successful!");
      navigate("/admin/login")
      console.log("Server Response:", response.data);
      setFetchData(true); // Trigger fetching data after successful submission
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Signup failed. Please try again.";
      console.error("Error during signup:", error);
      alert(errorMessage);
    } finally {
      setLoading(false); // Hide loader
    }
  };

  // Fetch data after successful signup
  useEffect(() => {
    if (fetchData) {
      console.log("Fetching admin data...");
      axios
        .get("http://localhost:8080/admin/findAllAdmin", {
          validateStatus: (status) => status < 500, // Allow handling of 302 status
        })
        .then((response) => {
          if (response.status === 302) {
            const redirectUrl = response.headers.location;
            console.log("Redirecting to:", redirectUrl);
            return axios.get(redirectUrl);
          }
          console.log("Fetched Data:", response.data);
          setFetchedAdminData(response.data);
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
          alert("An error occurred: " + err.message);
        })
        .finally(() => setFetchData(false)); // Reset fetchData state
    }
  }, [fetchData]);

  return (
    <div
      className="signup-container"
      style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}
    >
      <h2>Admin Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            name="adminName"
            value={formData.adminName}
            onChange={handleChange}
            placeholder="Enter Your Name"
            required
          />
        </div>
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
          <label>Contact: </label>
          <input
            type="text"
            name="adminContact"
            value={formData.adminContact}
            onChange={handleChange}
            placeholder="Enter Your Contact Number"
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
        <div>
          <label>Confirm Password: </label>
          <input
            type="password"
            name="confirmAdminPassword"
            value={formData.confirmAdminPassword}
            onChange={handleChange}
            placeholder="Re-Enter Your Password"
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Wait" : "Signup"}
        </button>
        <div>
        Already have an Account  <a onClick={() => navigate("/admin/login")} style={{ margin: "10px" }}>
        Admin Login
      </a>
        </div>
      </form>
      {fetchedAdminData && (
        <div style={{ marginTop: "20px" }}>
          <h3>Fetched Admin Data:</h3>
          <pre>{JSON.stringify(fetchedAdminData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default AdminSignup;
