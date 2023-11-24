
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function LoginPage() {

  const [loginData, setLoginData] = useState({
    email: '', 
    password: '',
  });

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    // Retrieve authentication information from local storage when the component mounts
    const storedAccessToken = localStorage.getItem('access-token');
    const storedClient = localStorage.getItem('client');
    const storedExpiry = localStorage.getItem('expiry');
    const storedUid = localStorage.getItem('uid');

    // Check if all values are present in local storage
    if (storedAccessToken && storedClient && storedExpiry && storedUid) {
      // Set the authentication information in the state
      setUserData({
        data: {
          id: null,
          email: null,
          provider: null,
          uid: storedUid,
          allow_password_change: false,
          name: null,
          nickname: null,
          image: null,
        },
      });

      // Log in console for verification
      console.log('Authentication information retrieved from local storage:', {
        accessToken: storedAccessToken,
        client: storedClient,
        expiry: storedExpiry,
        uid: storedUid,
      });
    }
  }, []); 

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
      const userEmail = result.data.email;
      localStorage.setItem('email', userEmail);
      setUserData(result);
      navigate('/message-panel');

      // Access the authentication headers
      const accessToken = response.headers.get('access-token');
      const client = response.headers.get('client');
      const expiry = response.headers.get('expiry');
      const uid = response.headers.get('uid');

           // Store authentication information in local storage
      localStorage.setItem('access-token', accessToken);
      localStorage.setItem('client', client);
      localStorage.setItem('expiry', expiry);
      localStorage.setItem('uid', uid);

      // Store these values in your state or wherever is appropriate for your application
      // You may want to use a state management library or local storage

    } catch (error) {
      setError(error.message);
      console.log('Login failed:', error.message);
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