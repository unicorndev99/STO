import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const HeroSection = () => {
  return (
    <Container className="fadeInUp">
      <Box sx={{maxWidth: "800px", py: 5, my: 5, mx: 'auto'}}>
        <Typography 
          variant="h5"
          color="primary.main" 
          sx={{ mb: 1, fontWeight: 'bold', textAlign: 'center' }}
        >
          About us
        </Typography>
        <Typography 
          color="text.primary" 
          variant="h4"
          sx={{ fontWeight: 'bold', mb: 3, textAlign: 'center' }} 
          component="div"
        >
          Encrypted Cash - ERC20 token with special features on Ethereum network
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 1, textAlign: 'center' }}>
        We are building a new ERC20 token $CASH on the Ethereum network. Join, invest, and touch our fascinating projects today.
        </Typography>
      </Box>
    </Container>
  );
}
 
export default HeroSection;
