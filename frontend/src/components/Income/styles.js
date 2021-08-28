import { makeStyles } from "@material-ui/core";


export default makeStyles((theme) => ({
    main: {
        padding: '70px',
    },
    form: {
        width: '30em',
        margin: '20px auto',
        display: 'grid',
        '& .MuiFormControl-root': {
            margin: theme.spacing(1)
        }
    },
}))