import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop() {
  const location = useLocation();

  useLayoutEffect(() => {
    if (location.hash) {
      return;
    }

    window.scrollTo(0, 0);
  }, [location.hash, location.pathname, location.search]);

  return null;
}
