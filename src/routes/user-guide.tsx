import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/user-guide")({
  component: UserGuideRedirect,
});

function UserGuideRedirect() {
  useEffect(() => {
    window.location.replace("https://mvclouds.gitbook.io/signany-2.0-user-guide/");
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <p className="text-sm text-muted-foreground">Redirecting to SignAny 2.0 User Guide...</p>
    </div>
  );
}
