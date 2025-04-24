import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import PaymentIcon from '@mui/icons-material/Payment';
import MessageIcon from '@mui/icons-material/Message';
import LocationOnIcon from '@mui/icons-material/LocationOn';

function SafetyGuidelines() {
  const guidelines = [
    {
      icon: <VerifiedUserIcon color="primary" />,
      title: "Verify Profiles",
      description: "Always check user profiles, reviews, and ratings before accepting or assigning tasks."
    },
    {
      icon: <PaymentIcon color="primary" />,
      title: "Secure Payments",
      description: "Only use our platform's secure payment system. Never exchange money outside the platform."
    },
    {
      icon: <MessageIcon color="primary" />,
      title: "Clear Communication",
      description: "Maintain clear communication through our platform's messaging system. Keep all task-related conversations documented."
    },
    {
      icon: <LocationOnIcon color="primary" />,
      title: "Safe Meeting Places",
      description: "For in-person tasks, meet in public places when possible. Share your location with trusted contacts."
    }
  ];

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Safety Guidelines
      </Typography>

      <Paper elevation={0} sx={{ p: 4, mb: 4, bgcolor: 'primary.light', color: 'primary.contrastText' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <SecurityIcon fontSize="large" />
          <Typography variant="h5">
            Your Safety is Our Priority
          </Typography>
        </Box>
        <Typography>
          Follow these essential guidelines to ensure a safe and secure experience while using our platform.
        </Typography>
      </Paper>

      <List>
        {guidelines.map((item, index) => (
          <Paper key={index} sx={{ mb: 2, p: 2 }}>
            <ListItem alignItems="flex-start">
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="h6" gutterBottom>
                    {item.title}
                  </Typography>
                }
                secondary={
                  <Typography variant="body1" color="text.secondary">
                    {item.description}
                  </Typography>
                }
              />
            </ListItem>
          </Paper>
        ))}
      </List>

      <Paper sx={{ p: 3, mt: 4, bgcolor: 'error.light', color: 'error.contrastText' }}>
        <Typography variant="h6" gutterBottom>
          Emergency Situations
        </Typography>
        <Typography>
          In case of emergency, immediately contact local authorities. Then report the incident to our support team for immediate assistance.
        </Typography>
      </Paper>
    </Container>
  );
}

export default SafetyGuidelines; 