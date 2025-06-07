import { useState } from 'react';

function EngineerList({ engineers }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEngineers = engineers.filter(engineer =>
    engineer.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Engineers</h2>
      <input
        type="text"
        placeholder="Search by skill..."
        className="border border-gray-300 p-3 mb-6 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEngineers.map(engineer => (
          <div
            key={engineer.id}
            className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition duration-300"
          >
            <h3 className="text-xl font-semibold text-gray-800">{engineer.name}</h3>
            <p className="text-gray-600 mt-1">Seniority: {engineer.seniority}</p>
            <div className="mt-2">
              <p className="text-gray-600">Skills:</p>
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
            <p className="text-gray-600 mt-2">Capacity: {engineer.maxCapacity}%</p>
            <p className="text-gray-600">Allocated: {engineer.currentAllocation}%</p>
            <div className="w-full bg-gray-200 rounded-full h-4 mt-3 relative">
              <div
                className="bg-blue-600 h-4 rounded-full"
                style={{ width: `${engineer.currentAllocation}%` }}
              ></div>
              <span className="absolute right-2 top-0 text-xs text-gray-600">
                {engineer.currentAllocation}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EngineerList;