import React from 'react';
import { Stack, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import Wiki from '../components/wiki';

function Home() {
  const navigate = useNavigate();

  return (
    <Stack gap={2} sx={{p: 5}}>
        <Stack direction='row' gap={2}>
            <Button variant='outlined' onClick={() => {navigate('/demo')}}>Simulation</Button>
            <Button variant='outlined' onClick={() => {navigate('/sudoku')}}>Sudoku Solver</Button>
        </Stack>
        <Wiki/>
    </Stack>
  )
}

export default Home