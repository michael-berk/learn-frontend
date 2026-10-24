/*
Key points
- Prop: an input a parent passes to a child (e.g. `count` on line 24)
- A child reports events upwards by calling callbacks it got as props - the parent decides what that behavior should be when passing the action as a prop
*/
import { useState } from "react";

function Display({ count }: { count: number }) {
  return <h1>{count}</h1>;
}

function IncrementButton({ onIncrement }: { onIncrement: () => void }) {
  // When button clicked, calls the onIncrement it provided as a prop. It doesn't know what that
  // function does - the parent decides.
  return <button onClick={onIncrement}>+1</button>;
}

export default function App() {
  // single source of truth for state
  const [count, setCount] = useState(0);

  return (
    <>
      <Display count={count} />
      <IncrementButton onIncrement={() => setCount((c) => c + 1)} />
    </>
  );
}
