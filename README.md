# React Mid-Project

This project is a client-side database management application based on server data provided by the following endpoints:

- Users: https://jsonplaceholder.typicode.com/users
- Posts: https://jsonplaceholder.typicode.com/posts
- Todos: https://jsonplaceholder.typicode.com/todos

The application has the following features:

### Case 1 - Application Starts

- The UI presents all the user data, ordered by user ID.
- Users with uncompleted tasks (todos) are marked with a red border, while other users have a green border.

### Case 2: Search

- Entering text in the search text box filters the user list based on matching name or email.

### Case 3: Other Data

- Mouseover the "Other Data" section to view additional data.
- Clicking on the "Mouse Over" section closes that section.

### Case 4: Update/Delete Data

- Editing user data and clicking "Update" updates the user's data.
- Clicking "Delete" deletes all the user's data.

### Case 5: Selecting User

- Clicking on the ID label colors the user region in orange.
- The user's posts and todos are presented.
- Uncompleted todos have a "Mark Completed" button to complete the task.

### Case 6: Add new ToDo

- Clicking "Add" above the "ToDo" list replaces the list with a form for adding a new todo.
- Clicking "Cancel" brings back the "ToDo" list.

### Case 7: Add new Post

- Clicking "Add" above the "Posts" list replaces the list with a form for adding a new post.
- Clicking "Cancel" brings back the "Posts" list.

### Case 8: Add new User

- Clicking "Add" above the "Users" list navigates to a new user screen.
- The "Other Data" is not provided during user creation and is only available when updating user data.

### Installation

1. Clone the repository: `git clone https://github.com/your-username/react-mid-project.git`
2. Install dependencies: `npm install`
3. Run the application: `npm start`

