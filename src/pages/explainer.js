import { useEffect, useRef, useState } from 'react';

import { Box, Typography, IconButton, Button, Container, Grid, Card, CardHeader, Stack, ButtonGroup, CardContent } from '@mui/material';
import { SkipNext, FastForward, Done } from '@mui/icons-material';

import ConstraintMatrix from '../components/constraintMatrix';
import PartialSolution from '../components/partialSolution';
import CompleteSolution from '../components/completeSolution';
import Caption from '../components/caption';

export default function(props) {
    const timer = useRef();
    const [currentStep, setCurrentStep] = useState(0);

    const handleNext = () => setCurrentStep(prevStep => Math.min(prevStep + 1, props.explanation.steps.length-1));

    const handleFastForward = () => {
        timer.current = setInterval(handleNext, 100);
    }

    useEffect(() => {
        let currentCode = props.explanation.steps[currentStep].code;
        // if (currentCode == 'validPartialSolution' || currentCode == 'invalidPartialSolution' || currentCode == 'addedPartialSolution')
        if (currentCode == 'endSearch')
            clearInterval(timer.current);
    }, [currentStep]);

    return (
        <Stack p={2} gap={2} alignItems='center'>
            <Typography variant="h2">Demo</Typography>
            <Typography variant="h4" mb={2}>Solving the constraint matrix</Typography>

            {/* Constraint Matrix */}
            <Box mb={2} sx={{width: '100%'}}>
                <ConstraintMatrix 
                    matrix={props.explanation.sparseConstraintMatrix}
                    constraintLabels={props.explanation.constraintLabels}
                    rowLabels={props.explanation.rowLabels}
                    query={props.explanation.steps[currentStep]}
                />
            </Box>

            <Stack direction='row' gap={2} sx={{width: '75%'}}>
                {/* Control Panel */}
                <Card sx={{flex: '1 1 0'}}>
                    <CardHeader 
                        title={`Step: ${currentStep + 1}`} 
                        subheader={`Total steps: ${props.explanation.steps.length}`} 
                    />
                    <CardContent>
                        <Stack alignItems='center'>
                            <Caption query={props.explanation.steps[currentStep]} />
                            <ButtonGroup variant='contained'>
                                <IconButton onClick={handleNext}>
                                    <SkipNext />
                                </IconButton>
                                <IconButton onClick={handleFastForward}>
                                    <FastForward />
                                </IconButton>
                                <IconButton onClick={props.onFinish}>
                                    <Done />
                                </IconButton>
                            </ButtonGroup>
                        </Stack>
                    </CardContent>
                </Card>

                {/* Partial Solution Display */}
                <Card mb={2} sx={{flex: '1 1 0'}}>
                    <CardHeader title='Partial Solution' />
                    <CardContent>
                        <PartialSolution 
                            query={props.explanation.steps[currentStep]} 
                            rowIndexParser={i => props.explanation.rowLabels[i]}
                        />
                    </CardContent>
                </Card>

                {/* Complete Solution Display */}
                <Card sx={{flex: '1 1 0'}}>
                    <CardHeader title='All Solutions' />
                    <CardContent>
                        <CompleteSolution
                            query={props.explanation.steps[currentStep]} 
                            rowIndexParser={i => props.explanation.rowLabels[i]}
                        />
                    </CardContent>
                </Card>
            </Stack>
        </Stack>
    )
}