import { useState } from 'react';
import EngineerList from './EngineerList';
import ProjectList from './ProjectList';
import AssignmentList from './AssignmentList';

function ManagerDashboard({ engineers, projects, assignments }) {
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [requiredSkills, setRequiredSkills] = useState("");
  const [status, setStatus] = useState("planning");

  const [showAssignmentForm, setShowAssignmentForm] = useState(false);
  const [selectedEngineer, setSelectedEngineer] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [allocationPercentage, setAllocationPercentage] = useState("");

  const handleCreateProject = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('https://engineering-resource-management-system-gbji.onrender.com/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: projectName,
          description,
          startDate,
          endDate,
          requiredSkills: requiredSkills.split(",").map(skill => skill.trim()),
          status,
        }),
      });
      if (response.ok) {
        const newProject = await response.json();
        projects.push(newProject);
        setProjectName("");
        setDescription("");
        setStartDate("");
        setEndDate("");
        setRequiredSkills("");
        setStatus("planning");
        setShowProjectForm(false);
      } else {
        alert('Failed to create project');
      }
    } catch (err) {
      alert('Error creating project: ' + err.message);
    }
  };

  const handleCreateAssignment = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('https://engineering-resource-management-system-gbji.onrender.com/api/assignments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          engineerId: selectedEngineer,
          projectId: selectedProject,
          allocationPercentage: parseInt(allocationPercentage),
          startDate,
          endDate,
          role: "Developer", // Default role
        }),
      });
      if (response.ok) {
        const newAssignment = await response.json();
        assignments.push(newAssignment);
        setSelectedEngineer("");
        setSelectedProject("");
        setAllocationPercentage("");
        setStartDate("");
        setEndDate("");
        setShowAssignmentForm(false);
      } else {
        alert('Failed to create assignment');
      }
    } catch (err) {
      alert('Error creating assignment: ' + err.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        Manager Dashboard
      </h1>
      {/* Team Utilization Chart */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Team Utilization</h2>
        <div className="space-y-4">
          {engineers.map(engineer => (
            <div key={engineer._id} className="flex items-center space-x-4">
              <span className="w-32 text-gray-700 font-medium">{engineer.name}</span>
              <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                <div
                  className="bg-indigo-600 h-6 rounded-full"
                  style={{ width: `${engineer.currentAllocation}%` }}
                ></div>
                <span className="absolute right-2 top-1 text-xs text-gray-600">
                  {engineer.currentAllocation}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <EngineerList engineers={engineers} />
      <ProjectList projects={projects} />
      {/* Project Creation Form */}
      <div className="p-6 bg-white rounded-xl shadow-lg mt-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Manage Projects</h2>
        <button
          onClick={() => setShowProjectForm(!showProjectForm)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 mb-4"
        >
          {showProjectForm ? "Hide Form" : "Create New Project"}
        </button>
        {showProjectForm && (
          <div className="space-y-4">
            <div>
              <label className="text-gray-600 font-medium">Project Name:</label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1"
              />
            </div>
            <div>
              <label className="text-gray-600 font-medium">Description:</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1"
              />
            </div>
            <div>
              <label className="text-gray-600 font-medium">Start Date:</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1"
              />
            </div>
            <div>
              <label className="text-gray-600 font-medium">End Date:</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1"
              />
            </div>
            <div>
              <label className="text-gray-600 font-medium">Required Skills (comma-separated):</label>
              <input
                type="text"
                value={requiredSkills}
                onChange={(e) => setRequiredSkills(e.target.value)}
                className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1"
                placeholder="e.g., React, Node.js"
              />
            </div>
            <div>
              <label className="text-gray-600 font-medium">Status:</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1"
              >
                <option value="planning">Planning</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleCreateProject}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Create Project
              </button>
              <button
                onClick={() => setShowProjectForm(false)}
                className="bg-gray-300 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-400 transition duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
      <AssignmentList assignments={assignments} engineers={engineers} projects={projects} />
      {/* Assignment Creation Form */}
      <div className="p-6 bg-white rounded-xl shadow-lg mt-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create Assignment</h2>
        <button
          onClick={() => setShowAssignmentForm(!showAssignmentForm)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 mb-4"
        >
          {showAssignmentForm ? "Hide Form" : "Create New Assignment"}
        </button>
        {showAssignmentForm && (
          <div className="space-y-4">
            <select
              value={selectedEngineer}
              onChange={(e) => setSelectedEngineer(e.target.value)}
              className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Engineer</option>
              {engineers.map(engineer => (
                <option key={engineer._id} value={engineer._id}>
                  {engineer.name}
                </option>
              ))}
            </select>
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Project</option>
              {projects.map(project => (
                <option key={project._id} value={project._id}>
                  {project.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Allocation Percentage"
              value={allocationPercentage}
              onChange={(e) => setAllocationPercentage(e.target.value)}
              className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div>
              <label className="text-gray-600 font-medium">Start Date:</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1"
              />
            </div>
            <div>
              <label className="text-gray-600 font-medium">End Date:</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1"
              />
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleCreateAssignment}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Create Assignment
              </button>
              <button
                onClick={() => setShowAssignmentForm(false)}
                className="bg-gray-300 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-400 transition duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManagerDashboard;