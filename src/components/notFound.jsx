import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex w-100 vh-100 flex-column align-items-center justify-content-center">
      <img
        src="https://szatmarzoo.hu/wp-content/uploads/2023/05/404-Img.png"
        alt="404 Not Found"
        className="w-50 h-50 mb-4"
      />

      <p className="fs-6 text-center text-muted mb-4">
        The page you're looking for doesn't exist or has been moved. Go back to
        the homepage and try again.
      </p>

      <Button variant="primary" onClick={() => navigate("/")} className="mt-1">
        Home Page
      </Button>
    </div>
  );
};

export default NotFound;
