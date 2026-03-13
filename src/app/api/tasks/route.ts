import { addTask, getTasks, TaskStatus } from "@/lib/mock-db";
import { NextRequest, NextResponse } from "next/server";

const statuses: TaskStatus[] = ["Backlog", "In Progress", "Review", "Done"];

export async function GET(request: NextRequest) {
  const status = request.nextUrl.searchParams.get("status");

  if (status && !statuses.includes(status as TaskStatus)) {
    return NextResponse.json({ error: "Invalid status filter" }, { status: 400 });
  }

  return NextResponse.json({
    tasks: getTasks(status as TaskStatus | undefined),
    total: getTasks().length,
  });
}

export async function POST(request: NextRequest) {
  const payload = await request.json();

  if (!payload?.title || !payload?.course || !payload?.owner || !payload?.deadline) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const priority = payload?.priority ?? "Medium";

  if (!["Low", "Medium", "High"].includes(priority)) {
    return NextResponse.json({ error: "Invalid priority" }, { status: 400 });
  }

  const task = addTask({
    title: payload.title,
    course: payload.course,
    owner: payload.owner,
    deadline: payload.deadline,
    status: "Backlog",
    priority,
  });

  return NextResponse.json({ task }, { status: 201 });
}
