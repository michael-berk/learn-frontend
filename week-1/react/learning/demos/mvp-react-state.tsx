import { useState } from "react";

export default function App() {
  const [name, setName] = useState("first");

  return (
    <>
      <h1>{name}</h1>
      <button onClick={() => setName((prev) => (prev === "first" ? "second" : "first"))}>
        Toggle text
      </button>
    </>
  );
}
