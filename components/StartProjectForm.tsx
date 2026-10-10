"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProjectBuilder from "@/components/ProjectBuilder";

function Form() {
  const q = useSearchParams();
  const service = q.get("service") || "";
  return <ProjectBuilder preselect={service} />;
}

export default function StartProjectForm() {
  return (
    <Suspense fallback={<div className="max-w-4xl mx-auto px-4 py-16 text-muted">Loading project builder…</div>}>
      <Form />
    </Suspense>
  );
}
