import { useState } from 'react';
//import { Button } from './Button';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toastSuccess, toastError } from '../utils/toastify';
import { toast } from 'react-toastify';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password_confirmation: '',
  });

  const [data, setData] = useState(null);
  const [error] = useState(null);
  const navigate = useNavigate(); 
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    e.preventDefault();

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
      toast.dismiss();
      toastError(`${errorData.errors.full_messages[0]}`);
      }
  
      const result = await response.json();
      setData(result);
  
      // Log the entire response for debugging
      console.log('Response:', result);
  
      // Check if the email and password are saved
      if (result && result.data.uid === formData.email) {
        toastSuccess("Registration Successfull")
        toast.dismiss();
        navigate('/loginPage');
      } else {
        toastError('Email and password not saved:', result);
        
      }
    } catch (error) {
     // setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
  toast.loading("Please Wait")
  }


  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    // Add other styles as needed
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={formStyle}>
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onClick={inputFieldClick} onChange={handleChange} required  />

        <label>Password:</label>
        <input type="password" name="password" value={formData.password} onClick={inputFieldClick} onChange={handleChange} required />

        <label>Confirm Password:</label>
        <input
          type="password"
          name="password_confirmation"
          value={formData.password_confirmation}
          onChange={handleChange}
          required
          onClick={inputFieldClick}
        />

        <button type="submit" className='btn--outlineBlack'onClick={inputFieldClick}>Register </button>
      </form>

     
      { <p>{error}</p>}
      {data && ""}
    </div>
  );
};

export default RegistrationForm;