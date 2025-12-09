import React from "react";

const LogDisplay = ({ history, title, isOpen, onClose }) => {
    if (!isOpen) {
        return null;
    }
    return (
        <div className={`calculator-overlay ${isOpen ? 'is-open' : ''}`}> 
            <div className="log-display-panel overlay-panel"> {/* 新しいクラス名を追加 */}
                <button onClick={onClose} className="close-btn">x</button>
            <h2>{title}</h2>
            {history.length === 0 ? (
                <p className="no-log">履歴一覧</p>
            ) : (
                <ul className="log-list">
                    {history.map((entry) => (
                        <li key={entry.id} className="log-item">
                            <span className="log-timestamp">[{entry.timestamp}]</span>
                            <span className={`log-calc-id calc-${entry.calc.slice(-1)}`}>
                                {entry.clac}
                            </span>

                            <span className="log-operation">
                                {entry.expression} = **{entry.result}**
                            </span>
                        </li>
                    ))}
                </ul>
                )}
            </div>
        </div>
    )
}

export default LogDisplay;