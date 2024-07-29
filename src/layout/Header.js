import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../assets/argentBankLogo.webp';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthConnected, logout } from '../features/auth/authSlice';
import { emptyUserData, getUserData } from '../features/user/userSlice';
import '@fortawesome/fontawesome-free/css/all.min.css';


function Header() {
    const dispatch = useDispatch();
    const userData = useSelector(getUserData);
    const connected = useSelector(getAuthConnected);

    const handleLogOut = () => {
        dispatch(logout());
        dispatch(emptyUserData());
    };

    const displayName = userData.userName || userData.firstName;

    return (
        <nav className="main-nav">
            <Link className="main-nav-logo" to="/">
                <img
                    className="main-nav-logo-image"
                    src={Logo}
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div>
                {!connected && (
                    <NavLink className="main-nav-item" to="/login">
                        <i className="fas fa-user-circle" aria-hidden="true"></i>
                        Sign In
                    </NavLink>
                )}
                {connected && (
                    <>
                        <NavLink className="main-nav-item" to="/profile">
                            <i className="fas fa-user-circle"></i>
                            {displayName}
                        </NavLink>
                        <NavLink
                            className="main-nav-item"
                            to="/"
                            onClick={handleLogOut}
                        >
                            <i
                                className="fas fa-sign-out"
                                aria-hidden="true"
                            ></i>
                            Sign out
                        </NavLink>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Header;
