import { useState, useRef } from "react";
import { Typography, Container, Button, Stack } from "@mui/material";

import DemoSudoku from '../components/demoSudoku';
import Explainer from '../components/explainer';

import DemoSudokuEngine from '../algo/DemoSudoku';

const engine = new DemoSudokuEngine();

export default function() {
    let sudokuInput = useRef([]);
    const [page, setPage] = useState(0);
    // const [editable, setEditable] = useState(true);

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

    let currentPage;

    if (page == 0) {

        currentPage = (
            <Container max-width='lg' className="demo page">
                <Stack alignItems='center' gap={2}>
                    <Typography variant="h2">Demo</Typography>
                    <Typography variant="h4" mb={1}>This section is a demonstration on Knuth's Algorithm X</Typography>
                    <Typography variant='h6'>Only 3x3 Grid is used. Three numbers (0, 1 and 2) should be used. Numbers should not repeat in the same row or column</Typography>
                    <Typography variant='h6' mb={1}>Enter any combination of numbers you like and press start</Typography>
                    <DemoSudoku editable={true} onChange={handleSudokuDataChange} />
                    <Button variant="contained" size='large' sx={{mt: 4}} onClick={() => {
                        console.log(engine.solve(sudokuInput.current, true));
                    }}>Start</Button>
                </Stack>
            </Container>
        )

    } else if (page == 1) {

        currentPage = (
            <Explainer />
        );

    }

    return <> {currentPage} </>
}