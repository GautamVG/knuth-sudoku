import { Typography, Button } from '@mui/material';

export default function(props) {
    return <>
        <Typography variant="h1">Hello</Typography>

        <Button variant='contained' onClick={props.onFinish}>Finish</Button>
    </>
}