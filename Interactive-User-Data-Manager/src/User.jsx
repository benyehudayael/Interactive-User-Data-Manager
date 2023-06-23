import React from 'react';
import { useState, useEffect } from 'react';
import Utils from './Utils'

const User = ({ user, uncompletedTasksUsers, setIsSelectedUserId, setSelectedUserId, selectedUserId, setShowAddUserForm }) => {

    const { updateUser, deleteUser } = Utils();
    const [showOtherData, setShowOtherData] = useState(false);
    const [updatedUser, setUpdatedUser] = useState(user);
    const [orangeBg, setOrangeBg] = useState(false);

    const [userStyle, setUserStyle] = useState({
        border: uncompletedTasksUsers.includes(user.id) ? '2px solid #ff000080' : '2px solid #00400e80',
        padding: '10px',
        margin: '10px',
        width: '370px',
        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
        backgroundColor: orangeBg && selectedUserId == user.id ? '#fee4cb' : 'inherit',
    });

    useEffect(() => {
        setUserStyle((prevUserStyle) => ({
            ...prevUserStyle,
            border: uncompletedTasksUsers.includes(user.id) ? '2px solid #ff000080' : '2px solid #00400e80',
        }));
    }, [uncompletedTasksUsers]);

    useEffect(() => {
        setUserStyle((prevUserStyle) => ({
            ...prevUserStyle,
            backgroundColor: orangeBg && selectedUserId === user.id ? '#fee4cb' : 'inherit',
        }));
    }, [selectedUserId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUser((prevState) => ({
            ...prevState,
            [name]: value,
            address: {
                ...prevState.address,
                [name]: value,
            },
        }))
    }
    const handleMouseOver = () => setShowOtherData(true);
    const closeMoreData = () => setShowOtherData(false);
    const handleUpdateUser = async () => {
        const { name, email, address } = updatedUser;
        const updatedData = {};

        if (name !== '') { updatedData.name = name; }
        if (email !== '') { updatedData.email = email; }
        if (address?.street !== '') {
            updatedData.address = { ...updatedData.address, street: address?.street };
        }
        if (address?.city !== '') {
            updatedData.address = { ...updatedData.address, city: address?.city };
        }
        if (address?.zipcode !== '') {
            updatedData.address = { ...updatedData.address, zipcode: address?.zipcode };
        }

        if (Object.keys(updatedData).length > 0) {
            updateUser(user.id, updatedData)
        }
    }
    const handleDeleteUser = async () => {
        deleteUser(user.id);
        setIsSelectedUserId(false);
    }
    const handleSelectUser = () => {
        if (selectedUserId === user.id) {
            setOrangeBg(false)
            setSelectedUserId(null)
            setIsSelectedUserId(false);
        } else {
            setOrangeBg(true)
            setSelectedUserId(user.id)
            setIsSelectedUserId(true);
            setShowAddUserForm(false)
        }
    };

    return (
        <div className='user-box' style={userStyle}>
            <p style={{ cursor: 'pointer' }} onClick={handleSelectUser}>ID: {user.id}</p>
            <p>Name: </p> <input type="text" name='name' value={updatedUser.name} onChange={handleInputChange} readOnly={false} />
            <p>Email: </p> <input type="text" name='email' value={updatedUser.email} onChange={handleInputChange} readOnly={false} />
            <div className="button-wrapper">
                <button onMouseOver={handleMouseOver} onClick={closeMoreData}>Other Data</button>
                {showOtherData && (
                    <div className="other-data">
                        <p>Street: </p> <input type="text" name='street' value={updatedUser.address?.street} onChange={handleInputChange} readOnly={false} />
                        <p>City: </p> <input type="text" name='city' value={updatedUser.address?.city} onChange={handleInputChange} readOnly={false} />
                        <p>Zip Code: </p> <input type="text" name='zipcode' value={updatedUser.address?.zipcode} onChange={handleInputChange} readOnly={false} />
                    </div>
                )}
            </div>
            <div className='buttonsContainer'>
                <button onClick={handleUpdateUser}>Update</button>
                <button onClick={handleDeleteUser}>Delete</button>
            </div>
        </div>
    );
};

export default User;
