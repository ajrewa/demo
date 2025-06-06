import { useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const NewPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, {
      newPassword: password
    });
    setSuccess(true);
  };

  return success ? (
    <p>Password successfully updated!</p>
  ) : (
    <form onSubmit={handleSubmit}>
      <input type="password" placeholder="New Password" onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Update Password</button>
    </form>
  );
};

export default NewPassword;