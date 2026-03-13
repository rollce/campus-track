"use client";

import { ArrowRightOutlined, AreaChartOutlined, FolderOpenOutlined, ProfileOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row, Statistic, Tag } from "antd";
import { motion } from "framer-motion";
import Link from "next/link";

const sections = [
  {
    href: "/projects",
    title: "Projects",
    description: "See team progress, ownership, and health signals.",
    icon: <FolderOpenOutlined style={{ fontSize: 22 }} />,
  },
  {
    href: "/tasks",
    title: "Task Operations",
    description: "Run the full CRUD board with workflow transitions.",
    icon: <ProfileOutlined style={{ fontSize: 22 }} />,
  },
  {
    href: "/analytics",
    title: "Analytics",
    description: "Track velocity, completion patterns, and deadline risk.",
    icon: <AreaChartOutlined style={{ fontSize: 22 }} />,
  },
];

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-4 py-8 md:py-10">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass rounded-3xl p-7 md:p-10"
      >
        <Tag color="blue" className="mb-3">
          FULLSTACK ADMISSIONS PORTFOLIO
        </Tag>
        <h1 className="max-w-4xl text-4xl leading-tight font-semibold md:text-6xl">
          Campus Track is now a full multi-page product case
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--ink-muted)] md:text-lg">
          This project demonstrates route-level architecture, API-backed workflows, and product-level
          navigation instead of a single standalone screen.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Link href="/tasks">
            <Button type="primary" size="large" icon={<ArrowRightOutlined />}>
              Open Task Console
            </Button>
          </Link>
          <Link href="/projects">
            <Button size="large">Open Projects</Button>
          </Link>
          <Link href="/analytics">
            <Button size="large">Open Analytics</Button>
          </Link>
        </div>
      </motion.section>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card>
            <Statistic title="User Roles" value={3} suffix="roles" />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Statistic title="Operational Pages" value={4} suffix="routes" />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Statistic title="Workflow States" value={4} suffix="statuses" />
          </Card>
        </Col>
      </Row>

      <section className="grid gap-4 md:grid-cols-3">
        {sections.map((section, index) => (
          <motion.div
            key={section.href}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
          >
            <Card
              title={
                <span className="inline-flex items-center gap-2">
                  {section.icon}
                  {section.title}
                </span>
              }
              extra={<Link href={section.href}>Explore</Link>}
              className="h-full"
            >
              <p className="text-sm text-[var(--ink-muted)]">{section.description}</p>
            </Card>
          </motion.div>
        ))}
      </section>
    </main>
  );
}
