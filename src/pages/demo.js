import { useState, useRef } from "react";
import { Typography, Container, Button, Stack, Paper } from "@mui/material";

import Explainer from './explainer';

import DemoSudoku from '../components/demoSudoku';

import DemoSudokuEngine from '../algo/DemoSudoku';

export default function() {
    let sudokuInput = useRef([]);
    let sudokuSolutions = useRef([]);
    let engine = useRef(new DemoSudokuEngine());
    let engineOutput = useRef();

    const [explaining, setExplaining] = useState(false);
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

    const handleSudokuFinish = () => {
        let data = engineOutput.current.solutions;
        if (data.length > 0) {
            data.forEach(d => sudokuSolutions.current.push(new Array(9)));
            data.forEach((d, i) => d.forEach(({x, y, val}) => sudokuSolutions.current[i][ x + 3*y ] = val));
            setShowSolution(true);
            setExplaining(false);
        }
    }

    const solveSudoku = () => {
        engineOutput.current = engine.current.solve(sudokuInput.current, true);
        setExplaining(true);
    }

    return <>
        {!explaining &&
            <Container max-width='lg' className="demo page">
                <Stack alignItems='center' gap={2}>
                    <Typography variant="h2">Demo</Typography>
                    <Typography variant="h4" mb={1}>This section is a demonstration on Knuth's Algorithm X</Typography>
                    <Typography variant='h6'>Only 3x3 Grid is used. Three numbers (0, 1 and 2) should be used. Numbers should not repeat in the same row or column</Typography>
                    <Typography variant='h6' mb={1}>Enter any combination of numbers you like and press start</Typography>

                    <DemoSudoku 
                        editable={!showSolution} 
                        onChange={handleSudokuDataChange}
                        showSolution={showSolution}
                        solution={sudokuSolutions.current[currentSolution]}
                    />

                    {!showSolution && <Button variant="contained" size='large' sx={{mt: 4}} onClick={solveSudoku}>Start</Button>}

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
        }
        {explaining && 
            <>
                <Explainer onFinish={handleSudokuFinish} explanation={engineOutput.current.explanation} />
            </>
        }
    </>
}