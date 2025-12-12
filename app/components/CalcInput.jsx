import React from 'react';

const CalcInput = ({ id, currentResult, onClick }) => {
    return (
        <div className='calc-input-set'>
            <h3 className='calc-input-title'>
                {id === 1 ? '領地' : 
                 id === 2 ? '戦力' : 
                 '戦力'} 
            </h3>

            <div
                className='calc-result-display'
                onClick={onClick}
            >
                <span className='result-text'>{currentResult || 'タップ'}</span>
            </div>
        </div>
    );
};

export default CalcInput;