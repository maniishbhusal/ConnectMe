import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const ErrorPage = () => {
  const navigate = useNavigate(); // Use the useNavigate hook

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/30">
      <div className="container px-4 mx-auto">
        {/* Animated 404 Text */}
        <div className="relative">
          <h1 className="text-[150px] md:text-[200px] font-bold text-muted-foreground/10 text-center select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="space-y-2 text-center">
              <h2 className="text-2xl md:text-4xl font-bold text-foreground">
                Oops! Page Not Found
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Looks like you've ventured into uncharted territory. The page
                you're looking for has gone exploring or never existed in the
                first place.
              </p>
            </div>
          </div>
        </div>

        {/* Animated SVG Illustration */}
        <div className="w-full max-w-md mx-auto my-8">
          <svg
            viewBox="0 0 24 24"
            className="w-full h-auto text-primary animate-pulse"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-8">
          <Link to="/">
            <Button
              variant="default"
              size="lg"
              className="group bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Home className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
              Back to Home
            </Button>
          </Link>
          <Link to={navigate(-1)}>
            <Button
              variant="outline"
              size="lg"
              className="group"
            >
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Go Back
            </Button>
          </Link>
        </div>

        {/* Fun Message */}
        <p className="text-sm text-muted-foreground text-center mt-8 animate-fade-in">
          Don't worry, even the best explorers get lost sometimes! 🗺️
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
