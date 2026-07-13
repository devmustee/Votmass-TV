"use client";

import CategoryPage from "@/components/CategoryPage";
import { Podcast } from "lucide-react";

export default function PodcastsPage() {
  return (
    <CategoryPage
      title="Podcasts & Dialogue"
      description="Engage in standard discussions, debates, and personal growth panels with emerging policy architects and business icons."
      type="podcast"
      icon={Podcast}
    />
  );
}
