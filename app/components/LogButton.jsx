// src/app/components/LogButton.jsx

import React from 'react';

const LogButton = ({ id, onClick, history }) => {
  const logCount = history.length;
  
  return (
    <div className="log-button-set">
        <h3 className="calc-input-title">ログ {id}</h3>
        <div 
            className="log-trigger-display" 
            onClick={onClick}
        >
            <span className="log-count">履歴: {logCount}件</span>
        </div>
    </div>
  );
};

export default LogButton;