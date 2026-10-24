import { useState } from "react";

function Display({ moves}: { moves: string[]}) {
    return <h2>{moves.join(", ")}</h2>
}

function Buttons({ onButtonClick }: { onButtonClick: (move: string) => void}){
    return (
        <div>
            <button onClick={() => onButtonClick('x')}>x</button>
            <button onClick={() => onButtonClick('y')}>y</button>
        </div>
    )
}


export default function App() {
    const [moves, setMoves] = useState<string[]>([])

    return (
        <>
            <h1>hi</h1>
            <Display moves={moves}/>
            <Buttons onButtonClick={(move) => setMoves([...moves, move])}/>
        </>
    )
}