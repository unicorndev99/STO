import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
//import LinkedInIcon from '@mui/icons-material/LinkedIn';

// Load members image from avatars
import ceo from '../../assets/images/team/ceo.png';

const members = [
  {
    name: "Brian",
    title: "CEO",
    avatar: ceo,
    linkedin: "",
    bio: "He is a CEO, co-founder of CASH, Encrypted Cash security token projects",
  },
  {
    name: "Helgge",
    title: "CTO & Lead Developer",
    avatar: ceo,
    linkedin: "",
    bio: "He is a CTO, lead developer of CASH project",
  },
  // {
  //   name: "Investor",
  //   title: "Investor",
  //   avatar: ceo,
  //   linkedin: "",
  //   bio: "Investor of this project",
  // },
]

const TeamSection = () => {
  return (
    <Box sx={{ py: 7, borderTop: 1, borderColor: "grey.100" }}>
      <Container>
        <Box sx={{maxWidth: '500px'}}>
          <Typography 
            variant="h5" 
            color="primary.main" 
            sx={{ mb: 1, fontWeight: 700 }}
          >
            Have you met the CASH Founders Team?
          </Typography>
          <Typography 
            color="text.primary" 
            variant="h4" 
            sx={{ fontWeight: 700, mb: 5 }} 
            component="div"
          >
            Meet the team
          </Typography>
        </Box>
        <Grid container spacing={4} justifyContent="center">
          {members.map((member, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                // badgeContent={
                //   <Avatar
                //     component="a"
                //     href={member.linkedin}
                //     target="_blank" 
                //     sx={{ bgcolor: '#fff', width: 30, height: 30, border: '2px solid #fff' }}
                //   >
                //     <LinkedInIcon color='action' />
                //   </Avatar>
                // }
              >
                <Avatar sx={{width: 70, height: 70}} src={member.avatar} />
              </Badge>
              <Box sx={{mt: 1}}>
                <Typography
                  variant="body"
                  color="text.primary"
                  sx={{fontWeight: 700, fontSize: '0.875rem'}}
                >
                {member.name}
                </Typography>
                <Typography variant="caption" display="block" color="text.secondary" sx={{fontSize: '0.875rem', mb: 1, fontWeight: 500}}>
                  {member.title}
                </Typography>
                <Typography variant="caption" display="block" color="text.secondary" sx={{fontSize: '0.875rem'}}>
                  {member.bio}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
 
export default TeamSection;
