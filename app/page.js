'use client';

import React, { useCallback, useState } from "react";
import Calculator from './components/Calculator';
import LogDisplay from './components/LogDisplay';
import CalcInput from './components/CalcInput';
import LogButton from './components/LogButton';

export default function GameUI() {
    const [logHistory1, setLogHistory1] = useState([]);
    const [logHistory2, setLogHistory2] = useState([]);
    const [logHistory3, setLogHistory3] = useState([]);

    const [activeCalcId, setActiveCalcId] = useState(null);

    const[calcResult1, setCalcResult1] = useState('');
    const[calcResult2, setCalcResult2] = useState('');
    const[calcResult3, setCalcResult3] = useState('');

    const [activeLogId, setActiveLogId] = useState(null);

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
        if (calculatorId === 1) {
            setLogHistory1(prevHistory => [newEntry, ...prevHistory]);
            setCalcResult1(String(result));
        } else if (calculatorId === 2) {
            setLogHistory2(prevHistory => [newEntry, ...prevHistory]);
            setCalcResult2(String(result));
        } else {
            setLogHistory3(prevHistory => [newEntry, ...prevHistory]);
            setCalcResult3(String(result));
        }
    }, []);

    const renderCalculatorSet = (id, history, result) => (
        <div className="calculator-set" key={id}>
            <CalcInput
                id={id}
                currentResult={result}
                onClick={() => setActiveCalcId(id)}
            />
            <LogButton
                id={id}
                history={history}
                onClick={() => setActiveLogId(id)}
            />
        </div>
    );

    const activeCalcProps = {
        1: { history: logHistory1, result: calcResult1, setHistory: setLogHistory1, setResult: setCalcResult1 },
        2: { history: logHistory2, result: calcResult2, setHistory: setLogHistory2, setResult: setCalcResult2 },
        3: { history: logHistory3, result: calcResult3, setHistory: setLogHistory3, setResult: setCalcResult3 },
    };

    const activeResult =
        activeCalcId === 1 ? calcResult1 :
        activeCalcId === 2 ? calcResult2 :
        activeCalcId === 3 ? calcResult3 : '';

    const activeLogProps = {
        1: { history: logHistory1, title: 'ログ 1' },
        2: { history: logHistory2, title: 'ログ 2' },
        3: { history: logHistory3, title: 'ログ 3' },
    };

    return (
        <div className="game-screen">
            <div className="calculators-and-logs-container">
                {renderCalculatorSet(1, logHistory1, calcResult1)}
                {renderCalculatorSet(2, logHistory2, calcResult2)}
                {renderCalculatorSet(3, logHistory3, calcResult3)}
            </div>

            {activeCalcId && (
                <Calculator
                    id={activeCalcId}
                    addLogEntry={addLogEntry}
                    isOpen={true}
                    onClose={() => setActiveCalcId(null)}
                    initialValue={activeResult}
                />
            )}

            {activeLogId && activeLogProps[activeLogId] && (
                <LogDisplay
                    history={activeLogProps[activeLogId].history}
                    title={activeLogProps[activeLogId].title}
                    isOpen={true}
                    onClose={() => setActiveLogId(null)}
                />
            )}
        </div>
    )
}