import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowLeft, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <section className="py-16 md:py-24" aria-labelledby="not-found-heading">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="mx-auto max-w-xl rounded-2xl border bg-card p-8 shadow-soft">
            <AlertTriangle className="mx-auto mb-4 h-10 w-10 text-primary" aria-hidden="true" />
            <h1 id="not-found-heading" className="mb-2 text-5xl font-bold">404</h1>
            <p className="mb-8 text-xl text-muted-foreground">Oops! Page not found</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild>
                <Link to="/" aria-label="Return to home page">
                  <Home className="h-4 w-4" aria-hidden="true" />
                  Return Home
                </Link>
              </Button>
              <Button variant="outline" onClick={() => window.history.back()} aria-label="Go back to previous page">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Go Back
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
