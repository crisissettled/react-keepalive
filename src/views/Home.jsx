import React, { useState } from "react";

export default function Home() {
  const [title, setTitle] = useState("Home");
  return (
    <div>
      <h1>{title}</h1>
      <button
        onClick={() =>
          setTitle(`Home Page - ${new Date().toLocaleTimeString()}`)
        }
      >
        Set
      </button>
    </div>
  );
}
