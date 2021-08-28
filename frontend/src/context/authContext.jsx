/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

const AuthContext = createContext([{}, () => {}])

const useAuth = () => useContext(AuthContext)

function AuthProvider({ children }) {

    axios.defaults.withCredentials = true;
    
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    const [didLogin, setDidLogin] = useState(false)
    
    useEffect(() => {
        const unsubscribe = axios.get(`${process.env.REACT_APP_API_URL}/api/users/me`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
            }).then(
                res => {
                    setCurrentUser(res.data)
                    setLoading(false)
                }
            ).catch(
                err => {
                    setCurrentUser(null)
                    setLoading(false)
                }
            )
        
        return () => unsubscribe
    }, [didLogin])


    const value = {
        currentUser,
        setCurrentUser,
        didLogin, 
        setDidLogin,
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export { AuthProvider, useAuth }