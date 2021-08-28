/* eslint-disable no-unused-vars */
import { useState } from 'react'
import axios from 'axios'
import { useAuth } from '../context/authContext'


export default function useForm(ifv) {
    const [values, setValues] = useState(ifv)
    const [response, setResponse] = useState('')
    const { currentUser } = useAuth()

    axios.defaults.withCredentials = true;

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    function handleResponse(e, variant) {
        setResponse(variant)
    }

    const handleSubmit = (e, type) => {
        e.preventDefault()

        switch(type) {

            case "fromProgram":
                axios.post(`${process.env.REACT_APP_API_URL}/api/income_from_program`, {
                    program_name: values.programName,
                    total_participant: values.totalParticipant,
                    amount: values.amount,
                    date: values.date,
                    user: currentUser.username
                }, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                    }
                })
                break

            case "fromPerson":
                axios.post(`${process.env.REACT_APP_API_URL}/api/income_from_person`, {
                    donor_name: values.donorName,
                    registration: values.registration,
                    phone: values.phone,
                    amount: values.amount,
                    type: values.programType,
                    date: values.date,
                    user: currentUser.username
                }, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                    }
                })
                break

            case "xpn":
                axios.post(`${process.env.REACT_APP_API_URL}/api/expenditure`, {
                    amount: values.amount,
                    details: values.details,
                    type: values.expenseType,
                    date: values.date,
                    user: currentUser.username
                }, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                    }
                })
                break

                default:
                    break;
                }
        setValues(ifv)
    }
    
    return {
        values,
        setValues,
        handleInputChange,
        handleSubmit,
        response,
    }
}
