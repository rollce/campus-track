"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  CircleAlert,
  ClipboardList,
  Plus,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";

type UserRole = "student" | "mentor" | "admin";
type TaskStatus = "Backlog" | "In Progress" | "Review" | "Done";

interface Project {
  id: string;
  name: string;
  owner: string;
  completion: number;
  health: "Healthy" | "Needs attention";
  nextReview: string;
}

interface Task {
  id: string;
  title: string;
  course: string;
  owner: string;
  deadline: string;
  status: TaskStatus;
  priority: "Low" | "Medium" | "High";
}

const statuses: TaskStatus[] = ["Backlog", "In Progress", "Review", "Done"];

const roleDescriptions: Record<UserRole, string> = {
  student: "Track your own deadlines, upload deliverables, and keep momentum.",
  mentor: "Review team progress, unblock tasks, and leave structured feedback.",
  admin: "Manage health signals across courses and maintain delivery quality.",
};

function nextStatus(current: TaskStatus): TaskStatus {
  const currentIndex = statuses.indexOf(current);
  return statuses[(currentIndex + 1) % statuses.length];
}

export default function Home() {
  const [role, setRole] = useState<UserRole>("student");
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("");
  const [owner, setOwner] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState<"Low" | "Medium" | "High">("Medium");

  async function loadData() {
    setIsLoading(true);

    const [projectRes, taskRes] = await Promise.all([fetch("/api/projects"), fetch("/api/tasks")]);

    if (!projectRes.ok || !taskRes.ok) {
      setIsLoading(false);
      return;
    }

    const projectPayload = await projectRes.json();
    const taskPayload = await taskRes.json();
    setProjects(projectPayload.projects);
    setTasks(taskPayload.tasks);
    setIsLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadData();
  }, []);

  const completionAverage = useMemo(() => {
    if (!projects.length) {
      return 0;
    }

    return Math.round(projects.reduce((sum, project) => sum + project.completion, 0) / projects.length);
  }, [projects]);

  const healthyProjects = useMemo(
    () => projects.filter((project) => project.health === "Healthy").length,
    [projects],
  );

  async function handleCreateTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title || !course || !owner || !deadline) {
      return;
    }

    setIsSaving(true);

    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, course, owner, deadline, priority }),
    });

    if (response.ok) {
      const payload = await response.json();
      setTasks((prev) => [payload.task, ...prev]);
      setTitle("");
      setCourse("");
      setOwner("");
      setDeadline("");
      setPriority("Medium");
    }

    setIsSaving(false);
  }

  async function moveTaskForward(task: Task) {
    const updatedStatus = nextStatus(task.status);

    const response = await fetch(`/api/tasks/${task.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: updatedStatus }),
    });

    if (!response.ok) {
      return;
    }

    setTasks((prev) => prev.map((item) => (item.id === task.id ? { ...item, status: updatedStatus } : item)));
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-7 px-5 py-8 md:px-8 md:py-10">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="glass relative overflow-hidden rounded-3xl p-7 md:p-10"
      >
        <div className="pointer-events-none absolute -top-20 right-0 h-64 w-64 rounded-full bg-[var(--accent)]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 left-12 h-52 w-52 rounded-full bg-[var(--accent-2)]/20 blur-3xl" />

        <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-[var(--surface-heavy)] px-3 py-1 text-xs font-semibold tracking-[0.16em] text-[var(--accent)] uppercase">
          <ShieldCheck size={14} />
          Campus Track Platform
        </p>
        <h1 className="max-w-4xl text-4xl leading-tight font-semibold md:text-6xl">
          Fullstack academic project tracker for university teams
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--ink-muted)] md:text-lg">
          Role-based dashboards, milestone visibility, and real-time task flow designed to show fullstack
          engineering maturity in a portfolio submission.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {(["student", "mentor", "admin"] as UserRole[]).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setRole(item)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold capitalize transition ${
                role === item
                  ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                  : "border-[var(--border)] bg-[var(--surface-heavy)]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.p
            key={role}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mt-4 max-w-2xl rounded-2xl border border-[var(--border)] bg-[var(--surface-heavy)] px-4 py-3 text-sm"
          >
            {roleDescriptions[role]}
          </motion.p>
        </AnimatePresence>
      </motion.section>

      <section className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Average project completion", value: `${completionAverage}%`, icon: Sparkles },
          { label: "Healthy projects", value: `${healthyProjects}/${projects.length || 0}`, icon: CheckCircle2 },
          { label: "Open tasks", value: `${tasks.filter((task) => task.status !== "Done").length}`, icon: ClipboardList },
        ].map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.article
              key={item.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.07 }}
              className="glass rounded-2xl p-5"
            >
              <p className="text-xs tracking-wide text-[var(--ink-muted)] uppercase">{item.label}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-3xl font-semibold">{item.value}</span>
                <Icon size={18} />
              </div>
            </motion.article>
          );
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_1.9fr]">
        <motion.article
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="glass rounded-3xl p-6"
        >
          <h2 className="text-2xl font-semibold">Create new task</h2>
          <p className="mt-2 text-sm text-[var(--ink-muted)]">Use this form to demonstrate CRUD behavior.</p>
          <form onSubmit={handleCreateTask} className="mt-5 space-y-3">
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="panel w-full rounded-xl px-4 py-2.5 text-sm"
              placeholder="Task title"
              required
            />
            <input
              value={course}
              onChange={(event) => setCourse(event.target.value)}
              className="panel w-full rounded-xl px-4 py-2.5 text-sm"
              placeholder="Course"
              required
            />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <input
                value={owner}
                onChange={(event) => setOwner(event.target.value)}
                className="panel w-full rounded-xl px-4 py-2.5 text-sm"
                placeholder="Owner"
                required
              />
              <input
                value={deadline}
                onChange={(event) => setDeadline(event.target.value)}
                className="panel w-full rounded-xl px-4 py-2.5 text-sm"
                type="date"
                required
              />
            </div>
            <select
              value={priority}
              onChange={(event) => setPriority(event.target.value as "Low" | "Medium" | "High")}
              className="panel w-full rounded-xl px-4 py-2.5 text-sm"
            >
              <option value="Low">Low priority</option>
              <option value="Medium">Medium priority</option>
              <option value="High">High priority</option>
            </select>
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-65"
            >
              <Plus size={16} />
              {isSaving ? "Saving..." : "Add Task"}
            </button>
          </form>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="glass rounded-3xl p-6"
        >
          <h2 className="text-2xl font-semibold">Task flow board</h2>
          <p className="mt-2 text-sm text-[var(--ink-muted)]">
            Click any card to advance status and simulate workflow automation.
          </p>

          {isLoading ? (
            <div className="mt-5 rounded-xl border border-dashed border-[var(--border)] p-6 text-sm">Loading data...</div>
          ) : (
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {statuses.map((status) => (
                <div key={status} className="panel rounded-2xl p-3">
                  <h3 className="mb-3 text-sm font-semibold">{status}</h3>
                  <div className="space-y-2">
                    {tasks
                      .filter((task) => task.status === status)
                      .map((task) => (
                        <button
                          key={task.id}
                          type="button"
                          onClick={() => moveTaskForward(task)}
                          className="w-full rounded-xl border border-[var(--border)] bg-white/90 p-3 text-left transition hover:border-[var(--accent)]"
                        >
                          <p className="text-sm font-semibold">{task.title}</p>
                          <p className="mt-1 text-xs text-[var(--ink-muted)]">{task.course}</p>
                          <p className="mt-2 inline-flex items-center gap-1 text-xs text-[var(--ink-muted)]">
                            <CalendarDays size={12} />
                            {task.deadline}
                          </p>
                          <p className="mt-2 text-xs font-semibold">Priority: {task.priority}</p>
                        </button>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.article>
      </section>

      <motion.section
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="glass rounded-3xl p-6"
      >
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-2xl font-semibold">Project health snapshot</h2>
          <span className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--accent)]">
            <CircleAlert size={14} />
            For admissions portfolio
          </span>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {projects.map((project) => (
            <article key={project.id} className="panel rounded-2xl p-4">
              <p className="text-lg font-semibold">{project.name}</p>
              <p className="mt-1 text-sm text-[var(--ink-muted)]">{project.owner}</p>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-[var(--accent-soft)]">
                <div className="h-full rounded-full bg-[var(--accent)]" style={{ width: `${project.completion}%` }} />
              </div>
              <p className="mt-2 text-sm">Completion: {project.completion}%</p>
              <p
                className={`mt-2 inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                  project.health === "Healthy"
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                {project.health}
              </p>
              <p className="mt-2 inline-flex items-center gap-1 text-xs text-[var(--ink-muted)]">
                Next review: {project.nextReview}
                <ArrowRight size={12} />
              </p>
            </article>
          ))}
        </div>
      </motion.section>
    </main>
  );
}
