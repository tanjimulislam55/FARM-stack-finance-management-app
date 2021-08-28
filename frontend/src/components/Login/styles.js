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
    typo: {
        // ...theme.typography.button,
        padding: theme.spacing(1)
    }
}))