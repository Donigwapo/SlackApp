
import { useState, useEffect } from 'react';
import ThemeBtn from '@components/ThemeBtn';
import { ThemeProvider } from '@context/theme';
import { UserProvider } from '@context/userContext';
import DisplayUsername from '@components/DisplayUsername';

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
    // Add other styles as needed
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
          
          <h2>Sign in to Connectwave</h2>
          <ThemeBtn />
          <form onSubmit={handleLogin}style={formStyle}>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" required />

            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />

            <button type="submit">Submit</button>
          
          </form>
          
          </div>
          <DisplayUsername />
        </div>
        {/* Your other components */}
      </UserProvider>
    </ThemeProvider>
  );
}



export default LoginPage;