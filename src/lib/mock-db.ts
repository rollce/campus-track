export type UserRole = "student" | "mentor" | "admin";

export type TaskStatus = "Backlog" | "In Progress" | "Review" | "Done";

export interface Task {
  id: string;
  title: string;
  course: string;
  owner: string;
  deadline: string;
  status: TaskStatus;
  priority: "Low" | "Medium" | "High";
}

export interface Project {
  id: string;
  name: string;
  owner: string;
  completion: number;
  health: "Healthy" | "Needs attention";
  nextReview: string;
}

const tasks: Task[] = [
  {
    id: "task-1",
    title: "Finalize literature review",
    course: "Data Visualization",
    owner: "Mia",
    deadline: "2026-03-18",
    status: "In Progress",
    priority: "High",
  },
  {
    id: "task-2",
    title: "API endpoint tests",
    course: "Software Engineering",
    owner: "Leo",
    deadline: "2026-03-20",
    status: "Backlog",
    priority: "Medium",
  },
  {
    id: "task-3",
    title: "Mentor feedback session",
    course: "Human-Computer Interaction",
    owner: "Nina",
    deadline: "2026-03-22",
    status: "Review",
    priority: "Low",
  },
  {
    id: "task-4",
    title: "Deploy project preview",
    course: "Web Systems",
    owner: "Mia",
    deadline: "2026-03-15",
    status: "Done",
    priority: "High",
  },
];

const projects: Project[] = [
  {
    id: "project-1",
    name: "Civic Data Dashboard",
    owner: "Team Alpha",
    completion: 78,
    health: "Healthy",
    nextReview: "2026-03-19",
  },
  {
    id: "project-2",
    name: "UX Study Companion",
    owner: "Team Pixel",
    completion: 61,
    health: "Needs attention",
    nextReview: "2026-03-17",
  },
  {
    id: "project-3",
    name: "Essay Analyzer MVP",
    owner: "Team Nova",
    completion: 84,
    health: "Healthy",
    nextReview: "2026-03-24",
  },
];

export function getProjects(): Project[] {
  return projects;
}

export function getTasks(status?: TaskStatus): Task[] {
  if (!status) {
    return tasks;
  }

  return tasks.filter((task) => task.status === status);
}

export function addTask(input: Omit<Task, "id">): Task {
  const task: Task = {
    id: `task-${Math.random().toString(16).slice(2, 9)}`,
    ...input,
  };

  tasks.unshift(task);
  return task;
}

export function moveTask(taskId: string, status: TaskStatus): Task | null {
  const target = tasks.find((task) => task.id === taskId);

  if (!target) {
    return null;
  }

  target.status = status;
  return target;
}
