// import { useState } from "react";

// export const handleLogin = async (event) => {
//     event.preventDefault();
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
    
//     const response = await fetch('https://your-backend-url.com/api/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         email,
//         password,
//       }),
//     });

//     if (response.ok) {
//       const data = await response.json();
//       console.log('Login successful:', data);
//       // Handle successful login (e.g., save token, redirect, etc.)
//     } else {
//       console.error('Login failed');
//       // Handle login failure (e.g., show error message)
//     }
//   };