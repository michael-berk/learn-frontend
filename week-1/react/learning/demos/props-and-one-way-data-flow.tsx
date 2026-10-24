import { useState } from "react";

function Display({ count }: { count: number }) {
  return <h1>{count}</h1>;
}

function IncrementButton({ onIncrement }: { onIncrement: () => void }) {
  return <button onClick={onIncrement}>+1</button>;
}

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Display count={count} />
      <IncrementButton onIncrement={() => setCount((c) => c + 1)} />
    </>
  );
}
