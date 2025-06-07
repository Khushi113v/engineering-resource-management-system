import { useState } from 'react';
import AssignmentList from './AssignmentList';

function EngineerDashboard({ engineers, projects, assignments }) {
  const [engineer, setEngineer] = useState(engineers[0]); // Simulate logged-in engineer (first one)
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(engineer.name);
  const [skills, setSkills] = useState(engineer.skills.join(", "));
  const myAssignments = assignments.filter(a => a.engineerId === engineer._id);

  const handleUpdateProfile = async () => {
    const updatedSkills = skills.split(",").map(skill => skill.trim());
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5000/api/engineers/${engineer._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name, skills: updatedSkills }),
      });
      if (response.ok) {
        const updatedEngineer = await response.json();
        setEngineer(updatedEngineer);
        setIsEditing(false);
        // Update the engineers array in the parent state
        engineers[0] = updatedEngineer;
      } else {
        alert('Failed to update profile');
      }
    } catch (err) {
      alert('Error updating profile: ' + err.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        Engineer Dashboard
      </h1>
      <div className="bg-white border rounded-xl p-6 shadow-lg mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Profile</h2>
        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="text-gray-600 font-medium">Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1"
              />
            </div>
            <div>
              <label className="text-gray-600 font-medium">Skills (comma-separated):</label>
              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1"
                placeholder="e.g., React, Node.js"
              />
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleUpdateProfile}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-300 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-400 transition duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-gray-600">
              <strong className="text-gray-800">Name:</strong> {engineer.name}
            </p>
            <div>
              <p className="text-gray-600">
                <strong className="text-gray-800">Skills:</strong>
              </p>
              <div className="flex flex-wrap gap-2 mt-1">
                {engineer.skills.map(skill => (
                  <span
                    key={skill}
                    className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <p className="text-gray-600">
              <strong className="text-gray-800">Seniority:</strong> {engineer.seniority}
            </p>
            <p className="text-gray-600">
              <strong className="text-gray-800">Capacity:</strong> {engineer.maxCapacity}%
            </p>
            <p className="text-gray-600">
              <strong className="text-gray-800">Allocated:</strong> {engineer.currentAllocation}%
            </p>
            <div className="w-full bg-gray-200 rounded-full h-4 mt-3 relative">
              <div
                className="bg-blue-600 h-4 rounded-full"
                style={{ width: `${engineer.currentAllocation}%` }}
              ></div>
              <span className="absolute right-2 top-0 text-xs text-gray-600">
                {engineer.currentAllocation}%
              </span>
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
      <AssignmentList assignments={myAssignments} engineers={engineers} projects={projects} />
    </div>
  );
}

export default EngineerDashboard;