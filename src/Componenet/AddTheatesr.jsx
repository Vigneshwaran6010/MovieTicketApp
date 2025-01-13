// import React, { useState } from 'react';
// import axios from 'axios';

// const AddTheaters = () => {
//   const [theaterData, setTheaterData] = useState({
//     theatreName: "",
//     location: { streetName: "", landMark: "", pinCode: "" },
//     screen: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState(null);
//   const [errorMessage, setErrorMessage] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name.startsWith("location.")) {
//       const fieldName = name.split(".")[1]; // Extract the field name after "location."
//       setTheaterData((prev) => ({
//         ...prev,
//         location: {
//           ...prev.location,
//           [fieldName]: value,
//         },
//       }));
//     } else {
//       setTheaterData({ ...theaterData, [name]: value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setLoading(true);
//     setSuccessMessage(null);
//     setErrorMessage(null);

//     try {
//       const response = await axios.post('http://192.168.188.251:8080/Theatre', theaterData, {
//         headers: { 'Content-Type': 'application/json' },
//       });

//       if (response.status === 201) { // Assuming 201 status for created
//         setSuccessMessage('Theater created successfully!');
//         setTheaterData({
//           theatreName: "",
//           location: { streetName: "", landMark: "", pinCode: "" },
//           screen: "",
//         }); // Reset form
//       }
//     } catch (error) {
//       setErrorMessage(
//         error.response?.data?.message || 'Failed to create theater. Please try again.'
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="create-theater-container">
//       <h2>Create New Theater</h2>
//       <form onSubmit={handleSubmit} className="create-theater-form">
//         <div className="form-group">
//           <label htmlFor="theatreName">Theater Name:</label>
//           <input
//             type="text"
//             id="theatreName"
//             name="theatreName"
//             value={theaterData.theatreName}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="location-streetName">Street Name:</label>
//           <input
//             type="text"
//             id="location-streetName"
//             name="location.streetName"
//             value={theaterData.location.streetName}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="location-landMark">Landmark:</label>
//           <input
//             type="text"
//             id="location-landMark"
//             name="location.landMark"
//             value={theaterData.location.landMark}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="location-pinCode">Pin Code:</label>
//           <input
//             type="text"
//             id="location-pinCode"
//             name="location.pinCode"
//             value={theaterData.location.pinCode}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="screen">Screen:</label>
//           <input
//             type="number"
//             id="screen"
//             name="screen"
//             value={theaterData.screen}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <button type="submit" className="submit-button" disabled={loading}>
//           {loading ? 'Creating...' : 'Create Theater'}
//         </button>
//       </form>
//       {successMessage && <div className="success-message">{successMessage}</div>}
//       {errorMessage && <div className="error-message">{errorMessage}</div>}
//     </div>
//   );
// };

// export default AddTheaters;
import React, { useState } from 'react';
import axios from 'axios';

const AddTheaters = () => {
  const [theaterData, setTheaterData] = useState({
    theatreName: '',
    location: { streetName: '', landMark: '', pinCode: '' },
    screen: [{ screenName: '', capacity: '' }],
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('location.')) {
      const fieldName = name.split('.')[1]; // Extract the field name after "location."
      setTheaterData((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          [fieldName]: value,
        },
      }));
    } else if (name.startsWith('screen.')) {
      const [_, index, fieldName] = name.split('.'); // Extract index and field name
      setTheaterData((prev) => {
        const updatedScreens = [...prev.screen];
        updatedScreens[index] = { ...updatedScreens[index], [fieldName]: value };
        return { ...prev, screen: updatedScreens };
      });
    } else {
      setTheaterData({ ...theaterData, [name]: value });
    }
  };

  const addScreen = () => {
    setTheaterData((prev) => ({
      ...prev,
      screen: [...prev.screen, { screenName: '', capacity: '' }],
    }));
  };

  const removeScreen = (index) => {
    setTheaterData((prev) => ({
      ...prev,
      screen: prev.screen.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const response = await axios.post('http://localhost:8080/theatre', theaterData, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 201) {
        setSuccessMessage('Theater created successfully!');
        setTheaterData({
          theatreName: '',
          location: { streetName: '', landMark: '', pinCode: '' },
          screen: [{ screenName: '', capacity: '' }],
        });
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || 'Failed to create theater. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-theater-container">
      <h2>Create New Theater</h2>
      <form onSubmit={handleSubmit} className="create-theater-form">
        <div className="form-group">
          <label htmlFor="theatreName">Theater Name:</label>
          <input
            type="text"
            id="theatreName"
            name="theatreName"
            value={theaterData.theatreName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="location-streetName">Street Name:</label>
          <input
            type="text"
            id="location-streetName"
            name="location.streetName"
            value={theaterData.location.streetName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="location-landMark">Landmark:</label>
          <input
            type="text"
            id="location-landMark"
            name="location.landMark"
            value={theaterData.location.landMark}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="location-pinCode">Pin Code:</label>
          <input
            type="text"
            id="location-pinCode"
            name="location.pinCode"
            value={theaterData.location.pinCode}
            onChange={handleChange}
            required
          />
        </div>
        {theaterData.screen.map((screen, index) => (
          <div key={index} className="form-group screen-group">
            <label htmlFor={`screen-${index}-screenName`}>Screen Name:</label>
            <input
              type="text"
              id={`screen-${index}-screenName`}
              name={`screen.${index}.screenName`}
              value={screen.screenName}
              onChange={handleChange}
              required
            />
            <label htmlFor={`screen-${index}-capacity`}>Capacity:</label>
            <input
              type="number"
              id={`screen-${index}-capacity`}
              name={`screen.${index}.capacity`}
              value={screen.capacity}
              onChange={handleChange}
              required
            />
            {theaterData.screen.length > 1 && (
              <button type="button" onClick={() => removeScreen(index)}>
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addScreen}>
          Add Screen
        </button>
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Creating...' : 'Create Theater'}
        </button>
      </form>
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default AddTheaters;