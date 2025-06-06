import { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting form data:", form);

    try {
      const { firstName, lastName, email, password } = form;

      const response = await axios.post("http://localhost:5000/api/auth/signup", {
        firstName,
        lastName,
        email,
        password,
      });

      console.log("Signup successful:", response.data);
      alert("Signup successful");
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Signup failed. Check console for details.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="firstName" placeholder="First Name" onChange={handleChange} required />
      <input name="lastName" placeholder="Last Name" onChange={handleChange} required />
      <input name="email" placeholder="Email" type="email" onChange={handleChange} required />
      <input name="password" placeholder="Password" type="password" onChange={handleChange} required />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;
