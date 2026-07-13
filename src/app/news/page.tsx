"use client";

import CategoryPage from "@/components/CategoryPage";
import { FileText } from "lucide-react";

export default function NewsPage() {
  return (
    <CategoryPage
      title="News Desk Updates"
      description="Stay updated with our daily briefings, breaking legislation updates, and regional governance coverage reports."
      type="news"
      icon={FileText}
    />
  );
}
