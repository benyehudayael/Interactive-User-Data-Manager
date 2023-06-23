import { useEffect, useState } from 'react';
import { StateContext } from './StateContext';
import React, { useContext } from 'react';
import Utils from './Utils';
import User from './User';
import Post from './Post';
import Todo from './Todo';
import './App.css'
import AddTodoForm from './AddTodoForm'
import AddPostForm from './AddPostForm'
import AddUserForm from './AddUserForm';

function App() {
  const { fetchInitialData } = Utils();
  const { users, setUsers } = useContext(StateContext);
  const { todos, setTodos } = useContext(StateContext);
  const { posts, setPosts } = useContext(StateContext);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [uncompletedTasksUsers, setUncompletedTasksUsers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isSelectedUserId, setIsSelectedUserId] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [todoMode, setTodoMode] = useState('list');
  const [postMode, setPostMode] = useState('list');
  const [showAddUserForm, setShowAddUserForm] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const usersWithUncompletedTasks = todos
      .filter((todo) => !todo.completed)
      .map((todo) => todo.userId);
    setUncompletedTasksUsers(usersWithUncompletedTasks);
  }, [todos]);

  useEffect(() => {
    const fU = users.filter((user) =>
      user.name.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase()));
    setFilteredUsers(fU);
  }, [users, searchText]);

  const getData = async () => {
    const { users: u, posts: p, todos: t } = await fetchInitialData()
    setUsers(u.sort((a, b) => a.id - b.id));
    setPosts(p);
    setTodos(t);
  }
  const handleSearchChange = (e) => { setSearchText(e.target.value); }
  const handleCancelAddUser = () => {
    setShowAddUserForm(false);
  };

  const handleShowAddUserForm = () => {
    setShowAddUserForm(true);
  };

  return (
    <>
      <input type="text" value={searchText} name='serach' onChange={handleSearchChange} placeholder="Search" />
      <button onClick={handleShowAddUserForm} disabled={showAddUserForm}>Add</button>
      <div className='container'>
        <div>
          {filteredUsers.map((user) => (
            <User
              key={user.id}
              user={user}
              hasUncompletedTasks={uncompletedTasksUsers.includes(user.id)}
              setIsSelectedUserId={setIsSelectedUserId}
              selectedUserId={selectedUserId}
              setSelectedUserId={setSelectedUserId}
              setShowAddUserForm={setShowAddUserForm}
            />
          ))}
        </div>
        {showAddUserForm ? (
          <AddUserForm handleCancelAddUser={handleCancelAddUser} />
        ) : (<div className="user-info">
          {isSelectedUserId && (
            <>
              <div>
                <h1>Posts: User {selectedUserId}</h1>
                {postMode === 'list' ? (
                  <div className="post-list">
                    <button onClick={() => setPostMode('add')}>Add</button>
                    {posts
                      .filter((post) => post.userId === selectedUserId)
                      .map((post) => (
                        <Post key={post.id} title={post.title} body={post.body} />
                      ))}
                  </div>
                ) : (
                  <div className="add-form">
                    <AddPostForm setMode={setPostMode} userId={selectedUserId} />
                  </div>
                )}
              </div>
              <div>
                <h1>Tasks: User {selectedUserId}</h1>
                {todoMode === 'list' ? (
                  <div className="todo-list">
                    <button onClick={() => setTodoMode('add')}>Add</button>
                    {todos
                      .filter((todo) => todo.userId === selectedUserId)
                      .map((todo) => (
                        <Todo key={todo.id} id={todo.id} title={todo.title} completed={todo.completed} />
                      ))}
                  </div>
                ) : (
                  <div className="add-form">
                    <AddTodoForm setMode={setTodoMode} userId={selectedUserId} />
                  </div>
                )}
              </div>
            </>
          )}
        </div>)}
      </div>
    </>
  )
}

export default App
