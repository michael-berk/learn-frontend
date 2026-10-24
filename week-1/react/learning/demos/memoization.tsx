/*
Key points
- Background: every render re-runs the component body. Functions the body CALLS
  run again; functions DEFINED in the body are rebuilt (but not called). Functions
  defined outside components are built once. Memoization reduces the number of recomputes.

- memo: skip CALLING a component if its props didn't change. 
- useCallback: skip REBUILDING one function defined in the body
- useRef: state that react doesn't watch, so changing it doesn't trigger a re-render. Use for values the screen doesn't depend on

- Key conclusion: memo a child AND keep its props stable (useCallback for functions).
  Either one alone does nothing.
  - Note: the React Compiler (opt-in plugin) adds memo and useCallback for you, except in
    components that break React's rules (e.g. mutating a ref during render, like Cell here).
*/
import { memo, useCallback, useRef, useState } from "react";

function Cell({ index, value, onPlay }: { index: number; value: number; onPlay: (i: number) => void }) {
  const renders = useRef(0);
  renders.current++; // demo only: counts calls to this function
  return (
    <button onClick={() => onPlay(index)}>
      clicks: {value} · renders: {renders.current}
    </button>
  );
}
const MemoCell = memo(Cell);

const empty = () => Array<number>(3).fill(0);
const bump = (cells: number[], i: number) => cells.map((v, j) => (j === i ? v + 1 : v));

function PlainRow() {
  const [cells, setCells] = useState(empty);
  const play = (i: number) => setCells((c) => bump(c, i));
  return <p>Plain: {cells.map((v, i) => <Cell key={i} index={i} value={v} onPlay={play} />)}</p>;
}

function MemoRow() {
  const [cells, setCells] = useState(empty);
  const play = (i: number) => setCells((c) => bump(c, i)); // new function every render
  return <p>memo only: {cells.map((v, i) => <MemoCell key={i} index={i} value={v} onPlay={play} />)}</p>;
}

function MemoStableRow() {
  const [cells, setCells] = useState(empty);
  const play = useCallback((i: number) => setCells((c) => bump(c, i)), []); // same function every render
  return <p>memo + useCallback: {cells.map((v, i) => <MemoCell key={i} index={i} value={v} onPlay={play} />)}</p>;
}

export default function App() {
  return (
    <>
      <PlainRow />
      <MemoRow />
      <MemoStableRow />
    </>
  );
}
