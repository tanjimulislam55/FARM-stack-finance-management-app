/* eslint-disable no-unused-vars */
import { TextField, FormControl, InputLabel, Select, MenuItem, Box, Button, Grid } from '@material-ui/core';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import useStyles from './styles'
import useForm from '../../hook/useForm';


const ifv = {
    amount: "",
    details: "",
    date: new Date(),
    expenseType: ""
}

export default function Expenditure() {
    const classes = useStyles()
    const {
        values,
        handleInputChange,
        handleSubmit,
        response
    } = useForm(ifv)    
    
    const convertToDefault = (date) => ({
        target: {
            name: "date",
            value: date
        }
    })

    return (
        <main className={classes.main}>
            <Box>
                <form className={classes.form} onSubmit={(e, type="xpn") => handleSubmit(e, type)}>
                    <TextField
                        label="Amount (Required)" 
                        name="amount" 
                        onChange={(e) => handleInputChange(e)} 
                        value={values.amount}
                        variant="outlined"
                    />
                    <TextField
                        label="Details" 
                        name="details"
                        onChange={(e) => handleInputChange(e)} 
                        value={values.details}
                        variant="outlined"
                    />
                    <FormControl className={classes.formControl} variant="outlined">
                        <InputLabel>Type (Required)</InputLabel>
                        <Select name="expenseType" value={values.expenseType} onChange={(e) => handleInputChange(e)} label="Type">
                            <MenuItem value="Office Rent">Office Rent</MenuItem>
                            <MenuItem value="Utility Bill">Utility Bill</MenuItem>
                            <MenuItem value="Stationary">Stationary</MenuItem>
                            <MenuItem value="Blood Camp">Blood Camp</MenuItem>
                            <MenuItem value="Transport">Transport</MenuItem>
                            <MenuItem value="Toiletries">Toiletries</MenuItem>
                            <MenuItem value="Entertainment">Entertainment</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                        </Select>
                    </FormControl>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <Grid container justifyContent="space-around">
                            <KeyboardDatePicker
                                format="DD/MM/yyyy" 
                                margin="normal" 
                                label="Date" 
                                name="date"
                                value={values.date}
                                onChange={(date) => handleInputChange(convertToDefault(date))}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>
                    <Button type="submit" color="secondary">Submit</Button>
                </form>
            </Box>
        </main>
    );
}


