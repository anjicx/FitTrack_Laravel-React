import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/login.css"; // Koristimo isti CSS stil forme

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // za prikaz uspešne registracije
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage(""); // Resetujemo prethodnu poruku
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/register",
        formData
      );
      setSuccessMessage("Successful registration! Redirecting..."); // Postavljamo poruku
      setTimeout(() => {
        navigate("/dashboard"); // Preusmeravanje na glavnu stranicu
      }, 2000); // 2 sekunde preusmerenje da ne bude odmah
      localStorage.setItem("token", response.data.token); // Čuva token u localStorage!!!
    } catch (error) {
      console.error(
        "Registration error:",
        error.response?.data || error.message
      );
      if (error.response) {
        setErrorMessage(error.response.data.message || "An error occurred.");
      } else {
        setErrorMessage("Server error. Please try again later.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {errorMessage && (
          <div className="alert alert-danger text-center">{errorMessage}</div>
        )}

        {successMessage && ( //ovde dodajemo
          <div className="alert alert-success text-center">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="username"
              className="form-control p-2"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control p-2"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control p-2"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              name="password_confirmation"
              className="form-control p-2"
              placeholder="Confirm password"
              value={formData.password_confirmation}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 py-2">
            REGISTER
          </button>
        </form>

        <p className="register-text">
          Already have an account? <a href="/">Login here</a>.
        </p>
      </div>
    </div>
  );
};

export default Register;
