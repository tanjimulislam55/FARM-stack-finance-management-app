/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Tab, Tabs, TextField, FormControl, InputLabel, Select, MenuItem, Box, Button, Grid } from '@material-ui/core';
import MomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import useStyles from './styles'
import useForm from '../../hook/useForm';

const ifv = {
    donorName: "",
    registration: "",
    phone: "",
    amount: "",
    programName: "",
    totalParticipant: "",
    date: new Date(),
    programType: ""
}

export default function Income() {
    const classes = useStyles()
    const [value, setValue] = useState(0)
    const {
        values,
        handleInputChange,
        handleSubmit,
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
                <Tabs
                    centered
                    value={value}
                    onChange={(e, newValue) => setValue(newValue)}
                    className={classes.tabs}
                >
                    <Tab label="From Person" />
                    <Tab label="From Program" />
                </Tabs>

                {value === 0 ? 
                // <Tab label="From Person" />
                (<form className={classes.form} onSubmit={(e, type="fromPerson") => handleSubmit(e, type)}>
                    <TextField
                        label="Donor Name (Required)" 
                        name="donorName" 
                        onChange={(e) => handleInputChange(e)} 
                        value={values.donorName}
                        variant="outlined"
                    />
                    <TextField
                        label="Registration" 
                        name="registration" 
                        onChange={(e) => handleInputChange(e)} 
                        value={values.registration}
                        variant="outlined"
                        />
                    <TextField
                        label="Phone" 
                        name="phone" 
                        onChange={(e) => handleInputChange(e)} 
                        value={values.phone}
                        variant="outlined"
                        />
                    <TextField
                        label="Amount (Required)" 
                        name="amount" 
                        onChange={(e) => handleInputChange(e)} 
                        value={values.amount}
                        variant="outlined"
                    />
                    <FormControl className={classes.formControl} variant="outlined">
                        <InputLabel>Type (Required)</InputLabel>
                        <Select name="programType" value={values.programType} onChange={(e) => handleInputChange(e)} label="Type">
                            <MenuItem value="Office Rent">Office Rent</MenuItem>
                            <MenuItem value="Cell Donation">Cell Donation</MenuItem>
                            <MenuItem value="Special Donation">Special Donation</MenuItem>
                            <MenuItem value="Blood Camp">Blood Camp</MenuItem>
                            <MenuItem value="Entertainment">Entertainment</MenuItem>
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
                </form>) : 
                // <Tab label="From Program" />
                (<form className={classes.form} onSubmit={(e, type="fromProgram") => handleSubmit(e, type)}>
                        <TextField 
                            label="Program Name (Required)" 
                            name="programName" 
                            onChange={(e) => handleInputChange(e)} 
                            value={values.programName}
                            variant="outlined"
                        />
                        <TextField 
                            label="Total Participant" 
                            name="totalParticipant" 
                            onChange={(e) => handleInputChange(e)} 
                            value={values.totalParticipant}
                            variant="outlined"
                        />
                        <TextField 
                            label="Amount (Required)" 
                            name="amount" 
                            onChange={(e) => handleInputChange(e)} 
                            value={values.amount}
                            variant="outlined"
                        />
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
                )}
            </Box>
        </main>
    );
}


