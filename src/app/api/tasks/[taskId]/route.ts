import { moveTask, TaskStatus } from "@/lib/mock-db";
import { NextRequest, NextResponse } from "next/server";

const statuses: TaskStatus[] = ["Backlog", "In Progress", "Review", "Done"];

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ taskId: string }> },
) {
  const payload = await request.json();
  const { taskId } = await params;

  if (!payload?.status || !statuses.includes(payload.status as TaskStatus)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const updatedTask = moveTask(taskId, payload.status as TaskStatus);

  if (!updatedTask) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }

  return NextResponse.json({ task: updatedTask });
}
