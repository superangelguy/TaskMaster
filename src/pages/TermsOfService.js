import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
} from '@mui/material';

function TermsOfService() {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Terms of Service
      </Typography>

      <Paper sx={{ p: 4 }} elevation={1}>
        <Typography variant="h5" gutterBottom>
          Last Updated: {new Date().toLocaleDateString()}
        </Typography>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            1. Acceptance of Terms
          </Typography>
          <Typography paragraph>
            By accessing or using TaskMaster, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
          </Typography>

          <Typography variant="h6" gutterBottom>
            2. User Responsibilities
          </Typography>
          <Typography paragraph>
            As a user of TaskMaster, you agree to:
            <ul>
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account</li>
              <li>Not use the service for any illegal purposes</li>
              <li>Comply with all local laws and regulations</li>
              <li>Not interfere with the proper working of the platform</li>
            </ul>
          </Typography>

          <Typography variant="h6" gutterBottom>
            3. Service Terms
          </Typography>
          <Typography paragraph>
            <ul>
              <li>TaskMaster acts as a platform connecting users with service providers</li>
              <li>We do not guarantee the quality or completion of any tasks</li>
              <li>Users are responsible for evaluating and selecting service providers</li>
              <li>Payment terms are as specified in task agreements</li>
            </ul>
          </Typography>

          <Typography variant="h6" gutterBottom>
            4. Intellectual Property
          </Typography>
          <Typography paragraph>
            All content, features, and functionality of TaskMaster are owned by us and are protected by international copyright, trademark, and other intellectual property laws.
          </Typography>

          <Typography variant="h6" gutterBottom>
            5. Limitation of Liability
          </Typography>
          <Typography paragraph>
            TaskMaster shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.
          </Typography>

          <Typography variant="h6" gutterBottom>
            6. Modifications
          </Typography>
          <Typography paragraph>
            We reserve the right to modify or replace these Terms of Service at any time. Users will be notified of any changes via email or platform notification.
          </Typography>

          <Typography variant="h6" gutterBottom>
            7. Contact Information
          </Typography>
          <Typography paragraph>
            For any questions regarding these Terms of Service, please contact us at legal@taskmaster.com
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default TermsOfService; 