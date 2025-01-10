
import React from "react";

const BookingPage = () => {
  const logout = () => {
    window.location.href = "/login"; // Redirect to login page
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Welcome to the Booking Page!</h2>
      <p>You are successfully logged in.</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default BookingPage;
