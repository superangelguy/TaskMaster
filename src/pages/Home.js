import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Box,
  useTheme,
  Avatar,
  Paper,
  useMediaQuery,
} from '@mui/material';
import HandymanIcon from '@mui/icons-material/Handyman';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import SearchIcon from '@mui/icons-material/Search';
import PostAddIcon from '@mui/icons-material/PostAdd';
import HandshakeIcon from '@mui/icons-material/Handshake';
import { styled } from '@mui/material/styles';
import AllServices from '../components/AllServices';

const HeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #4CAF50 0%, #388E3C 100%)',
  color: 'white',
  padding: theme.spacing(8, 0),
  marginBottom: theme.spacing(8),
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: 'url("https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: 0.1,
  },
}));

const ServiceCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[8],
  },
}));

const featuredTasks = [
  {
    title: 'Home Repairs',
    description: 'Need help with fixing things around the house? Our skilled professionals are ready to help.',
    icon: <HandymanIcon fontSize="large" />,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
  {
    title: 'Cleaning Services',
    description: 'Professional cleaning for your home or office. We bring the sparkle back to your space.',
    icon: <CleaningServicesIcon fontSize="large" />,
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
  {
    title: 'Delivery Services',
    description: 'Get items delivered quickly and safely. We handle your packages with care.',
    icon: <DeliveryDiningIcon fontSize="large" />,
    image: 'https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Homeowner",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80",
    text: "Found an amazing handyman through TaskMaster. Quick, professional, and excellent work!",
  },
  {
    name: "Michael Chen",
    role: "Business Owner",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80",
    text: "TaskMaster has been a game-changer for my business. Easy to find reliable help when needed.",
  },
  {
    name: "Emily Davis",
    role: "Professional Tasker",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80",
    text: "Great platform to connect with clients. The process is smooth and professional.",
  },
];

const howItWorks = [
  {
    icon: <PostAddIcon fontSize="large" />,
    title: "Post Your Task",
    description: "Describe what you need done, when you need it, and your budget.",
  },
  {
    icon: <SearchIcon fontSize="large" />,
    title: "Get Matched",
    description: "Receive offers from skilled professionals in your area.",
  },
  {
    icon: <HandshakeIcon fontSize="large" />,
    title: "Get It Done",
    description: "Choose the best offer and get your task completed.",
  },
];

function Home() {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box>
      <HeroSection>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <Typography
              component="h1"
              variant="h2"
              sx={{
                fontWeight: 700,
                mb: 2,
                textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
              }}
            >
              Find Help for Any Task
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: 4,
                maxWidth: '800px',
                margin: '0 auto',
                textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
              }}
            >
              Connect with skilled professionals who can help you get things done quickly and efficiently
            </Typography>
            <Box sx={{ mt: 4 }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/post-task')}
                sx={{
                  mr: 2,
                  bgcolor: 'white',
                  color: theme.palette.primary.main,
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.9)',
                  },
                }}
              >
                Post a Task
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/browse-tasks')}
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: 'rgba(255,255,255,0.1)',
                  },
                }}
              >
                Browse Tasks
              </Button>
            </Box>
          </Box>
        </Container>
      </HeroSection>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          align="center"
          sx={{ mb: 6, color: theme.palette.primary.dark }}
        >
          How It Works
        </Typography>
        <Grid container spacing={4}>
          {howItWorks.map((step, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  textAlign: 'center',
                  height: '100%',
                  backgroundColor: 'transparent',
                  position: 'relative',
                }}
              >
                <Box
                  sx={{
                    mb: 2,
                    color: theme.palette.primary.main,
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  {step.icon}
                </Box>
                <Typography variant="h5" gutterBottom>
                  {step.title}
                </Typography>
                <Typography color="text.secondary">
                  {step.description}
                </Typography>
                {index < howItWorks.length - 1 && (
                  <Box
                    sx={{
                      position: 'absolute',
                      right: -30,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      display: { xs: 'none', md: 'block' },
                    }}
                  >
                    →
                  </Box>
                )}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography
          variant="h3"
          align="center"
          sx={{ mb: 6, color: theme.palette.primary.dark }}
        >
          Popular Services
        </Typography>
        <Grid container spacing={4}>
          {featuredTasks.map((task, index) => (
            <Grid item key={index} xs={12} md={4}>
              <ServiceCard>
                <Box
                  sx={{
                    height: 200,
                    backgroundImage: `url(${task.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ color: theme.palette.primary.main, mb: 2 }}>
                    {task.icon}
                  </Box>
                  <Typography gutterBottom variant="h5" component="h2">
                    {task.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {task.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                  <Button
                    size="large"
                    color="primary"
                    variant="contained"
                    onClick={() => navigate('/browse-tasks')}
                  >
                    Find Help
                  </Button>
                </CardActions>
              </ServiceCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      <AllServices />

      <Box sx={{ bgcolor: 'background.default', py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            align="center"
            sx={{ mb: 6, color: theme.palette.primary.dark }}
          >
            What People Say
          </Typography>
          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    pt: 2,
                  }}
                >
                  <FormatQuoteIcon
                    sx={{
                      position: 'absolute',
                      top: 16,
                      left: 16,
                      color: theme.palette.primary.light,
                      opacity: 0.3,
                      fontSize: 40,
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1, pt: 4 }}>
                    <Typography variant="body1" paragraph sx={{ mb: 2 }}>
                      "{testimonial.text}"
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar
                        src={testimonial.image}
                        sx={{ width: 48, height: 48, mr: 2 }}
                      />
                      <Box>
                        <Typography variant="subtitle1">
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {testimonial.role}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Ready to Get Started?
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" paragraph>
          Join thousands of people who use TaskMaster to get things done.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate('/post-task')}
          sx={{ mr: 2 }}
        >
          Post a Task
        </Button>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          onClick={() => navigate('/browse-tasks')}
        >
          Browse Tasks
        </Button>
      </Container>
    </Box>
  );
}

export default Home; 