import { useEffect, useState } from "react";

import { Box } from "@mui/material";

export default function(props) {
    const [columnsVisibility, setColumnsVisibility] = useState(new Array(props.constraintLabels.length).fill(true));
    const [rowsVisibility, setRowsVisibility] = useState(new Array(props.rowLabels.length).fill(true));
    const [selectedColumn, setSelectedColumn] = useState(-1);
    const [selectedRow, setSelectedRow] = useState(-1);

    useEffect(() => {
        let newColumnsVisibilty = [...columnsVisibility];
        let newRowsVisibilty = [...rowsVisibility];

        switch(props.query.code) {
            case 'selectedColumn':
                setSelectedColumn(props.query.data);
                break;

            case 'selectedRow':
                setSelectedRow(props.query.data);
                break;

            case 'deletedColumn':
                newColumnsVisibilty[props.query.data] = false;
                setColumnsVisibility(newColumnsVisibilty);
                break;

            case 'deletedRow':
                newRowsVisibilty[props.query.data] = false;
                setRowsVisibility(newRowsVisibilty);
                break;

            case 'restoredColumn':
                newColumnsVisibilty[props.query.data] = true;
                setColumnsVisibility(newColumnsVisibilty);
                break;

            case 'restoredRow':
                newRowsVisibilty[props.query.data] = true;
                setRowsVisibility(newRowsVisibilty);
                break;

            default:
                break;
        }

    }, [props.query])

    const Cell = (props) => (
        <Box sx={{
            backgroundColor: (selectedColumn === props.x || selectedRow === props.y ? 'pink' : 'transparent'),
            opacity: (columnsVisibility[props.x] && rowsVisibility[props.y] ? 1 : 0.3)
        }}>{props.children}</Box>
    )

    return <Box sx={{
        display: 'grid',
        gridTemplate: `repeat(${props.rowLabels.length+1}, 1fr) / repeat(${props.constraintLabels.length+1}, 1fr)`,
        textAlign: 'center',
        gap: 1
    }}>

        <span>&emsp;</span>
        { props.constraintLabels.map(label => <span>{label}</span>) }
        { props.rowLabels.map((label, i) =>
            <>
                <span>{label}</span>
                {
                    new Array(props.constraintLabels.length).fill(0).map((dummy, j) => (
                        props.matrix[i].includes(j) ? 
                            <Cell x={j} y={i}>1</Cell> : 
                            <Cell x={j} y={i}>0</Cell> 
                    ))
                }
            </>
        ) }

    </Box>
}