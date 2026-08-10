import { useState, useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import BookDemoModal from "./BookDemoModal";

const BookDemoHandler = () => {
  const [open, setOpen] = useState(false);
  const routerState = useRouterState();
  const hash = routerState.location.hash;

  useEffect(() => {
    if (hash === "book-demo" || hash === "#book-demo" || window.location.hash === "#book-demo") {
      setOpen(true);
    }
  }, [hash]);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#book-demo") {
        setOpen(true);
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      const currentScrollY = window.scrollY;
      if (window.location.hash === "#book-demo" || window.location.hash === "book-demo") {
        history.replaceState(null, "", window.location.pathname + window.location.search);
        window.scrollTo({ top: currentScrollY, behavior: "instant" });
      }
    }
  };

  return <BookDemoModal open={open} onOpenChange={handleOpenChange} />;
};

export default BookDemoHandler;

