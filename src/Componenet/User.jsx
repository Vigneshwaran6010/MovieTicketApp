import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    userContact: "",
    userPassword: "",
    confirmuserPassword: "",
  });

  const [loading, setLoading] = useState(false); // Loader state
  const [fetchData, setFetchData] = useState(false); // State to trigger data fetch
  const [fetchedUserData, setFetchedUserData] = useState(null); // Store fetched data
  const navigate = useNavigate();
  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate form fields
  const validateForm = () => {
    const {
      userName,
      userEmail,
      userContact,
      userPassword,
      confirmuserPassword,
    } = formData;

    if (
      !userName ||
      !userEmail ||
      !userContact ||
      !userPassword ||
      !confirmuserPassword
    ) {
      alert("All fields are required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      alert("Please enter a valid email address");
      return false;
    }

    const contactRegex = /^[0-9]{10}$/;
    if (!contactRegex.test(userContact)) {
      alert("Contact number must be a valid 10-digit number");
      return false;
    }

    if (userPassword !== confirmuserPassword) {
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
        "http://localhost:8080/user",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Signup successful!");
      console.log("Server Response:", response.data);
      navigate("/userlogin");
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

  // // Fetch data after successful signup
  // useEffect(() => {
  //   if (fetchData) {
  //     console.log("Fetching user data...");
  //     axios
  //       .get("http://192.168.43.18:8090/user/all")
  //       .then((response) => {
  //         console.log("Fetched Data:", response.data);
  //         setFetchedUserData(response.data);
  //       })
  //       .catch((err) => {
  //         console.error("Error fetching data:", err);
  //         alert("An error occurred: " + err.message);
  //       })
  //       .finally(() => setFetchData(false)); // Reset fetchData state
  //   }
  // }, [fetchData]);

  return (
    <div
      className="signup-container"
      style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}
    >
      <h2>User Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            placeholder="Enter Your Name"
            required
          />
        </div>
        <div>
          <label>Email: </label>
          <input
            type="email"
            name="userEmail"
            value={formData.userEmail}
            onChange={handleChange}
            placeholder="Enter Your Email"
            required
          />
        </div>
        <div>
          <label>Contact: </label>
          <input
            type="text"
            name="userContact"
            value={formData.userContact}
            onChange={handleChange}
            placeholder="Enter Your Contact Number"
            required
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            name="userPassword"
            value={formData.userPassword}
            onChange={handleChange}
            placeholder="Enter Your Password"
            required
          />
        </div>
        <div>
          <label>Confirm Password: </label>
          <input
            type="password"
            name="confirmuserPassword"
            value={formData.confirmuserPassword}
            onChange={handleChange}
            placeholder="Re-Enter Your Password"
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Wait" : "Signup"}
        </button>
        <div>
        Already have an Account  <a onClick={() => navigate("/login")} style={{ margin: "10px" }}>
        User Login
      </a>
        </div>
      </form>
      {fetchedUserData && (
        <div style={{ marginTop: "20px" }}>
          <h3>Fetched User Data:</h3>
          <pre>{JSON.stringify(fetchedUserData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default SignupPage;