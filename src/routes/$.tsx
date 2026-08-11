import { createFileRoute } from "@tanstack/react-router";
import { NotFoundView } from "@/components/site/NotFoundView";

export const Route = createFileRoute("/$")({
  head: () => ({
    meta: [
      { title: "Page Not Found | SignAny 2.0" },
      { name: "description", content: "The page you are looking for doesn't exist or has been moved." },
    ],
  }),
  component: NotFoundView,
});

export default NotFoundView;
