/* eslint-disable no-unused-vars */
import { AppBar, Button, ButtonGroup, Grid, Toolbar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import useStyles from './styles'
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

export default function Navbar() {
    const classes = useStyles();
    const location = useLocation()
    const history = useHistory()
    const [active, setActive] = useState({
        home: location.pathname === '/' ? true : false,
        income: location.pathname === '/income' ? true : false,
        expenditure: location.pathname === '/expenditure' ? true : false
    })
    const { currentUser, setCurrentUser, setDidLogin } = useAuth()
    
    const handleLogout = () => {
        localStorage.removeItem("token")
        setCurrentUser(null)
        setDidLogin(false)
        history.push("/login")
    }

    const button = (path) => {
        setActive({
            [path]: true
        })
    }

    return (
        <>
            {currentUser && <>
                <AppBar position="fixed">
                    <Toolbar className={classes.toolbar}>
                        <Grid container className={classes.grid}>
                            <Grid item>
                                <Button
                                    onClick={() => button('home')}
                                    className={active.home ? classes.activeButton : classes.homeButton} 
                                    size="large" 
                                    component={Link} 
                                    to="/"
                                >
                                    Home
                                </Button>
                            </Grid>
                            <Grid item className={classes.menuButton}>
                                <ButtonGroup variant="text">
                                    <Button 
                                        onClick={() => button('income')}
                                        className={active.income ? classes.activeButton : classes.menuButton} 
                                        size="large" 
                                        component={Link} 
                                        to="/income"
                                        >
                                        Income
                                    </Button>
                                    <Button 
                                        onClick={() => button('expenditure')}
                                        className={active.expenditure ? classes.activeButton : classes.menuButton} 
                                        size="large" 
                                        component={Link} 
                                        to="/expenditure"
                                        >
                                        Expenditure
                                    </Button>
                                </ButtonGroup>
                            </Grid>
                            <Grid item className={classes.logout}>
                                <Button size="large" color="primary" onClick={handleLogout}>Logout</Button>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </>}
        </>
    )
}

