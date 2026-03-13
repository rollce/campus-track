import { getProjects } from "@/lib/mock-db";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    projects: getProjects(),
    updatedAt: new Date().toISOString(),
  });
}
