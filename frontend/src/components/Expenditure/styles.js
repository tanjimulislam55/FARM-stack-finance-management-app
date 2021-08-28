import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    main: {
        padding: '70px'
    },
    form: {
        display: 'grid',
        margin: '20px auto',
        width: '30em',
        '& .MuiFormControl-root': {
            margin: theme.spacing(1)
        }
    },
    
}))