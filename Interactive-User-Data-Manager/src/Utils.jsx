import axios from 'axios';
import { useContext } from 'react';
import { StateContext } from './StateContext';

const Utils = () => {
    const { users, setUsers } = useContext(StateContext);
    const { todos, setTodos } = useContext(StateContext);
    const { posts, setPosts } = useContext(StateContext);

    const fetchInitialData = async () => {
        try {
            const usersResponse = await axios.get('https://jsonplaceholder.typicode.com/users');
            const postsResponse = await axios.get('https://jsonplaceholder.typicode.com/posts');
            const todosResponse = await axios.get('https://jsonplaceholder.typicode.com/todos');

            const usersData = usersResponse.data;
            const postsData = postsResponse.data;
            const todosData = todosResponse.data;

            return { users: usersData, posts: postsData, todos: todosData };
        } catch (error) {
            console.error('Error retrieving data:', error);
            return null;
        }
    };

    const updateUser = async (userId, updatedData) => {
        try {
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === userId ? { ...user, ...updatedData } : user
                )
            );
            console.log('User data updated successfully!');
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    const deleteUser = (userId) => {
        try {
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
            setTodos((prevTodos) => prevTodos.filter((todo) => todo.userId !== userId));
            setPosts((prevPosts) => prevPosts.filter((post) => post.userId !== userId));
            console.log('User deleted successfully!');
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const markTodoAsCompleted = (todoId) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === todoId ? { ...todo, completed: true } : todo
            )
        );
    };

    const addTodo = (userId, title) => {
        const newTodo = {
            userId: userId,
            id: todos.length + 1,
            title: title,
            completed: false,
        };

        setTodos((prevTodos) => [...prevTodos, newTodo]);
    }

    const addPost = (userId, title, body) => {
        const newPost = {
            userId: userId,
            id: todos.length + 1,
            title: title,
            body: body,
        };

        setPosts((prevPosts) => [...prevPosts, newPost]);
    }

    const addUser = (name, email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isEmailValid = emailRegex.test(email);

        if (!isEmailValid) {
            console.log('Invalid email format');
            return;
        }
        const isEmailExists = users.some((user) => user.email === email);

        if (isEmailExists) {
            console.log('Email already exists');
            alert('Email already exists')
            return;
        }
        const newUser = {
            id: users.length + 1,
            name: name,
            email: email,
        };

        setUsers((prevUsers) => [...prevUsers, newUser]);
    }
    return { fetchInitialData, updateUser, deleteUser, markTodoAsCompleted, addTodo, addPost, addUser };
};

export default Utils;
