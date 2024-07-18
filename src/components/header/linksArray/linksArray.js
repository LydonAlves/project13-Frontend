export const links = [
  { path: '/create-exercise', label: 'Create Exercise', roles: ['admin', "teacher",] },
  { path: '/my-activities', label: 'My Activities', roles: ['admin', "teacher",] },
  { path: '/class-manager', label: 'Class Manager', roles: ['admin', "teacher",] },
  { path: '/students-page', label: "Student's page", roles: ["student", "noClassAssigned"] },
  { path: '/speaking-corrections', label: 'Speaking corrections', roles: ["student", "noClassAssigned"] },
  { path: '/user-manager', label: 'Manage Users', roles: ['admin', "teacher"] },
  { path: '/join-class', label: 'Join Class', roles: ['admin', "student"] },
];
