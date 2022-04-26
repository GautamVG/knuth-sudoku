import { useRef, useState } from 'react';

import { Typography, IconButton, Button, Container, Grid, Card, CardHeader, Stack, ButtonGroup, CardContent } from '@mui/material';
import { SkipNext, FastForward, Done } from '@mui/icons-material';

import ConstraintMatrix from '../components/constraintMatrix';
import PartialSolution from '../components/partialSolution';
import CompleteSolution from '../components/completeSolution';
import Caption from '../components/caption';

export default function(props) {
    const timer = useRef();
    const [currentStep, setCurrentStep] = useState(0);

    const handleNext = () => setCurrentStep(currentStep + 1);

    const checkAndSkipNext = () => {
        console.log(props.explanation.steps[currentStep].code)
        if (props.explanation.steps[currentStep].code == 'validPartialSolution') {
            clearTimeout(timer.current);
        } else {
            handleNext();
        }
    }

    const handleFastForward = () => {
        timer.current = setInterval(checkAndSkipNext, 200);
    }

    return <Container maxWidth='xl'>
        <Stack>
            <Typography variant="h2">Demo</Typography>
            <Typography variant="h4" mb={2}>Solving the constraint matrix</Typography>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Card>
                        <CardHeader title='Constraint Matrix (27 x 27)' />
                        <CardContent>
                            <ConstraintMatrix />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card mb={2}>
                        <CardHeader title='Partial Solution' />
                        <CardContent>
                            <PartialSolution />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader title='All Solutions' />
                        <CardContent>
                            <CompleteSolution />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={8}>
                    <Caption query={props.explanation.steps[currentStep]} />
                </Grid>
                <Grid item xs={4}>
                    <Card>
                        <CardHeader title={`Step: ${currentStep + 1}`} />
                        <CardContent>
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
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Stack>
    </Container>
}