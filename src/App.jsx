import { useState, useEffect } from 'react';
import Login from './Login';
import ManagerDashboard from './ManagerDashboard';
import EngineerDashboard from './EngineerDashboard';

function App() {
  const [userRole, setUserRole] = useState(null);
  const [engineers, setEngineers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load role from localStorage on first load
  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    const token = localStorage.getItem("token");

    if (savedRole && token) {
      setUserRole(savedRole);
    } else {
      setUserRole(null);
    }
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No token found. Please log in.');
      setLoading(false);
      return;
    }

    try {
      const [engineersRes, projectsRes, assignmentsRes] = await Promise.all([
        fetch('https://engineering-resource-management-system-gbji.onrender.com/api/engineers', {
          headers: { 'Authorization': `Bearer ${token}` },
        }),
        fetch('https://engineering-resource-management-system-gbji.onrender.com/api/projects', {
          headers: { 'Authorization': `Bearer ${token}` },
        }),
        fetch('https://engineering-resource-management-system-gbji.onrender.com/api/assignments', {
          headers: { 'Authorization': `Bearer ${token}` },
        }),
      ]);

      if (!engineersRes.ok) throw new Error(`Failed to fetch engineers: ${engineersRes.status}`);
      if (!projectsRes.ok) throw new Error(`Failed to fetch projects: ${projectsRes.status}`);
      if (!assignmentsRes.ok) throw new Error(`Failed to fetch assignments: ${assignmentsRes.status}`);

      const engineersData = await engineersRes.json();
      const projectsData = await projectsRes.json();
      const assignmentsData = await assignmentsRes.json();

      setEngineers(engineersData);
      setProjects(projectsData);
      setAssignments(assignmentsData);
      setLoading(false);
    } catch (err) {
      setError('Error fetching data: ' + err.message);
      setLoading(false);
    }
  };

  // Fetch data when role is set
  useEffect(() => {
    if (userRole) {
      fetchData();
    }
  }, [userRole]);

  // On login success
  const handleLogin = (role) => {
    setUserRole(role);
    localStorage.setItem("role", role);
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setUserRole(null);
    setEngineers([]);
    setProjects([]);
    setAssignments([]);
  };

  if (!userRole) {
    return <Login onLogin={handleLogin} />;
  }

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {userRole === "manager" ? (
        <ManagerDashboard
          engineers={engineers}
          projects={projects}
          assignments={assignments}
          onLogout={handleLogout}
        />
      ) : (
        <EngineerDashboard
          engineers={engineers}
          projects={projects}
          assignments={assignments}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}

export default App;
