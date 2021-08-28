/* eslint-disable no-unused-vars */
import useStyles from './styles'
import { useRef, useState } from 'react';
import { Link, Redirect, useHistory } from "react-router-dom"
import { Button, Box, TextField, Snackbar, Typography } from '@material-ui/core'
import axios from 'axios'
import MuiAlert from '@material-ui/lab/Alert';
import { useAuth } from '../../context/authContext';


export default function Signup() {
    const classes = useStyles()
    const usernameRef = useRef()
    const emailRef = useRef()
    const fullNameRef = useRef()
    const passwordRef = useRef()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const { currentUser, setCurrentUser } = useAuth()
    const history = useHistory()

    axios.defaults.withCredentials = true;

    function handleSubmit(e) {
        e.preventDefault()
        
        if (usernameRef.current.value === "" || passwordRef.current.value === "" || fullNameRef.current.value === "" || emailRef.current.value === "") {
            return setError('Every form field is required')
        }
        setError('')
        setLoading(true)

        // register post request using axios
        axios.post(`${process.env.REACT_APP_API_URL}/register`, {
            username: usernameRef.current.value,
            email: emailRef.current.value,
            full_name: fullNameRef.current.value,
            password: passwordRef.current.value,
        }).then(
            res => {
                setLoading(false)
                history.push("/login")
            }
        ).catch(
            err => {
                setError(err.response.data.detail)
                setLoading(false)
            }
        )}


    const handleClose = (e, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setOpen(false)
    }

    const Alert = (props) => {
        return <MuiAlert elevation={4} variant="filled" {...props} />;
    }


    return !currentUser ? (
        <main className={classes.main}>
            <Box>
                <form className={classes.form} onSubmit={(e) => {
                    setOpen(true)
                    handleSubmit(e)
                }}>
                    <Typography 
                        color="primary" 
                        variant="h3" 
                        align="center" 
                        className={classes.typo}
                    >
                        Sign Up
                    </Typography>
                    <TextField 
                        label="Username"
                        name="username"
                        variant="outlined"
                        inputRef={usernameRef}                    
                    />
                    <TextField 
                        label="Email"
                        name="email"
                        variant="outlined"
                        inputRef={emailRef}           
                    />
                    <TextField 
                        label="Full Name"
                        name="fullName"
                        variant="outlined"
                        inputRef={fullNameRef}
                    />
                    <TextField 
                        label="Password"
                        type="password"
                        name="password"
                        variant="outlined"
                        inputRef={passwordRef}
                    />
                    <Button size="large" disabled={loading} type="submit" color="secondary">Sign Up</Button>
                    <Typography align="center" className={classes.typo}>
                        Already have an account? <Link to="/login">Log In</Link>
                    </Typography>
                    {error && <Snackbar open={open} autoHideDuration={4000} onClose={(e, reason) => handleClose(e, reason)}>
                        <Alert onClose={(e, reason) => handleClose(e, reason)} severity="error">{error}</Alert>
                    </Snackbar>}
                </form>
            </Box>
        </main>
    ) : <Redirect to="/" />
}
