// src/components/Screen.jsx
import React, { useState } from 'react';
import axios from 'axios';

const Screen = () => {
  const [screenDetails, setScreenDetails] = useState({
    screenName: "",
    screenTotalSeats: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setScreenDetails({ ...screenDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const response = await axios.post('http://localhost:8080/Screen', screenDetails, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 201) { // Assuming 201 status for created
        setSuccessMessage('Screen created successfully!');
        setScreenDetails({
          screenName: "",
          screenTotalSeats: "",
        }); // Reset form
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || 'Failed to create screen. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-screen-container">
      <h2>Create Screen</h2>
      <form onSubmit={handleSubmit} className="create-screen-form">
        <div className="form-group">
          <label htmlFor="screenName">Screen Name:</label>
          <input
            type="text"
            id="screenName"
            name="screenName"
            value={screenDetails.screenName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="screenTotalSeats">Total Seats:</label>
          <input
            type="number"
            id="screenTotalSeats"
            name="screenTotalSeats"
            value={screenDetails.screenTotalSeats}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Creating...' : 'Create Screen'}
        </button>
      </form>
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default Screen;