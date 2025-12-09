'use client';

import React, { useCallback, useState } from "react";
import Calculator from './components/Calculator';
import LogDisplay from './components/LogDisplay';

export default function GameUI() {
    const [logHistory1, setLogHistory1] = useState([]);
    const [logHistory2, setLogHistory2] = useState([]);
    const [logHistory3, setLogHistory3] = useState([]);

    const addLogEntry = useCallback((calculatorId, expression, result) => {
        const newEntry = {
            id: Date.now(),
            calc: `電卓 ${calculatorId}`,
            expression: expression,
            result: result,
            timestamp: new Date().toLocaleTimeString('ja-JP', { 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit' 
            }),
        };
        const setHistory = 
        calculatorId === 1 ? setLogHistory1 :
        calculatorId === 2 ? setLogHistory2 :
        setLogHistory3;

        setHistory(prevHistory => [newEntry, ...prevHistory]);
    }, []);

    const renderCalculatorSet = (id, history) => (
        <div className="calculator-set" key={id}>
            <Calculator id={id} addLogEntry={addLogEntry} />
            <LogDisplay history={history} title={`ログ ${id}`}/>
        </div>
    );

    return (
        <div className="game-screen">
            <div className="calculators-and-logs-container">
                {renderCalculatorSet(1, logHistory1)}
                {renderCalculatorSet(2, logHistory2)}
                {renderCalculatorSet(3, logHistory3)}
            </div>
        </div>
    )
}