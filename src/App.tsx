import React, { useState } from 'react';
import './App.scss';

interface AppProps {
    title?: string;
}

const App: React.FC<AppProps> = ({ title = "Hello React with SCSS!" }) => {
    return (
        <div className="app">
            <h1>{title}</h1>
            <p>SCSS + TypeScript работает! 🎉</p>
            <Counter />
        </div>
    );
};

const Counter: React.FC = () => {
    const [count, setCount] = useState<number>(0);

    return (
        <div className="counter">
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>
                Increment
            </button>
        </div>
    );
};

export default App;