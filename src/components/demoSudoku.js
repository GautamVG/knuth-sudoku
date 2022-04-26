import { Typography, Grid } from "@mui/material";
import { useEffect, useState } from "react";

import SudokuCell from './cell';

export default function(props) {

    const [cells, setCells] = useState([]);

    useEffect(() => {
        setCells(new Array(9).fill(''));
    }, []);

    const checkCellCollision = () => {
        return false;
    }

    return <>
        <Grid container sx={{width: '50%'}}>
            {
                cells.map((cell, i) => (
                    <Grid item xs={4}>
                        <SudokuCell 
                            editable={props.editable}
                            value={props.showSolution ? props.solution[i] : cell}
                            onChange={val => {
                                if ((Boolean(val) || val == '') && !checkCellCollision(i, val)) {
                                    let newCells = [...cells];
                                    newCells[i] = val;
                                    setCells(newCells);
                                    props.onChange(newCells);
                                }
                            }} 
                        />
                    </Grid>
                ))
            }
        </Grid>
    </>
}