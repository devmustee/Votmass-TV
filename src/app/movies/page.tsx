"use client";

import CategoryPage from "@/components/CategoryPage";
import { Film } from "lucide-react";

export default function MoviesPage() {
  return (
    <CategoryPage
      title="Movies & Dramas"
      description="Stream our curated collection of independent films, high-fidelity local stories, and custom entertainment productions."
      type="movie"
      icon={Film}
    />
  );
}
