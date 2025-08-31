import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center glass-card p-12 rounded-2xl">
        <h1 className="text-6xl font-bold mb-4 neon-text">404</h1>
        <p className="text-xl text-muted-foreground mb-6">Oops! Page not found</p>
        <a href="/" className="gradient-button px-6 py-3 rounded-lg inline-block hover-lift">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
