"use client";

import { CalendarOutlined, TeamOutlined } from "@ant-design/icons";
import { Card, Col, Progress, Row, Table, Tag } from "antd";

const projects = [
  {
    key: "1",
    name: "Civic Data Dashboard",
    owner: "Team Alpha",
    completion: 78,
    health: "Healthy",
    nextReview: "2026-03-19",
  },
  {
    key: "2",
    name: "UX Study Companion",
    owner: "Team Pixel",
    completion: 61,
    health: "Needs attention",
    nextReview: "2026-03-17",
  },
  {
    key: "3",
    name: "Essay Analyzer MVP",
    owner: "Team Nova",
    completion: 84,
    health: "Healthy",
    nextReview: "2026-03-24",
  },
  {
    key: "4",
    name: "Autograding Assistant",
    owner: "Team Delta",
    completion: 49,
    health: "Needs attention",
    nextReview: "2026-03-21",
  },
];

const columns = [
  {
    title: "Project",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Owner",
    dataIndex: "owner",
    key: "owner",
  },
  {
    title: "Completion",
    dataIndex: "completion",
    key: "completion",
    render: (value: number) => `${value}%`,
  },
  {
    title: "Health",
    dataIndex: "health",
    key: "health",
    render: (value: string) => (
      <Tag color={value === "Healthy" ? "green" : "orange"}>{value}</Tag>
    ),
  },
  {
    title: "Next review",
    dataIndex: "nextReview",
    key: "nextReview",
  },
];

export default function ProjectsPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-7 px-4 py-8 md:py-10">
      <section className="glass rounded-3xl p-7 md:p-10">
        <h1 className="text-4xl leading-tight font-semibold md:text-5xl">Project Portfolio Workspace</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--ink-muted)] md:text-lg">
          A dedicated project section with health tracking, ownership visibility, and milestone review
          cadence for academic teams.
        </p>
      </section>

      <Row gutter={[16, 16]}>
        {projects.map((project) => (
          <Col xs={24} md={12} lg={6} key={project.key}>
            <Card className="h-full" title={project.name}>
              <p className="inline-flex items-center gap-1 text-sm text-[var(--ink-muted)]">
                <TeamOutlined />
                {project.owner}
              </p>
              <div className="mt-3">
                <Progress percent={project.completion} strokeColor="var(--accent)" />
              </div>
              <Tag color={project.health === "Healthy" ? "green" : "orange"}>{project.health}</Tag>
              <p className="mt-2 inline-flex items-center gap-1 text-xs text-[var(--ink-muted)]">
                <CalendarOutlined />
                {project.nextReview}
              </p>
            </Card>
          </Col>
        ))}
      </Row>

      <Card title="Project registry">
        <Table columns={columns} dataSource={projects} pagination={false} scroll={{ x: 720 }} />
      </Card>
    </main>
  );
}
