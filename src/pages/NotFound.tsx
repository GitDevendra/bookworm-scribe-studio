
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="text-center">
        <BookOpen className="mx-auto h-16 w-16 text-brand-600" />
        <h1 className="mt-6 text-3xl font-bold text-gray-900 sm:text-5xl font-heading">404</h1>
        <p className="mt-3 text-lg text-gray-600">Oops! Page not found.</p>
        <p className="mt-2 text-base text-gray-500">
          The page you were looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Button asChild>
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
