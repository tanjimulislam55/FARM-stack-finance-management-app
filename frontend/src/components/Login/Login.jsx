/* eslint-disable no-unused-vars */
import { useRef, useState } from 'react';
import { Link, useHistory, Redirect, useLocation } from "react-router-dom"
import { Button, Box, TextField, Snackbar, Typography } from '@material-ui/core'
import axios from 'axios'
import MuiAlert from '@material-ui/lab/Alert';
import useStyles from './styles'
import { useAuth } from '../../context/authContext';


export default function Login() {
    const classes = useStyles()
    const usernameRef = useRef()
    const passwordRef = useRef()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const { currentUser, setDidLogin } = useAuth()
    const history = useHistory()
    axios.defaults.withCredentials = true;

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (usernameRef.current.value === "" || passwordRef.current.value === "") {
            return setError('username or password field should not be empty')
        }
        setError('')
        setLoading(true)
        
        // encoding form values before post request
        const details = {
            "username": usernameRef.current.value,
            "password": passwordRef.current.value,
        }
        let formBody = [];
        for (let property in details) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        // login post request using axios
        axios.post(`${process.env.REACT_APP_API_URL}/login`, formBody, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
        }).then(
            res => {
                if (res.data.disabled !== true) {
                    localStorage.setItem("token", res.data.access_token)
                    setDidLogin(true)
                    setLoading(false)
                    history.push("/")                
                } else {
                    setError("Inactive user")
                    setLoading(false)
                }
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
                        Log In
                    </Typography>
                    <TextField 
                        label="Username"
                        variant="outlined"
                        inputRef={usernameRef}
                    />
                    <TextField 
                        label="Password"
                        type="password"
                        variant="outlined"
                        inputRef={passwordRef}
                    />
                    <Button size="large" disabled={loading} type="submit" color="secondary">Log In</Button>
                    <Typography align="center" className={classes.typo}>
                        Need an account? <Link to="/signup">Sign Up</Link>
                    </Typography>
                    {error && <Snackbar open={open} autoHideDuration={4000} onClose={(e, reason) => handleClose(e, reason)}>
                        <Alert onClose={(e, reason) => handleClose(e, reason)} severity="error">{error}</Alert>
                    </Snackbar>}
                </form>
            </Box>
        </main>
    ) : <Redirect to="/" />
}
