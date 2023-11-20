
import { useState, useEffect } from 'react';
//import ThemeBtn from '@components/ThemeBtn';
import { ThemeProvider } from '@context/theme';
import { UserProvider } from '@context/userContext';
//import DisplayUsername from '@components/DisplayUsername';

function LoginPage() {
  const [themeMode, setThemeMode] = useState('light');
  const [username, setUsername] = useState('');

  const darkTheme = () => {
    setThemeMode('dark');
  };

  const lightTheme = () => {
    setThemeMode('light');
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const enteredUsername = e.target.elements.username.value;
    setUsername(enteredUsername);

    

  };
  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    lineHeight: '4rem',
  
  };

  useEffect(() => {
    document.body.classList.remove('dark', 'light');
    document.body.classList.add(themeMode);
  }, [themeMode]);
  
 

  return (
    <ThemeProvider value={{ themeMode, darkTheme, lightTheme }}>
      <UserProvider value={{ username, setUsername }}>
        
        <div className="loginContainer">
          <div className='loginImage'>
            <img src="src/images/loginPic.png" alt="Working happy ever after."/>
        
          </div>
          <div className='loginForms'>.
          
          <form onSubmit={handleLogin}style={formStyle}>
          <h4>Sign in to Connectwave</h4>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" required className='inputStyle'/>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required className='inputStyle'/>
            <button style={{ visibility: 'hidden', opacity: 0, height: '20px'}}>Submit</button>
            <button type="submit" className="submit">Submit
            <img src="https://www.svgrepo.com/download/166617/right-arrow.svg"  style={{fill: 'red'}} alt="Right Arrow" width="50" height="50" />
            </button>
          </form> 
          
          </div>
        
        </div>
        {/* Your other components */}
      </UserProvider>
    </ThemeProvider>
  );
}



export default LoginPage;