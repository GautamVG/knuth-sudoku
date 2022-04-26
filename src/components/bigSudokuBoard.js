import { Box } from "@mui/material";
import { useEffect, useState, useRef } from "react";

import RandomPuzzle from '../algo/Puzzles';
import collisionTester from './collisionTester';

export default function(props) {
    let solution = useRef([]);
    const [cells, setCells] = useState([]);

    useEffect(() => {
        // setCells(new Array(81).fill(''));
        if (props.showSolution == false) {
            let puzzle = RandomPuzzle();
            setCells(puzzle.board);
            solution.current = collisionTester[puzzle.index];
        }

    }, [props.showSolution]);

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
                    <Box sx={{
                        textAlign: 'center',
                        fontSize: '3rem',
                        border: '1px solid black'
                    }}>
                        {props.showSolution ? solution.current[i] : cell}
                    </Box>
                ))
            }
        </Box>
    </>
}