import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Stack,
  Divider,
} from '@mui/material';
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  YouTube as YouTubeIcon,
} from '@mui/icons-material';

const socialMedia = [
  { icon: <FacebookIcon />, name: 'Facebook', url: 'https://facebook.com/taskmaster' },
  { icon: <TwitterIcon />, name: 'Twitter', url: 'https://twitter.com/taskmaster' },
  { icon: <InstagramIcon />, name: 'Instagram', url: 'https://instagram.com/taskmaster' },
  { icon: <LinkedInIcon />, name: 'LinkedIn', url: 'https://linkedin.com/company/taskmaster' },
  { icon: <YouTubeIcon />, name: 'YouTube', url: 'https://youtube.com/taskmaster' },
];

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        py: 12,
        px: 4,
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="xl">
        <Grid 
          container 
          spacing={12}
          sx={{ mb: 8 }}
        >
          <Grid item xs={12} md={3}>
            <Typography
              variant="h5"
              color="primary"
              gutterBottom
              sx={{ 
                fontWeight: 600,
                fontSize: '2rem',
                mb: 3
              }}
            >
              TaskMaster
            </Typography>
            <Typography 
              variant="body1" 
              color="text.secondary" 
              paragraph
              sx={{ 
                fontSize: '1.25rem',
                mb: 4,
                lineHeight: 1.6,
                maxWidth: '380px'
              }}
            >
              Get help with tasks, big and small. Connect with skilled professionals in your area.
            </Typography>
          </Grid>

          <Grid item xs={12} md={2.5}>
            <Typography 
              variant="h6" 
              gutterBottom 
              sx={{ 
                fontSize: '1.5rem', 
                mb: 4, 
                fontWeight: 600,
                color: 'text.primary' 
              }}
            >
              Quick Links
            </Typography>
            <Stack spacing={3}>
              {[
                { text: 'Browse Tasks', path: '/browse-tasks' },
                { text: 'Post a Task', path: '/post-task' },
                { text: 'Profile', path: '/profile' }
              ].map((item) => (
                <Link
                  key={item.text}
                  component={RouterLink}
                  to={item.path}
                  sx={{
                    fontSize: '1.25rem',
                    color: 'text.secondary',
                    textDecoration: 'none',
                    '&:hover': {
                      color: 'primary.main',
                      textDecoration: 'underline',
                    },
                  }}
                >
                  {item.text}
                </Link>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} md={2.5}>
            <Typography 
              variant="h6" 
              gutterBottom 
              sx={{ 
                fontSize: '1.5rem', 
                mb: 4, 
                fontWeight: 600,
                color: 'text.primary'
              }}
            >
              Support
            </Typography>
            <Stack spacing={3}>
              {[
                { text: 'Help Center', path: '/help-center' },
                { text: 'Safety Guidelines', path: '/safety' },
                { text: 'Contact Us', path: '/contact' }
              ].map((item) => (
                <Link
                  key={item.text}
                  component={RouterLink}
                  to={item.path}
                  sx={{
                    fontSize: '1.25rem',
                    color: 'text.secondary',
                    textDecoration: 'none',
                    '&:hover': {
                      color: 'primary.main',
                      textDecoration: 'underline',
                    },
                  }}
                >
                  {item.text}
                </Link>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography 
              variant="h6" 
              gutterBottom 
              sx={{ 
                fontSize: '1.5rem', 
                mb: 4, 
                fontWeight: 600,
                color: 'text.primary'
              }}
            >
              Download Our App
            </Typography>
            <Stack direction="row" spacing={4}>
              <Link
                component="a"
                href="https://apps.apple.com/taskmaster"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  '&:hover': {
                    opacity: 0.8,
                  }
                }}
              >
                <img
                  src="/app-store-badge.png"
                  alt="Download on the App Store"
                  style={{ height: 48 }}
                />
              </Link>
              <Link
                component="a"
                href="https://play.google.com/store/apps/taskmaster"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  '&:hover': {
                    opacity: 0.8,
                  }
                }}
              >
                <img
                  src="/google-play-badge.png"
                  alt="Get it on Google Play"
                  style={{ height: 48 }}
                />
              </Link>
            </Stack>
          </Grid>
        </Grid>

        <Stack 
          direction="row" 
          spacing={4}
          sx={{ mb: 8 }}
        >
          {socialMedia.map((social) => (
            <IconButton
              key={social.name}
              component="a"
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: 'text.secondary',
                p: 0,
                '& .MuiSvgIcon-root': {
                  fontSize: '32px',
                },
                '&:hover': {
                  color: 'primary.main',
                  background: 'transparent',
                },
              }}
              aria-label={social.name}
            >
              {social.icon}
            </IconButton>
          ))}
        </Stack>

        <Divider sx={{ mb: 4 }} />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Typography 
            color="text.secondary"
            sx={{ 
              fontSize: '1.1rem',
            }}
          >
            © {new Date().getFullYear()} TaskMaster. All rights reserved.
          </Typography>
          <Stack 
            direction="row" 
            spacing={6}
            sx={{
              '& a': {
                color: 'text.secondary',
                fontSize: '1.1rem',
                textDecoration: 'none',
                '&:hover': {
                  color: 'primary.main',
                  textDecoration: 'underline',
                }
              }
            }}
          >
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((text) => (
              <Link
                key={text}
                component={RouterLink}
                to={`/${text.toLowerCase().replace(' ', '-')}`}
              >
                {text}
              </Link>
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer; 