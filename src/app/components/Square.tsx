"use client";

"use client";

interface props {
    value: string;
    onSquareClick(): void;
}

export default function Square({ value, onSquareClick }: props) {
    return <button className="square" onClick={onSquareClick}>
        {value}
    </button>;
}
