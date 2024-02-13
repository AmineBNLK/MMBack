// login.js
document.getElementById('login').addEventListener('submit', async function (event) {
    event.preventDefault();
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    try {
      const response = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
  
      // Redirect to profile page or show success message
      window.location.href = '/profile';
    } catch (error) {
      document.getElementById('message').textContent = error.message;
    }
  });
  