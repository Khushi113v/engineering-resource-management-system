import { useState } from 'react';

function Login({ onLogin }) {
  const [role, setRole] = useState("manager");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); 

  const handleLogin = async () => {
    setLoading(true); 
    setError(""); 

    try {
      const response = await fetch(
        'https://engineering-resource-management-system-gbji.onrender.com/api/auth/login',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: role, password: 'password123' }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        onLogin(role);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-sm w-full">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Login</h2>
        
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <select
          className="border border-gray-300 p-3 mb-6 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          disabled={loading}
        >
          <option value="manager">Manager</option>
          <option value="engineer">Engineer</option>
        </select>

        <button
          className={`${
            loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          } text-white px-6 py-3 w-full rounded-lg transition duration-300`}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </div>
    </div>
  );
}

export default Login;
