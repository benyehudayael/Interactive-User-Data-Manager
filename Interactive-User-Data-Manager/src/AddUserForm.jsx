import { useState } from 'react';
import Utils from './Utils';

const AddUserForm = ({ handleCancelAddUser }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const { addUser } = Utils();

    const handleSubmit = (e) => {
        e.preventDefault();
        addUser(name, email);
        setName('');
        setEmail('');
        handleCancelAddUser();
    };

    return (
        <div>
            <h2>Add User</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <br />
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <br />
                <button type="submit">Submit</button>
                <button type="button" onClick={handleCancelAddUser}>
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default AddUserForm;
