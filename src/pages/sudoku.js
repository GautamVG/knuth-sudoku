import { useState, useRef } from "react";
import { Typography, Container, Button, Stack, Paper } from "@mui/material";

import DemoSudoku from '../components/demoSudoku';

import DemoSudokuEngine from '../algo/DemoSudoku';

export default function() {
    let sudokuInput = useRef([]);
    let sudokuSolutions = useRef([]);
    let engine = useRef(new DemoSudokuEngine());

    const [showSolution, setShowSolution] = useState(false);
    const [currentSolution, setCurrentSolution] = useState(0);

    const handleSudokuDataChange = (data) => {
        sudokuInput.current = [];
        data.forEach((val, i) => {
            if (val != '') {
                sudokuInput.current.push({
                    x: i % 3,
                    y: Math.floor(i/3),
                    val: val
                })
            }
        })
    }

    const handleSudokuFinish = (data) => {
        if (data.length > 0) {
            data.forEach(d => sudokuSolutions.current.push(new Array(9)));
            data.forEach((d, i) => d.forEach(({x, y, val}) => sudokuSolutions.current[i][ x + 3*y ] = val));
            setShowSolution(true);
        }
    }

    const solveSudoku = () => {
        let solutions = engine.current.solve(sudokuInput.current, false);
        handleSudokuFinish(solutions);
    }

    return <>
        <Container max-width='lg' className="demo page">
            <Stack alignItems='center' gap={2}>
                <Typography variant="h2">Sudoku Solver</Typography>
                <Typography variant="h4" mb={1}>This section is a Sudoku Solver</Typography>
                <Typography variant='h6' mb={1}>Standard rules apply. Enter any combination of numbers you like and press solve</Typography>

                <DemoSudoku 
                    editable={!showSolution} 
                    onChange={handleSudokuDataChange}
                    showSolution={showSolution}
                    solution={sudokuSolutions.current[currentSolution]}
                />

                {!showSolution && <Button variant="contained" size='large' sx={{mt: 4}} onClick={solveSudoku}>Solve</Button>}

                {showSolution &&
                    <Stack gap={2} alignItems='center'>
                        <Typography variant="body1">Number of solutions: {sudokuSolutions.current.length}</Typography>
                        <Stack direction='row' gap={2}>
                            <Button 
                                variant='outlined'
                                onClick={() => {setCurrentSolution(currentSolution + 1)}}
                                disabled={currentSolution === sudokuSolutions.current.length - 1}
                            >Next</Button>
                            <Button 
                                variant='outlined'
                                onClick={() => {setCurrentSolution(currentSolution - 1)}}
                                disabled={currentSolution === 0}
                            >Prev</Button>
                        </Stack>
                    </Stack>
                }
            </Stack>
        </Container>
    </>
}