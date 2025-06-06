import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Login data:", form);

    try {
      const { email, password } = form;

      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      console.log("Login success:", response.data);
      alert("Login successful");
      // You can store JWT token here, etc.
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        width: "300px",
        margin: "0 auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <input
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleChange}
        required
        style={{
          marginBottom: "15px",
          padding: "10px",
          fontSize: "16px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          outline: "none",
        }}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        required
        style={{
          marginBottom: "15px",
          padding: "10px",
          fontSize: "16px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          outline: "none",
        }}
      />
      <button
        type="submit"
        style={{
          padding: "12px",
          fontSize: "16px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Login
      </button>
      <Link to="/forgot-password">
      <a style={{cursor:"pointer",padding:"0 5px"}} >forgot password</a>
      </Link>
    </form>
    
    </> 
  );  
};

export default Login;
