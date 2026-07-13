"use client";

import CategoryPage from "@/components/CategoryPage";
import { FileText } from "lucide-react";

export default function DocumentariesPage() {
  return (
    <CategoryPage
      title="Investigative Documentaries"
      description="Explore detailed analysis of regional governance reforms, green infrastructure tech growth, and youth economic resilience frameworks."
      type="documentary"
      icon={FileText}
    />
  );
}
