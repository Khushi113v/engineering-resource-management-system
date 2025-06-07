export const engineers = [
  { id: 1, name: "John Doe", skills: ["React", "Node.js"], seniority: "senior", maxCapacity: 100, currentAllocation: 80 },
  { id: 2, name: "Jane Smith", skills: ["Python", "React"], seniority: "mid", maxCapacity: 50, currentAllocation: 40 },
  { id: 3, name: "Alice Brown", skills: ["Node.js"], seniority: "junior", maxCapacity: 100, currentAllocation: 60 },
  { id: 4, name: "Bob Wilson", skills: ["React"], seniority: "mid", maxCapacity: 50, currentAllocation: 30 },
];

export const projects = [
  { id: 1, name: "E-commerce App", description: "Online store", startDate: "2025-01-01", endDate: "2025-06-30", requiredSkills: ["React", "Node.js"], status: "active" },
  { id: 2, name: "Data Pipeline", description: "Process data", startDate: "2025-02-01", endDate: "2025-07-31", requiredSkills: ["Python"], status: "planning" },
  { id: 3, name: "API Service", description: "Backend service", startDate: "2025-03-01", endDate: "2025-08-31", requiredSkills: ["Node.js"], status: "active" },
];

export const assignments = [
  { id: 1, engineerId: 1, projectId: 1, allocationPercentage: 50, startDate: "2025-01-01", endDate: "2025-06-30", role: "Developer" },
  { id: 2, engineerId: 1, projectId: 3, allocationPercentage: 30, startDate: "2025-03-01", endDate: "2025-08-31", role: "Tech Lead" },
  { id: 3, engineerId: 2, projectId: 2, allocationPercentage: 40, startDate: "2025-02-01", endDate: "2025-07-31", role: "Developer" },
  { id: 4, engineerId: 3, projectId: 1, allocationPercentage: 60, startDate: "2025-01-01", endDate: "2025-06-30", role: "Developer" },
  { id: 5, engineerId: 4, projectId: 3, allocationPercentage: 30, startDate: "2025-03-01", endDate: "2025-08-31", role: "Developer" },
];