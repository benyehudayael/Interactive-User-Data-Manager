import React from 'react';
import Post from './Post';
import Todo from './Todo';
import AddPostForm from './AddPostForm';
import AddTodoForm from './AddTodoForm';

const UserPosts = ({ posts, selectedUserId, postMode, setPostMode }) => {
  return (
    <div className="user-details background-white">
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
  );
};

const UserTasks = ({ todos, selectedUserId, todoMode, setTodoMode }) => {
  return (
    <div className="user-details background-white">
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
  );
};

export { UserPosts, UserTasks };
