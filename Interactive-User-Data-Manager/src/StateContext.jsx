import React, { createContext, useState } from 'react';

export const StateContext = createContext();

export const StateProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [todos, setTodos] = useState([]);
    const [posts, setPosts] = useState([]);

    return (
        <StateContext.Provider value={{ users, setUsers, todos, setTodos, posts, setPosts }}>
            {children}
        </StateContext.Provider>
    );
}