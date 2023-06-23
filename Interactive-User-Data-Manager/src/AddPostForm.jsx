import React from 'react';
import { useState } from 'react';
import Utils from './Utils'

const AddPostForm = ({ setMode, userId }) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const { addPost } = Utils();

    const handleSubmit = (e) => {
        e.preventDefault();
        addPost(userId, title, body);
        setTitle('');
        setBody('');
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
            />
            Body:
            <input
                type="text"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Enter todo body"
                required
            /><br /> <br />
            <div className='buttonsContainer'>
                <button type="submit">Add</button>
                <button onClick={() => setMode('list')}>Cancel</button>
            </div>
        </form>
    );
};

export default AddPostForm;
