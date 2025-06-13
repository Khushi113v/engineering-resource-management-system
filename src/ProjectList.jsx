function ProjectList({ projects }) {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects?.map(project => (
          <div
            key={project.id}
            className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition duration-300"
          >
            <h3 className="text-xl font-semibold text-gray-800">{project.name}</h3>
            <p className="text-gray-600 mt-1">{project.description}</p>
            <p className="text-gray-600 mt-2">Start: {project.startDate}</p>
            <p className="text-gray-600">End: {project.endDate}</p>
            <div className="mt-2">
              <p className="text-gray-600">Required Skills:</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {project.requiredSkills?.map(skill => (
                  <span
                    key={skill}
                    className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <p className="mt-2">
              <span
                className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                  project.status === "active"
                    ? "bg-green-200 text-green-800"
                    : project.status === "planning"
                    ? "bg-yellow-200 text-yellow-800"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {project.status}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectList;
