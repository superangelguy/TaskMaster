import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
} from '@mui/material';

function PrivacyPolicy() {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Privacy Policy
      </Typography>

      <Paper sx={{ p: 4 }} elevation={1}>
        <Typography variant="h5" gutterBottom>
          Last Updated: {new Date().toLocaleDateString()}
        </Typography>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            1. Information We Collect
          </Typography>
          <Typography paragraph>
            We collect information that you provide directly to us, including when you create an account, post a task, or communicate with other users. This may include:
            <ul>
              <li>Name and contact information</li>
              <li>Profile information and photos</li>
              <li>Payment information</li>
              <li>Communication history</li>
              <li>Task details and preferences</li>
            </ul>
          </Typography>

          <Typography variant="h6" gutterBottom>
            2. How We Use Your Information
          </Typography>
          <Typography paragraph>
            We use the information we collect to:
            <ul>
              <li>Provide and improve our services</li>
              <li>Match tasks with appropriate service providers</li>
              <li>Process payments</li>
              <li>Communicate with you about our services</li>
              <li>Ensure platform safety and security</li>
            </ul>
          </Typography>

          <Typography variant="h6" gutterBottom>
            3. Information Sharing
          </Typography>
          <Typography paragraph>
            We may share your information with:
            <ul>
              <li>Other users as necessary for task completion</li>
              <li>Service providers who assist our operations</li>
              <li>Law enforcement when required by law</li>
            </ul>
          </Typography>

          <Typography variant="h6" gutterBottom>
            4. Your Rights
          </Typography>
          <Typography paragraph>
            You have the right to:
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </Typography>

          <Typography variant="h6" gutterBottom>
            5. Data Security
          </Typography>
          <Typography paragraph>
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
          </Typography>

          <Typography variant="h6" gutterBottom>
            6. Contact Us
          </Typography>
          <Typography paragraph>
            If you have any questions about this Privacy Policy, please contact us at privacy@taskmaster.com
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default PrivacyPolicy; 