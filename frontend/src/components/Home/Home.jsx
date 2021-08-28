/* eslint-disable no-unused-vars */
import { Button, Container, Paper, Drawer, List, ListItem, ListItemIcon, ListItemText, Popover, Typography } from '@material-ui/core'
import React, { useEffect, useState, useRef } from 'react'
import { useReactToPrint } from 'react-to-print';
import GroupIcon from '@material-ui/icons/Group';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import ExplicitIcon from '@material-ui/icons/Explicit';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
import axios from 'axios'
import Dataview from './Dataview/Dataview'
import Masonry from 'react-masonry-css'
import moment from 'moment';
import useStyles from './styles'
import { Redirect } from "react-router-dom"
import { useAuth } from '../../context/authContext';
import Head from './Head/Head';


export default function Home() {
    const classes = useStyles()
    const [startDate, setStartdDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [data, setData] = useState([])
    const [endpoint, setEndpoint] = useState('')
    const [total, setTotal] = useState(0)
    const [anchorEl, setAnchorEl] = useState(null);
    const [balance, setBalance] = useState()
    const [openPopover, setOpenPopover] = useState(false)
    const { setDidLogin } = useAuth()
    // ------------------------------------------------------
    const [anchorElHead, setAnchorElHead] = useState(null);
    const [buttonHead, setButtonHead] = useState('Select Head')
    // ------------------------------------------------------
    const componentRef = useRef()


    axios.defaults.withCredentials = true;

    const drawerItems = [
        {
            text: 'Donation From Person',
            endpoint: 'income_from_person',
            icon: <GroupIcon />
        },
        {
            text: 'Donation From Program',
            endpoint: 'income_from_program',
            icon: <LoyaltyIcon />
        },
        {
            text: 'Expenditure',
            endpoint: 'expenditure',
            icon: <ExplicitIcon />
        }
    ]

    useEffect(() => {
        let amount = 0
        if (data) {
            for (let info of data) {
                if (info.amount) {
                    amount += info.amount
                }
            }
        }
        setTotal(amount)
    }, [data])


    const handleClickDrawer = async (e, endpoint) => {
        try {
            // fetch all data by type
            if (buttonHead !== 'Select Head') {
                const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/${endpoint}?q=${buttonHead}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                    }
                })
                setData(data)
                setEndpoint(endpoint)
            } else {
                const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/${endpoint}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                    }
                })
                setData(data)
                setEndpoint(endpoint)
            }
        } catch {
            setDidLogin(false)
            return <Redirect to="/login" />
        }
    }

    const breakpoints = {
        default: 4,
        1100: 2,
        700: 1,
    }

    const handleSubmitByDate = async (e) => {
        e.preventDefault()
        try {
            if (buttonHead !== 'Select Head') {
                const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/${endpoint}/${moment(startDate).format()}_${moment(endDate).format()}?q=${buttonHead}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                    }
                })
                setData(data)
            } else {
                const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/${endpoint}/${moment(startDate).format()}_${moment(endDate).format()}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                    }
                })
                setData(data)
            }
        } catch {
            setDidLogin(false)
            return <Redirect to="/login" />    
        }
    }

    // to show balance
    const handleOpenPopover = async (e) => {
        setAnchorEl(e.currentTarget)
        try {            
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/balance`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })
            setBalance(data)
            setOpenPopover(true)
        } catch  {
            setDidLogin(false)
            return <Redirect to="/login" />    
        }
    }


    const handleClosePopover = () => {
        setAnchorEl(null);  
        setOpenPopover(false)
    }

    const handleCloseHead = (e) => {
        setAnchorElHead(null);
        setButtonHead(e.target.textContent)
    }

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })


    return (
        <main className={classes.main}>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{ paper: classes.drawerPaper }}
            >
                <div className={classes.drawerContainer}>
                    <List>
                        {drawerItems.map(item => (
                            <ListItem
                                button
                                key={item.text}
                                onClick={(e, endpoint=item.endpoint) => handleClickDrawer(e, endpoint)}
                                className={item.endpoint === endpoint ? classes.active : null}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItem>
                        ))}
                    </List>
                </div>
                <form style={{ padding: '16px' }} onSubmit={(e) => handleSubmitByDate(e)}>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <KeyboardDatePicker
                            margin="normal"
                            label="Start Date"
                            format="DD/MM/yyyy"
                            value={startDate}
                            onChange={(date) => setStartdDate(date)}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                        <KeyboardDatePicker
                            margin="normal"
                            label="End Date"
                            format="DD/MM/yyyy"
                            value={endDate}
                            onChange={(date) => setEndDate(date)}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                    <Button variant="contained" size="small" type="submit" color="primary">
                        Check by date
                    </Button>
                    <Typography className={classes.total}>Total = {total} ৳</Typography>
                    <Button 
                        size="small" 
                        variant="outlined" 
                        color="secondary" 
                        className={classes.balance}
                        onClick={(e) => handleOpenPopover(e)}
                    >
                        Balance
                    </Button>
                    <Head 
                        anchorElHead={anchorElHead} 
                        setAnchorElHead={setAnchorElHead}  
                        buttonHead={buttonHead} 
                        setButtonHead={setButtonHead} 
                        handleCloseHead={handleCloseHead}
                    />
                    <Button 
                        size="small" 
                        variant="contained" 
                        style={{backgroundColor: "#069370", color: "white"}} 
                        onClick={handlePrint}
                    >
                        Print
                    </Button>
                </form>
            </Drawer>
            <Container ref={componentRef}>
                <Masonry 
                    breakpointCols={breakpoints}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                >
                    {data && data.map(item => (
                        <div className={classes.dataView} key={item._id}>
                            <Dataview item={item} endpoint={endpoint}/>
                        </div>
                    ))}
                </Masonry>
            </Container>
            {/* {} */}
            <Popover
                open={openPopover}
                anchorEl={anchorEl}
                onClose={handleClosePopover}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Paper elevation={3} className={classes.popover}>
                    <Typography>Balance = {balance}</Typography>
                </Paper>
            </Popover>
        </main>
    )
}