import { Chip, Box, Stack } from "@mui/material";
import { useEffect, useState } from "react"

export default function(props) {
    const [solutions, setSolutions] = useState([]);

    useEffect(() => {
        if (props.query.code === 'validPartialSolution') {
            let newSolution = props.query.data.map(props.rowIndexParser);
            console.log(newSolution);
            setSolutions([...solutions, newSolution]);
        }
    }, [props.query])

    return (
        <Stack gap={4}>
            {
                solutions.map(solution => (
                    <Stack direction='row' gap={1} flexWrap='wrap'>
                        {
                            solution.map(row => (
                                <Chip label={row} color='success' />
                            ))
                        }
                    </Stack>
                ))
            }
        </Stack>
    )
}