"use client";

import { BarChartOutlined, CalendarOutlined, RiseOutlined } from "@ant-design/icons";
import { Card, Col, Progress, Row, Statistic, Table, Tag } from "antd";

const weeklyVelocity = [
  { key: "1", week: "Week 1", completed: 9, overdue: 2 },
  { key: "2", week: "Week 2", completed: 11, overdue: 1 },
  { key: "3", week: "Week 3", completed: 8, overdue: 3 },
  { key: "4", week: "Week 4", completed: 13, overdue: 1 },
];

const riskTableColumns = [
  { title: "Task", dataIndex: "task", key: "task" },
  { title: "Owner", dataIndex: "owner", key: "owner" },
  {
    title: "Risk",
    dataIndex: "risk",
    key: "risk",
    render: (value: string) => <Tag color={value === "High" ? "red" : value === "Medium" ? "orange" : "green"}>{value}</Tag>,
  },
  { title: "Due", dataIndex: "due", key: "due" },
];

const riskRows = [
  { key: "1", task: "API integration tests", owner: "Leo", risk: "High", due: "2026-03-20" },
  { key: "2", task: "Final presentation outline", owner: "Mia", risk: "Medium", due: "2026-03-22" },
  { key: "3", task: "Mentor review notes", owner: "Nina", risk: "Low", due: "2026-03-25" },
];

export default function AnalyticsPage() {
  const totalCompleted = weeklyVelocity.reduce((sum, item) => sum + item.completed, 0);
  const totalOverdue = weeklyVelocity.reduce((sum, item) => sum + item.overdue, 0);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-7 px-4 py-8 md:py-10">
      <section className="glass rounded-3xl p-7 md:p-10">
        <h1 className="text-4xl leading-tight font-semibold md:text-5xl">Delivery Analytics and Risk Monitoring</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--ink-muted)] md:text-lg">
          This analytics area demonstrates KPI tracking beyond CRUD functionality: velocity trends,
          deadline risk, and operational predictability.
        </p>
      </section>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card>
            <Statistic title="Completed tasks (month)" value={totalCompleted} prefix={<RiseOutlined />} />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Statistic title="Overdue tasks" value={totalOverdue} prefix={<CalendarOutlined />} />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Statistic title="Productivity index" value={87} suffix="/100" prefix={<BarChartOutlined />} />
          </Card>
        </Col>
      </Row>

      <Card title="Weekly velocity">
        <div className="grid gap-3 md:grid-cols-2">
          {weeklyVelocity.map((item) => (
            <Card key={item.key} size="small" title={item.week}>
              <p className="text-sm text-[var(--ink-muted)]">Completed: {item.completed}</p>
              <Progress percent={Math.min(item.completed * 7, 100)} strokeColor="var(--accent)" />
              <p className="text-sm text-[var(--ink-muted)]">Overdue: {item.overdue}</p>
              <Progress percent={item.overdue * 15} status="exception" />
            </Card>
          ))}
        </div>
      </Card>

      <Card title="Risk queue">
        <Table columns={riskTableColumns} dataSource={riskRows} pagination={false} />
      </Card>
    </main>
  );
}
