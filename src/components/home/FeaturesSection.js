import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import cubes from '../../assets/images/cubes.svg';

// Need to change later features of CASH projects
const features = [
  {
    title: "What is CASH token ?",
    description: "CASH is one of the ERC20 and contains several speical features to prevent scams, blacklist management, suspendable token transfer, token refund feature and so on.",
  },
  {
    title: "Our Pre-sale",
    description: "We will sell 20% of the total supply during the pre-sale period and offer staking and other fantastic reward systems after that.",
  },

]

const FeaturesSection = () => {
  return (
    <Box sx={{bgcolor: 'neutral.main', py: 7, borderTop: 1, borderColor: "grey.100" }}>
      <Container>
        <Box sx={{maxWidth: '500px'}}>
          <Typography 
            variant="body1" 
            color="primary.main" 
            sx={{ mb: 1, fontWeight: 700 }}
          >
            Our main features
          </Typography>
          <Typography
            color="text.primary"
            variant="h4" 
            sx={{ fontWeight: 700, mb: 5 }} 
            component="div"
          >
            CASH token offering
          </Typography>
        </Box>
        <Grid container spacing={4} justifyContent="center">
          {features.map((f, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Stack direction="row" spacing={2}>
                <Box sx={{minWidth: 36}}>
                  <img
                    src={cubes}
                    width="36"
                    height="36"
                    alt="cubes"
                  />
                </Box>
                <Box>
                  <Typography
                    variant="body" 
                    component="div"
                    color="text.primary"
                    sx={{fontWeight: 700, fontSize: '0.875rem'}}
                  >
                  {f.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{fontSize: '0.875rem'}}>
                    {f.description}
                  </Typography>
                </Box>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
 
export default FeaturesSection;
