import React from "react";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            fontFamily: "Inter, sans-serif",
            fontSize: "14px",
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          },
        }}
      />
      <Home />
    </>
  );
}

export default App;
