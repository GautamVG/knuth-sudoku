import { useState, useRef } from "react";
import { Typography, Container, Button, Stack, Paper } from "@mui/material";
import { Link } from 'react-router-dom';

import SudokuBoard from '../components/bigSudokuBoard';

import SudokuEngine from '../algo/BigSudoku';

export default function() {
    let sudokuInput = useRef([]);
    let sudokuSolutions = useRef([]);
    let engine = useRef(new SudokuEngine());

    const [showSolution, setShowSolution] = useState(false);
    const [currentSolution, setCurrentSolution] = useState(0);

    const handleSudokuDataChange = (data) => {
        sudokuInput.current = [];
        data.forEach((val, i) => {
            if (val != '') {
                sudokuInput.current.push({
                    x: i % 9,
                    y: Math.floor(i/9),
                    val: val
                })
            }
        })
    }

    const handleSudokuFinish = (data) => {
        setShowSolution(true);
        if (data.length > 0) {
            data.forEach(d => sudokuSolutions.current.push(new Array(81)));
            data.forEach((d, i) => d.forEach(({x, y, val}) => sudokuSolutions.current[i][ x + 9*y ] = val));
        }
    }

    const solveSudoku = () => {
        let solutions = [];
        try {
            solutions = engine.solve(sudokuInput.current);
        } catch { }
        handleSudokuFinish(solutions);
    }

    return <>
        <Container max-width='lg' className="demo page">
            <Stack alignItems='center' gap={2}>
                <Typography variant="h2">Sudoku Solver</Typography>
                <Typography variant="h4" mb={1}>This section is a Sudoku Solver</Typography>

                <SudokuBoard 
                    showSolution={showSolution}
                    solution={sudokuSolutions.current}
                />

                {!showSolution && <Button variant="contained" size='large' sx={{mt: 4}} onClick={solveSudoku}>Solve</Button>}

                {showSolution &&
                    <Stack gap={2} alignItems='center'>
                        <Stack direction='row' gap={2}>
                            <Button 
                                variant='outlined'
                                sx={{mt: 4}}
                                onClick={() => {setShowSolution(false)}}
                            >New</Button>
                        </Stack>
                    </Stack>
                }

                <Link to='/'>
                    <Button>Home</Button>
                </Link>
            </Stack>
        </Container>
    </>
}