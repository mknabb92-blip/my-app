import React, { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import Signup from "./components/Signup";
import Login from "./components/Login";

export type Page = "dashboard" | "signup" | "login";

const App: React.FC = () => {
  const [page, setPage] = useState<Page>("dashboard");

  // runtime error catcher
  useEffect(() => {
    const handler = (event: ErrorEvent) => {
      console.error("runtime error:", event.error);
      alert("unexpected error. check console for details.");
    };
    window.addEventListener("error", handler);
    return () => window.removeEventListener("error", handler);
  }, []);

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 400, margin: "40px auto" }}>
      {page === "dashboard" && (
        <Dashboard
          goSignup={() => setPage("signup")}
          goLogin={() => setPage("login")}
        />
      )}

      {page === "signup" && (
        <Signup
          goDashboard={() => setPage("dashboard")}
          goLogin={() => setPage("login")}
        />
      )}

      {page === "login" && (
        <Login
          goDashboard={() => setPage("dashboard")}
          goSignup={() => setPage("signup")}
        />
      )}
    </div>
  );
};

export default App;