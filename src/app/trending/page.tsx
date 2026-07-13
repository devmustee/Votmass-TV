"use client";

import CategoryPage from "@/components/CategoryPage";
import { Flame } from "lucide-react";

export default function TrendingPage() {
  return (
    <CategoryPage
      title="Trending Broadcasts"
      description="Stay tuned into what the community is watching. These represent the most viewed dialogue panels, movies, and updates on the VOTMASS network."
      type="trending"
      icon={Flame}
    />
  );
}
