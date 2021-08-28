import { Card, CardContent, CardHeader, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
    title: {
        fontSize: '20px'
    }
}))


export default function Dataview({ item, endpoint }) {
    const classes = useStyles()

        switch (endpoint) {
            case 'income_from_person':
                return (
                    <Card container elevation={2}>
                        <CardHeader
                            classes={{ title: classes.title}}
                            title={item.type}
                            subheader={moment(item.date).format('MMM DD YYYY h:mm A')}
                        />
                        <CardContent>
                            <Typography variant="subtitle2" component="p">
                                Name: {item.donor_name}
                            </Typography>
                            <Typography variant="subtitle2" component="p">
                                Registration: {item.registration}
                            </Typography>
                            <Typography variant="subtitle2" component="p" style={{display: 'flex'}}>
                                Phone: {item.phone}
                            </Typography>
                            <Typography variant="subtitle2" component="p">
                                Amount: {item.amount}
                            </Typography>
                        </CardContent>
                    </Card>
                )
            case 'income_from_program':
                return (
                    <Card container elevation={2}>
                        <CardHeader
                            classes={{ title: classes.title}}
                            title={item.program_name}
                            subheader={moment(item.date).format('MMM DD YYYY h:mm A')}
                        />
                        <CardContent>
                            <Typography variant="subtitle2" component="p">
                                Total participant: {item.total_participant}
                            </Typography>
                            <Typography variant="subtitle2" component="p">
                                Amount: {item.amount}
                            </Typography>
                        </CardContent>
                    </Card>
                )
            case 'expenditure':
                return (
                    <Card container elevation={2}>
                        <CardHeader
                            classes={{ title: classes.title}}
                            title={item.type}
                            subheader={moment(item.date).format('MMM DD YYYY h:mm A')}
                        />
                        <CardContent>
                            <Typography variant="subtitle2" component="p">
                                Amount: {item.amount}
                            </Typography>
                            <Typography variant="subtitle2" component="p" style={{display: 'flex'}}>
                                Details: {item.details}
                            </Typography>
                        </CardContent>
                    </Card>
                )
            default:
                return (
                    <div></div>
                )
        }
}