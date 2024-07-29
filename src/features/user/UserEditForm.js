import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData, updateUserData } from './userSlice';
import { getAuthToken } from '../auth/authSlice';

function UserEditForm({ setEditToggle }) {
    const dispatch = useDispatch();
    const token = useSelector(getAuthToken);
    const user = useSelector(getUserData);
    const [userNames, setUserNames] = useState({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        userName: user.userName || '', 
    });

    const canSave = Boolean(userNames.firstName) && Boolean(userNames.lastName) && Boolean(userNames.userName);

    const handleCancel = () => {
        setEditToggle(false);
    };

    const handleChange = (event) => {
        setUserNames({
            ...userNames,
            [event.target.name]: event.target.value,
        });
    };

    const handleEdit = async () => {
        const data = { token, userNames: {userName: userNames.userName} };
        if (canSave) {
            dispatch(updateUserData(data));
            setEditToggle(false);
        }
    };

    return (
        <div className="container">
            <div className="edit-wrapper">
                <div className="input-group">
                    <label for="userName">User Name:</label>
                    <input
                        type="text"
                        id="userName"
                        name="userName"
                        placeholder={user.userName || "User Name"}
                        value={userNames.userName}
                        autoFocus
                        onChange={handleChange}
                    />
                </div>
                <div className="input-group">
                    <label for="firstName">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder={user.firstName || "First Name"}
                        value={userNames.firstName}
                        disabled
                    />
                </div>
                <div className="input-group">
                    <label for="lastName">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder={user.lastName || "Last Name"}
                        value={userNames.lastName}
                        disabled
                    />
                </div>
            </div>
            <div className="button-wrapper">
                <button
                    className="edit-content-button"
                    disabled={!canSave}
                    onClick={handleEdit}
                >
                    Save
                </button>
                <button
                    className="edit-content-button"
                    onClick={handleCancel}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default UserEditForm;
