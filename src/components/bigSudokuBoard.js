import { Box } from "@mui/material";
import { useEffect, useState } from "react";

import SudokuCell from './cell';

import RandomPuzzle from '../algo/Puzzles';

export default function(props) {

    const [cells, setCells] = useState([]);

    useEffect(() => {
        // setCells(new Array(81).fill(''));
        setCells(RandomPuzzle());

    }, []);

    const checkCellCollision = () => {
        return false;
    }

    return <>
        <Box sx={{
            width: '50%',
            display: 'grid',
            gridTemplate: 'repeat(9, 1fr) / repeat(9, 1fr)'
        }}>
            {
                cells.map((cell, i) => (
                    <Box>
                        <SudokuCell 
                            editable={props.editable}
                            value={props.showSolution ? props.solution[i] : cell}
                            onChange={val => {
                                console.log(val)
                                if ((Boolean(val) || val == '' || val === NaN) && !checkCellCollision(i, val)) {
                                    let newCells = [...cells];
                                    newCells[i] = val;
                                    setCells(newCells);
                                    props.onChange(newCells);
                                }
                            }} 
                        />
                    </Box>
                ))
            }
        </Box>
    </>
}