
import { useState } from 'react';


function LoginPage() {

  const [loginData, setLoginData] = useState({
    email: '', 
    password: '',
  });

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };


  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://206.189.91.54/api/v1/auth/sign_in/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.errors[0]}`);
      }

      const result = await response.json();
      setUserData(result);

      console.log('Login successful:', result);

      // Access the authentication headers
      const accessToken = response.headers.get('access-token');
      const client = response.headers.get('client');
      const expiry = response.headers.get('expiry');
      const uid = response.headers.get('uid');

      console.log('Access Token:', accessToken);
      console.log('Client:', client);
      console.log('Expiry:', expiry);
      console.log('UID:', uid);

      // Store these values in your state or wherever is appropriate for your application
      // You may want to use a state management library or local storage

    } catch (error) {
      setError(error.message);
      console.error('Login failed:', error.message);
    } finally {
      setLoading(false);
    }
  };


  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    lineHeight: '4rem',
  
  };



  return (
  
        <div className="loginContainer">
          <div className='loginImage'>
            <img src="src/images/loginPic.png" alt="Working happy ever after."/>
        
          </div>
          <div className='loginForms'>.
          
          <form onSubmit={handleLogin}style={formStyle}>
          <h4>Sign in to Connectwave</h4>
            <label htmlFor="email">Email:</label>
            <input type="text" id="email" name="email" value={loginData.email} onChange={handleChange} required className='inputStyle'/>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" value={loginData.password} onChange={handleChange} required className='inputStyle'/>
            <button style={{ visibility: 'hidden', opacity: 0, height: '20px'}}>Submit</button>
            <button type="submit" className="submit">Submit
            <img src="https://www.svgrepo.com/download/166617/right-arrow.svg"  style={{fill: ''}} alt="Right Arrow" width="50" height="50" />
            </button>

            {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {userData && <p>Login successful!</p>}
          </form> 
          
          </div>
        
        </div>
  
  );
}



export default LoginPage;