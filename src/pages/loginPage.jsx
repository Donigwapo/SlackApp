// App.jsx

import { useState, useEffect } from 'react';
//import './App.css';
import ThemeBtn from '../components/ThemeBtn';
import { ThemeProvider } from '../context/theme';
import { UserProvider } from '../context/userContext';
import DisplayUsername from '../components/DisplayUsername';

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
    // You can add validation and authentication logic here
    // For simplicity, let's just set the username from the input
    const enteredUsername = e.target.elements.username.value;
    setUsername(enteredUsername);

    

  };

  useEffect(() => {
    document.body.classList.remove('dark', 'light');
    document.body.classList.add(themeMode);
  }, [themeMode]);
  return (
    <ThemeProvider value={{ themeMode, darkTheme, lightTheme }}>
      <UserProvider value={{ username, setUsername }}>
        <ThemeBtn />
        <div>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" required />

            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />

            <button type="submit">Submit</button>
          </form>
          <DisplayUsername />
        </div>
        {/* Your other components */}
      </UserProvider>
    </ThemeProvider>
  );
}



export default LoginPage;