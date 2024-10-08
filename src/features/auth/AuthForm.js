import React, { useState } from 'react'
// Hooks rédux, dispatcher ou selectionner des états depuis le store
import { useDispatch, useSelector } from 'react-redux'
// Naviguer vers une autre page
import { useNavigate } from 'react-router-dom'
// Sélecteurs et actions liés à l'authentification importés depuis le slice
import {
    changeUserCredentials,
    getAuthError,
    getAuthStatus,
    getUserToken,
} from './authSlice'
import Loader from '../../utils/Loader/Loader'

function AuthForm() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const localStorageEmail = localStorage.getItem('email')
    const localStoragePassword = localStorage.getItem('password')
    const [credentials, setCredentials] = useState({
        email: localStorageEmail || '',
        password: localStoragePassword || '',
    })
    const [rememberMe, setRememberMe] = useState(true)

// Selecteurs Redux
    const authError = useSelector(getAuthError)
    const authStatus = useSelector(getAuthStatus)

// Inverse l'état de Remember me si la case est cochée
    const handleRememberMe = () => {
        setRememberMe(!rememberMe)
    }
// variables pour affichage conditionnel en cas d'echec ou de chargement 
// de l'authentification
    let content
    if (authStatus === 'failed') {
        content = <span className="errorMessage">{authError}</span>
    } else if (authStatus === 'loading') {
        content = <Loader />
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (rememberMe) {
            localStorage.setItem('email', credentials.email)
            localStorage.setItem('password', credentials.password)
        } else {
            localStorage.removeItem('email')
            localStorage.removeItem('password')
        }
        await dispatch(changeUserCredentials(credentials))
        await dispatch(getUserToken(credentials))
        navigate('/profile')
    }
    const handleChange = (event) => {
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value,
        })
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <div className="input-wrapper">
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    name="email"
                    autoFocus
                    value={credentials.email}
                    onChange={(e) => handleChange(e)}
                />
            </div>
            <div className="input-wrapper">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={credentials.password}
                    onChange={(e) => handleChange(e)}
                />
            </div>
            <div className="input-remember">
                <input
                    type="checkbox"
                    id="remember-me"
                    checked={rememberMe}
                    onChange={handleRememberMe}
                />
                <label htmlFor="remember-me">Remember me</label>
            </div>
            <button className="sign-in-button">Sign In</button>
            {content}
        </form>
    )
}

export default AuthForm