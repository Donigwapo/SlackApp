import { useState } from 'react';
//import { Button } from './Button';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password_confirmation: '',
  });

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  
  };

  useEffect(() => {
    
  }, [formData]);

  const inputFieldClick = (e) => {
    e.stopPropagation();
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response = await fetch('http://206.189.91.54/api/v1/auth/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
      console.log(`HTTP error! Status: ${response.status}`);
      console.log('Error Details:', errorData.errors.full_messages[0]);

      throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.errors.full_messages[0]}`);
      }
  
      const result = await response.json();
      setData(result);
  
      // Log the entire response for debugging
      console.log('Response:', result);
  
      // Check if the email and password are saved
      if (result && result.data.uid === formData.email) {
        console.log('Email and password saved successfully:', result);
        navigate('/message-panel/create-alias');
      } else {
        console.error('Email and password not saved:', result);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    // Add other styles as needed
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={formStyle}>
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onClick={inputFieldClick} onChange={handleChange} required className="input--default" />

        <label>Password:</label>
        <input type="password" name="password" value={formData.password} onClick={inputFieldClick} onChange={handleChange} required className="input--default"/>

        <label>Confirm Password:</label>
        <input
          type="password"
          name="password_confirmation"
          value={formData.password_confirmation}
          onChange={handleChange}
          required
          className="input--default"
          onClick={inputFieldClick}
        />

        <button type="submit" className='btn--outlineBlack'>Register</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && ""}
      {data && ""}
    </div>
  );
};

export default RegistrationForm;