import { useEffect } from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";

const BookDemoHandler = () => {
  const navigate = useNavigate();
  const routerState = useRouterState();
  const hash = routerState.location.hash;

  useEffect(() => {
    if (hash === "book-demo" || hash === "#book-demo" || window.location.hash === "#book-demo") {
      navigate({ to: "/contact-us" });
    }
  }, [hash, navigate]);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#book-demo") {
        navigate({ to: "/contact-us" });
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [navigate]);

  return null;
};

export default BookDemoHandler;

