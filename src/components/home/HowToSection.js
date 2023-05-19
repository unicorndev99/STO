import { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import Grid from '@mui/material/Grid';
import StepContent from '@mui/material/StepContent';
import StepButton from '@mui/material/StepButton';
import Link from '@mui/material/Link';

const step2Description = (
  <span>
    $CASH token is available on the Ethereum network. MetaMask is a  wallet, and the very best! On Google Chrome, visit <Link href="https://metamask.io" underline="none" target="_blank" rel="noreferrer">metamask.io</Link> to download the extension and set up a wallet. On mobile? Get MetaMask&apos;s app for iPhone or Android
  </span>
)

const steps = [
  {
    label: 'Choose your network',
    description: '$CASH is available on ETH, Ethereum networks. Choose your network from here Ethereum “DROP DOWN MENU” “Same as in toolbar” to participate in $CASH pre-sale',
  },
  {
    label: 'Create a MetaMask Wallet',
    description: step2Description,
  },
  {
    label: 'Send $ETH to MetaMask',
    description: 'Acquire $ETH through MetaMask itself or transfer it to your MetaMask wallet address from another wallet (e.g. Coinbase or Binance).',
  },
  {
    label: 'Click On Pre-Sale',
    description: 'You can currently swap ETH to $CASH on Pre-Sale over CASH\'s official website! Pre-Sale supports only ETH.',
  },
  {
    label: 'Swap $ETH to $CASH',
    description: 'Click Connect Wallet Enter the amount of $ETH you would like to swap for $CASH. Then click on Swap.',
  },
  {
    label: 'Claim $CASH',
    description: 'All $CASH purchased can be claimed at the Pre-sale page after the end of the vesting period.',
  },
];

const HowToSection = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box
      id="getCASH"  
      sx={{py: 7, borderTop: 1, borderBottom: 1, borderColor: "grey.100" }}
    >
      <Container>
        <Typography 
          variant="body1" 
          color="primary.main" 
          sx={{ mb: 1, fontWeight: 700, textAlign: 'center' }}
        > 
          Let's Get started
        </Typography>
        <Typography 
          variant="h4" 
          component="div" 
          color="text.primary"
          sx={{ fontWeight: 'bold', pb: 6, textAlign: 'center' }}
        >
          How to get $CASH
        </Typography>
        <Grid container spacing={0} justifyContent="center">
          <Grid item xs={12} md={6}>
            <Stepper activeStep={activeStep} orientation="vertical" nonLinear variant="dots">
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepButton color="inherit" onClick={handleStep(index)}>
                    <Typography 
                      variant="h6"
                      component="div"
                    >
                      {step.label}
                    </Typography>
                  </StepButton>
                  <StepContent>
                    <Typography>{step.description}</Typography>
                    <Box sx={{ mb: 2 }}>
                      <div>
                        <Button
                          disableElevation
                          onClick={index === steps.length - 1 ? handleReset : handleNext}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          {index === steps.length - 1 ? 'Again' : 'Got It'}
                        </Button>
                        <Button
                          color="inherit"
                          disabled={index === 0}
                          onClick={handleBack}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          previous step
                        </Button>
                      </div>
                    </Box>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
 
export default HowToSection;