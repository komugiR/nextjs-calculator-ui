import React, { useState } from 'react';

const Calculator = ({ id, addLogEntry, isOpen, onClose }) => {
    const [input, setInput] = useState('');

    //ボタンが押されたとき
    const handleButtonClick = (value) => {
        if (value === 'C') {
            setInput('');
        } else if (value === '=') {
            calculateAndClose();
        } else if (value === 'DEL') {
            setInput((prev) => prev.slice(0, -1));
        } else {
            setInput((prev) => prev + value);
        }
    };

    const calculate = () => {
        try {
            if (!input) return false;

            const result = parseFloat(eval(input).toFixed(2));

            addLogEntry(id, input, result);

            setInput(String(result)) //計算結果を表示
            return true;
        } catch (e) {
            setInput('Error');
            return false;
        }
    };

    const calculateAndClose = () => {
        const success = calculate();
        if (success) {
            onClose;
        }
    }

    const buttons = [
        '7', '8', '9', '/',
        '4', '5', '6', '*',
        '1', '2', '3', '-',
        'DEL', '0', '=', '+',
        'C'
    ];

    return (
        <div className={`calculator-overlay ${isOpen ? 'is-open' : ''}`}>
            <div className="calculator-panel">
                <button onClick={onClose} className='close-btn'>x</button>
                <h3>電卓 {id}</h3>
                <input
                    type="text"
                    className="calc-display"
                    value={input}
                    readOnly
                />

                <div className="calc-buttons">
                    {buttons.map((btn, index) => (
                        <button
                            key={index}
                            onClick={() => handleButtonClick(btn)}
                            className={
                                btn === '=' ? 'equals' : (
                                    ['/', '*', '-', '+'].includes(btn) ? 'operator' : ''
                                )
                            }
                        >
                        {btn}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Calculator;