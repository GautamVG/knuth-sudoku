import { Typography } from "@mui/material"

export default function(props) {
    return <>
        <Typography variant="h6">{`${props.query.comment} ${props.query.data ? props.query.data : ''}`}</Typography>
    </>
}