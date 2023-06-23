import React from 'react';
import Utils from './Utils';
import { useEffect, useState } from 'react';

const Todo = ({ title, completed, id }) => {
    const { markTodoAsCompleted } = Utils();
    const [isComplete, setCompleted] = useState(completed);
    const [todoStyle, setTodoStyle] = useState({
        border: '1px solid rgb(207, 207, 207)',
        padding: '10px',
        margin: '10px',
        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
        backgroundColor: completed ? '#00ff001f' : 'inherit',
    });
    useEffect(() => {
        setTodoStyle((prevUserStyle) => ({
            ...prevUserStyle,
            backgroundColor: completed ? '#00ff001f' : 'inherit',
        }));
    }, [completed]);

    const handleComplete = () => {
        setCompleted(true);
        markTodoAsCompleted(id)
    };
    return (
        <div style={todoStyle}>
            <h3>{title}</h3>
            {!isComplete && <button onClick={handleComplete}>Mark Completed</button>}
        </div>
    );
};
export default Todo;