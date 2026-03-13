"use client";

import { AreaChartOutlined, FolderOpenOutlined, HomeOutlined, ProfileOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { key: "/", icon: <HomeOutlined />, label: <Link href="/">Overview</Link> },
  { key: "/projects", icon: <FolderOpenOutlined />, label: <Link href="/projects">Projects</Link> },
  { key: "/tasks", icon: <ProfileOutlined />, label: <Link href="/tasks">Tasks</Link> },
  { key: "/analytics", icon: <AreaChartOutlined />, label: <Link href="/analytics">Analytics</Link> },
];

export function SiteNav() {
  const pathname = usePathname();
  const selectedKey =
    items.find((item) => pathname === item.key || pathname.startsWith(`${item.key}/`))?.key ?? "/";

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-[color:rgba(255,255,255,0.84)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 py-3 md:flex-row md:items-center md:justify-between">
        <Link href="/" className="text-lg font-semibold tracking-wide">
          Campus Track
        </Link>
        <Menu selectedKeys={[selectedKey]} mode="horizontal" items={items} className="min-w-0 flex-1 border-none bg-transparent" />
      </div>
    </header>
  );
}
