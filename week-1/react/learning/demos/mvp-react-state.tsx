/*
Key points
- useState returns a getter (in the form of a variable name) and setter. Use this to manage state
*/
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
