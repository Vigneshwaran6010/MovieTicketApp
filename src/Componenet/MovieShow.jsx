import React, { useState } from 'react';
import axios from 'axios';

const MovieShow = () => {
  const [movieDetails, setMovieDetails] = useState({
    theatreId: "",
    screenId: "",
    showTiming: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieDetails({ ...movieDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const response = await axios.post('http://192.168.1.243:8080/Show', movieDetails, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 201) { // Assuming 201 status for created
        setSuccessMessage('Movie Show details created successfully!');
        setMovieDetails({
          theatreId: "",
          screenId: "",
          showTiming: "",
        }); // Reset form
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || 'Failed to create movie show. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-movie-show-container">
      <h2>Create Movie Show</h2>
      <form onSubmit={handleSubmit} className="create-movie-show-form">
        <div className="form-group">
          <label htmlFor="theatreId">Theater ID:</label>
          <input
            type="text"
            id="theatreId"
            name="theatreId"
            value={movieDetails.theatreId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="screenId">Screen ID:</label>
          <input
            type="text"
            id="screenId"
            name="screenId"
            value={movieDetails.screenId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="showTiming">Show Timing:</label>
          <input
            type="text"
            id="showTiming"
            name="showTiming"
            value={movieDetails.showTiming}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Creating...' : 'Create Movie Show'}
        </button>
      </form>
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default MovieShow;