import { useEffect, useState } from 'react';
import { StateContext } from './StateContext';
import React, { useContext } from 'react';
import Utils from './Utils';
import User from './User';
import './App.scss'
import AddUserForm from './AddUserForm';
import { UserPosts, UserTasks } from './UserSections';

function App() {
  const { fetchInitialData } = Utils();
  const { users, setUsers, todos, setTodos, posts, setPosts } = useContext(StateContext);
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
    <React.Fragment>
      <div className="container">
        <div className="search-wrapper">
          <input className="search-input" type="text" value={searchText} name='serach' onChange={handleSearchChange} placeholder="Search" />
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="feather feather-search" viewBox="0 0 24 24">
            <defs></defs>
            <circle cx="11" cy="11" r="8"></circle>
            <path d="M21 21l-4.35-4.35"></path>
          </svg>
        </div>
        <div className="button-wrapper">
          <button onClick={handleShowAddUserForm} disabled={showAddUserForm}>Add</button>
        </div>
      </div>

      <div className="container content">
        <div className='background-white'>
          {filteredUsers.map((user, index) => (
            <User
              key={user.id}
              user={user}
              uncompletedTasksUsers={uncompletedTasksUsers}
              setIsSelectedUserId={setIsSelectedUserId}
              selectedUserId={selectedUserId}
              setSelectedUserId={setSelectedUserId}
              setShowAddUserForm={setShowAddUserForm}
              className={`user-${index}`}
            />
          ))}
        </div>
        {showAddUserForm ? (
          <div className="user-details background-white">
            <AddUserForm handleCancelAddUser={handleCancelAddUser} />
          </div>
        ) : (
          <>
            {isSelectedUserId && (
              <div>
                <UserPosts
                  posts={posts}
                  selectedUserId={selectedUserId}
                  postMode={postMode}
                  setPostMode={setPostMode}
                />
                <UserTasks
                  todos={todos}
                  selectedUserId={selectedUserId}
                  todoMode={todoMode}
                  setTodoMode={setTodoMode}
                />
              </div>
            )}
          </>
        )}
      </div>

    </React.Fragment>
  )
}

export default App
