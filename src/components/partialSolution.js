import { Box, Chip, Stack } from "@mui/material";
import { useEffect, useState } from "react"

export default function(props) {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        if (props.query.code === 'addedPartialSolution') {
            setRows([...rows, props.rowIndexParser(props.query.data)]);
        } else if (props.query.code === 'invalidPartialSolution' || props.query.code === 'validPartialSolution') {
            setRows([]);
        }
    }, [props.query])

    return (
        <Stack direction='row' gap={1} flexWrap='wrap'>
            {
                rows.map(row => (
                    <Chip label={row} color='primary' />
                ))
            }
        </Stack>
    )
}