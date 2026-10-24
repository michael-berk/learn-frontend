import { useState } from "react";

export default function App() {
  const [name, setName] = useState("first");

  return (
    <>
      <h1>{name}</h1>
      <button onClick={() => setName("second")}>
        Change text
      </button>
    </>
  );
}