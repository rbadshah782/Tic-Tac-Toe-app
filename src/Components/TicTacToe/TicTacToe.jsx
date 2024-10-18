import React, { useRef, useState } from 'react';
import circle_icon from '../../Components/Assets/circle.png';
import cross_icon from '../../Components/Assets/cross.png';
import '../TicTacToe/TicTacToe.css';

const TicTacToe = () => {
    const [count, setCount] = useState(0);
    const [lock, setLock] = useState(false);
    const titleRef = useRef(null);
    const data = useRef(["", "", "", "", "", "", "", "", ""]);

  
    const boxRefs = [useRef(null), useRef(null), useRef(null), 
                     useRef(null), useRef(null), useRef(null), 
                     useRef(null), useRef(null), useRef(null)];

    const toggle = (e, num) => {
        if (lock || data.current[num]) {
            return;
        }

        const symbol = count % 2 === 0 ? 'x' : 'o';
        const icon = count % 2 === 0 ? cross_icon : circle_icon;

        data.current[num] = symbol;
        e.target.innerHTML = `<img src='${icon}'>`;
        setCount(count + 1);
        checkWin();
    };

    const checkWin = () => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], 
            [0, 3, 6], [1, 4, 7], [2, 5, 8], 
            [0, 4, 8], [2, 4, 6] 
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (data.current[a] && data.current[a] === data.current[b] && data.current[a] === data.current[c]) {
                return won(data.current[a]);
            }
        }

        if (count === 8) {
            titleRef.current.innerHTML = "It's a draw!";
            setLock(true);
        }
    };

    const won = (winner) => {
        setLock(true);
        titleRef.current.innerHTML = `Congratulations <img src="${winner === 'x' ? cross_icon : circle_icon}"> Wins`;
    };

    const reset = () => {
        setLock(false);
        data.current = ["", "", "", "", "", "", "", "", ""];
        titleRef.current.innerHTML = "Tic Tac Toe Game In <span>React</span>";
        boxRefs.forEach(ref => {
            ref.current.innerHTML = "";
        });
        setCount(0);
    };

    return (
        <div className='container'>
            <h1 className='title' ref={titleRef}>Tic Tac Toe Game In <span>React</span></h1>
            <div className='board'>
                <div className='row1'>
                    {boxRefs.slice(0, 3).map((ref, index) => (
                        <div 
                            className='boxes' 
                            key={index} 
                            ref={ref} 
                            onClick={(e) => toggle(e, index)} 
                        ></div>
                    ))}
                </div>
                <div className='row2'>
                    {boxRefs.slice(3, 6).map((ref, index) => (
                        <div 
                            className='boxes' 
                            key={index + 3} 
                            ref={ref} 
                            onClick={(e) => toggle(e, index + 3)} 
                        ></div>
                    ))}
                </div>
                <div className='row3'>
                    {boxRefs.slice(6, 9).map((ref, index) => (
                        <div 
                            className='boxes' 
                            key={index + 6} 
                            ref={ref} 
                            onClick={(e) => toggle(e, index + 6)} 
                        ></div>
                    ))}
                </div>
            </div>
            <button className='reset' onClick={reset}>Reset</button>
        </div>
    );
};

export default TicTacToe;
