import { makeStyles } from "@material-ui/core";

const drawerWidth = 240

export default makeStyles((theme) => ({
    main: {
        paddingTop: '80px',
        display: 'flex'
    },
    drawer: {
        width: drawerWidth,
        position: 'sticky',
        flexShrink: 0,
        '& .MuiDrawer-paper': {
            position: 'relative'
        }
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto'
    },
    content: {
        display: 'flex',
        padding: theme.spacing(3),
        width: '100%'
    },
    active: {
        background: '#EEEEEE',
        border: '1.5px solid #069370'
    },
    dataView: {
        border: '1px solid blue',
    },
    total: {
        color: theme.palette.primary.main,
        paddingTop: theme.spacing(1),
        fontSize: "20px",
    },
    balance: {
        '& .MuiButton-root:hover': {
            backgroundColor: "#f50057",
            color: 'white',
            transition: '0.5s'
        }
    },
    popover: {
        padding: '5px',
        backgroundColor: "#3f51b5",
        color: 'white',
    },
}))