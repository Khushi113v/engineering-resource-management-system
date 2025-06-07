function AssignmentList({ assignments, engineers, projects }) {
  // Function to calculate timeline width (simplified)
  const getTimelineWidth = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const totalDays = (end - start) / (1000 * 60 * 60 * 24); // Difference in days
    return Math.min(totalDays / 365 * 100, 100); // Simplified: assuming 365 days max
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Assignments</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assignments.map(assignment => {
          const engineer = engineers.find(e => e._id === assignment.engineerId._id);
          const project = projects.find(p => p._id === assignment.projectId._id);
          const timelineWidth = getTimelineWidth(assignment.startDate, assignment.endDate);
          return (
            <div
              key={assignment._id}
              className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition duration-300"
            >
              <p className="text-gray-600">
                <strong className="text-gray-800">Engineer:</strong>{" "}
                {engineer ? engineer.name : "Unknown"}
              </p>
              <p className="text-gray-600 mt-1">
                <strong className="text-gray-800">Project:</strong>{" "}
                {project ? project.name : "Unknown"}
              </p>
              <p className="text-gray-600 mt-1">
                <strong className="text-gray-800">Allocation:</strong>{" "}
                {assignment.allocationPercentage}%
              </p>
              <p className="text-gray-600 mt-1">
                <strong className="text-gray-800">Role:</strong> {assignment.role}
              </p>
              <p className="text-gray-600 mt-1">
                <strong className="text-gray-800">Start:</strong>{" "}
                {new Date(assignment.startDate).toISOString().split('T')[0]}
              </p>
              <p className="text-gray-600 mt-1">
                <strong className="text-gray-800">End:</strong>{" "}
                {new Date(assignment.endDate).toISOString().split('T')[0]}
              </p>
              <div className="mt-3">
                <p className="text-gray-600">Timeline:</p>
                <div className="w-full bg-gray-200 rounded-full h-4 mt-1 relative">
                  <div
                    className="bg-green-600 h-4 rounded-full"
                    style={{ width: `${timelineWidth}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AssignmentList;