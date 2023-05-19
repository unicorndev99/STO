import { Link } from "react-router-dom"
import Stack from '@mui/material/Stack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import stoJpeg from "../../assets/images/sto.jpeg";
import whitepaper from "../../assets/pdf/whitepaper.pdf"

//import ReactPlayer from 'react-player'

const HeroSection = () => {
  return (
    <Container className="fadeInUp">
      <Stack 
        direction="row"
        spacing={3}
        alignItems="center"
        justifyContent="space-between"
      >
        <Box sx={{maxWidth: "700px", py: 5, mb: 5, mx: 'auto'}}>
          <Typography 
            color="primary.main" 
            variant="h2" 
            sx={{ fontWeight: 'bold', mb: 3}} 
            component="div"
          >
            Encrypted Cash
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          CASH, an encrypted cash, is one of the ERC20 tokens on the Ethereum network and has special features, suspendable token transfer, blacklist address management, token refund function, and more. Our community will grow very quickly and will surely go to the moon with strong supporters and investors.
          These features deter attackers from fraud and make our tokens more secure.
          </Typography>
          {/* <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            ...
          </Typography> */}
          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ mb: 2, fontWeight: 700 }}
          >
            Let's get more and more $CASH token.
            </Typography>
          <Stack
            direction="row"
            spacing={2}
          >
            <Button
              component={Link}
              to="/pre-sale"
              disableElevation 
              variant="contained" 
              endIcon={<ArrowForwardIcon />}>
              Get CASH
            </Button>
            {/* <Button 
              component="a"
              href={whitepaper} // cash whitepaper url
              target="_blank" 
              rel="noopener noreferrer"
              endIcon={<ArrowDownwardIcon />}>
              CASH Whitepaper
            </Button> */}
          </Stack>
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <img 
            src={stoJpeg}
            alt="CASH Logo Alt" 
            width="450"
          />
        </Box>
      </Stack>
    </Container>
  );
}
 
export default HeroSection;
