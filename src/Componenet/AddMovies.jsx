import React, { useState } from 'react';
import axios from 'axios';

const AddMovies = () => {
  const [movie, setMovie] = useState({
    movieTitle: '',
    duration: '',
    language: '',
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const response = await axios.post('http://localhost:8080/Movie', movie, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) { // Assuming 201 for successful creation
        setSuccessMessage('Movie added successfully!');
        setMovie({ movieTitle: '', duration: '', language: '' }); // Reset form
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || 'Failed to add movie. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2>Add a New Movie</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <label>
          Movie Title:
          <input
            type="text"
            name="movieTitle"
            value={movie.movieTitle}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Duration (in minutes):
          <input
            type="number"
            name="duration"
            value={movie.duration}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Language:
          <input
            type="text"
            name="language"
            value={movie.language}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit" style={{ marginTop: '10px' }} disabled={loading}>
          {loading ? 'Adding...' : 'Add Movie'}
        </button>
      </form>
      {successMessage && <div style={{ color: 'green', marginTop: '10px' }}>{successMessage}</div>}
      {errorMessage && <div style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</div>}
    </div>
  );
};

export default AddMovies;