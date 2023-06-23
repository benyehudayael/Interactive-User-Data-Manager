import React from 'react';
import { useState } from 'react';
import Utils from './Utils'

const AddTodoForm = ({ setMode, userId }) => {
    const [title, setTitle] = useState('');
    const { addTodo } = Utils();

    const handleSubmit = (e) => {
        e.preventDefault();
        addTodo(userId, title);
        setTitle('');
        setMode('list');
    };

    return (
        <form onSubmit={handleSubmit}>
            Title:
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter todo title"
                required
            /><br /> <br />
            <button type="submit">Add</button>
            <button onClick={() => setMode('list')}>Cancel</button>
        </form>
    );
};

export default AddTodoForm;
