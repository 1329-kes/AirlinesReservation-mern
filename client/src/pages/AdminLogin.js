import React, { useState } from 'react';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault(); // Prevents default form submission

    // Here, you can perform authentication logic (e.g., sending a request to a server)

    // For simplicity, hardcoding credentials for demonstration purposes
    const adminUsername = 'admin';
    const adminPassword = 'admin';

    if (username === adminUsername && password === adminPassword) {
        setIsLoggedIn(true);
      alert('Login successful!');
        
      

    
      // You can redirect to another page or perform further actions upon successful login
    } else {
      alert('Invalid credentials. Please try again.');
      // You might want to handle incorrect login attempts differently (e.g., showing an error message)
    }
  };

  if (isLoggedIn) {
    // You can render a different component or redirect to another page upon successful login
    return <div>
            <a href="/admin">Admin Home</a>
        </div>;
    
  }
  

  return (
    <div>
      <h2>Admin Login</h2>
      
      <form onSubmit={handleLogin}>
        <div >
        <pre><label>Username:</label>   <input type="text" value={username} onChange={handleUsernameChange} placeholder="Enter username"/>
          </pre>
        </div>

        
        <div>
        <pre><label>Password:</label>   <input type="password" value={password} onChange={handlePasswordChange} placeholder="Enter password"/>
          </pre>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
