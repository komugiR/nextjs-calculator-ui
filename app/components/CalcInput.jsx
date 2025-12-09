import React from 'react';

const CalcInput = ({ id, currentResult, onClick }) => {
    return (
        <div className='calc-input-set'>
            <h3 className='calc-input-title'>電卓 {id}</h3>

            <div
                className='calc-result-display'
                onClick={onClick}
            >
                <span className='result-text'>{currentResult || 'タップして計算'}</span>
            </div>
        </div>
    );
};

export default CalcInput;