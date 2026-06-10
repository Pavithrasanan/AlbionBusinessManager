"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    title: "Dashboard",
    icon: "🏠",
    href: "/",
  },
  {
    title: "Market",
    icon: "📊",
    href: "/market",
  },
  {
    title: "Crafting",
    icon: "🛠",
    href: "/crafting",
  },
  {
    title: "Flipping",
    icon: "💰",
    href: "/flipping",
  },
  {
    title: "Islands",
    icon: "🏝",
    href: "/islands",
  },
  {
    title: "Inventory",
    icon: "📦",
    href: "/inventory",
  },
  {
    title: "Character",
    icon: "👤",
    href: "/character",
  },
  {
    title: "AI Advisor",
    icon: "🤖",
    href: "/advisor",
  },
  {
    title: "Settings",
    icon: "⚙",
    href: "/settings",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      style={{
        width: "260px",
        background: "#111827",
        color: "white",
        padding: "20px",
        minHeight: "100vh",
        borderRight: "1px solid #1f2937",
      }}
    >
      <h2
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          marginBottom: "20px",
        }}
      >
        🏰 ABM
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        {menuItems.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                textDecoration: "none",
              }}
            >
              <div
                style={{
                  padding: "12px 16px",
                  borderRadius: "10px",
                  background: active ? "#2563eb" : "#1f2937",
                  color: "white",
                  transition: "0.2s",
                  fontWeight: active ? "bold" : "normal",
                }}
              >
                {item.icon} {item.title}
              </div>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}