import { makeStyles } from "@material-ui/core";

export default makeStyles(() => ({
    toolbar: {
        backgroundColor: 'white',
    },
    gid: {
        display: 'flex',
    },
    logout: {
        flexGrow: 1,
        textAlign: 'right',
        '& .MuiButton-root:hover': {
            backgroundColor: "#f50057",
            color: 'white',
            transition: '0.5s'
        }
    },
    homeButton: {
        '& .MuiButton-label': {
            color: '#069370'
        },
    },
    menuButton: {
        flexGrow: 1,
        textAlign: 'right',
        '& .MuiButton-label': {
            color: '#069370',
        },
    },
    activeButton: {
        backgroundColor: '#069370',
        transition: '0.5s',
        '& .MuiButton-label': {
            color: 'white'
        }
    }
}))
