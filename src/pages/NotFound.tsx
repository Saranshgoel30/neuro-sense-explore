import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <section className="py-24" aria-labelledby="not-found-heading">
        <div className="container mx-auto px-4 text-center">
          <h1 id="not-found-heading" className="mb-4 text-5xl font-bold">404</h1>
          <p className="mb-8 text-xl text-muted-foreground">Oops! Page not found</p>
          <Button asChild>
            <Link to="/" aria-label="Return to home page">
              Return to Home
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
