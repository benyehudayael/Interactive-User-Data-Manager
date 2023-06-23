import React from 'react';
import Utils from './Utils';
import { useEffect, useState } from 'react';

const Todo = ({ title, completed, id }) => {
    const { markTodoAsCompleted } = Utils();
    const [complete, setCompleted] = useState(completed);
    const [todoStyle, setTodoStyle] = useState({
        border: '1px solid black',
        padding: '10px',
        margin: '10px',
        backgroundColor: completed ? 'lightgreen' : 'inherit',
    });
    useEffect(() => {
        setTodoStyle((prevUserStyle) => ({
            ...prevUserStyle,
            backgroundColor: completed ? 'lightgreen' : 'inherit',
        }));
    }, [completed]);

    const handleComplete = () => {
        setCompleted(true);
        markTodoAsCompleted(id)
    };
    return (
        <div style={todoStyle}>
            <h3>{title}</h3>
            {!complete && <button onClick={handleComplete}>Mark Completed</button>}
        </div>
    );
};
export default Todo;