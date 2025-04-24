import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  FormGroup,
  FormControlLabel,
  Switch,
  Button,
  Divider,
  Alert,
  Snackbar,
} from '@mui/material';
import CookieIcon from '@mui/icons-material/Cookie';
import SaveIcon from '@mui/icons-material/Save';

function CookiePolicy() {
  const [cookiePreferences, setCookiePreferences] = useState({
    essential: true,
    functional: true,
    analytics: true,
    marketing: false,
  });
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  useEffect(() => {
    // Load saved preferences when component mounts
    const savedPreferences = localStorage.getItem('cookiePreferences');
    if (savedPreferences) {
      setCookiePreferences(JSON.parse(savedPreferences));
    }
  }, []);

  const handlePreferenceChange = (name) => (event) => {
    setCookiePreferences(prev => ({
      ...prev,
      [name]: event.target.checked,
    }));
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookieConsent', 'custom');
    localStorage.setItem('cookiePreferences', JSON.stringify(cookiePreferences));
    setShowSaveSuccess(true);
  };

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Cookie Policy
      </Typography>

      {/* Current Cookie Settings Section */}
      <Paper sx={{ p: 4, mb: 4 }} elevation={3}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <CookieIcon color="primary" fontSize="large" />
          <Typography variant="h5" component="h2">
            Manage Cookie Preferences
          </Typography>
        </Box>
        
        <Typography paragraph color="text.secondary">
          You can adjust your cookie preferences here at any time. Changes will take effect immediately after saving.
        </Typography>

        <FormGroup sx={{ mb: 3 }}>
          <FormControlLabel
            control={<Switch checked={cookiePreferences.essential} disabled />}
            label={
              <Box>
                <Typography variant="subtitle1">Essential Cookies</Typography>
                <Typography variant="body2" color="text.secondary">
                  Required for the website to work properly. These cannot be disabled.
                </Typography>
              </Box>
            }
          />
          <FormControlLabel
            control={
              <Switch
                checked={cookiePreferences.functional}
                onChange={handlePreferenceChange('functional')}
              />
            }
            label={
              <Box>
                <Typography variant="subtitle1">Functional Cookies</Typography>
                <Typography variant="body2" color="text.secondary">
                  Enable personalized features and remember your preferences.
                </Typography>
              </Box>
            }
          />
          <FormControlLabel
            control={
              <Switch
                checked={cookiePreferences.analytics}
                onChange={handlePreferenceChange('analytics')}
              />
            }
            label={
              <Box>
                <Typography variant="subtitle1">Analytics Cookies</Typography>
                <Typography variant="body2" color="text.secondary">
                  Help us understand how visitors use our site to improve our services.
                </Typography>
              </Box>
            }
          />
          <FormControlLabel
            control={
              <Switch
                checked={cookiePreferences.marketing}
                onChange={handlePreferenceChange('marketing')}
              />
            }
            label={
              <Box>
                <Typography variant="subtitle1">Marketing Cookies</Typography>
                <Typography variant="body2" color="text.secondary">
                  Used to deliver personalized advertisements and track their effectiveness.
                </Typography>
              </Box>
            }
          />
        </FormGroup>

        <Button
          variant="contained"
          color="primary"
          startIcon={<SaveIcon />}
          onClick={handleSavePreferences}
          sx={{ mb: 2 }}
        >
          Save Preferences
        </Button>
      </Paper>

      <Divider sx={{ my: 4 }} />

      {/* Cookie Policy Content */}
      <Paper sx={{ p: 4 }} elevation={1}>
        <Typography variant="h5" gutterBottom>
          About Our Cookie Policy
        </Typography>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            1. What Are Cookies
          </Typography>
          <Typography paragraph>
            Cookies are small text files that are stored on your computer or mobile device when you visit our website. They help us make your experience better by remembering your preferences and how you use our site.
          </Typography>

          <Typography variant="h6" gutterBottom>
            2. How We Use Cookies
          </Typography>
          <Typography paragraph>
            We use cookies for the following purposes:
            <ul>
              <li>Essential cookies: Required for basic site functionality</li>
              <li>Authentication cookies: Remember your login status</li>
              <li>Preference cookies: Remember your settings and preferences</li>
              <li>Analytics cookies: Help us understand how visitors use our site</li>
              <li>Marketing cookies: Deliver more relevant advertisements</li>
            </ul>
          </Typography>

          <Typography variant="h6" gutterBottom>
            3. Types of Cookies We Use
          </Typography>
          <Typography paragraph>
            <ul>
              <li><strong>Session Cookies:</strong> Temporary cookies that expire when you close your browser</li>
              <li><strong>Persistent Cookies:</strong> Remain on your device for a set period</li>
              <li><strong>First-party Cookies:</strong> Set by TaskMaster</li>
              <li><strong>Third-party Cookies:</strong> Set by our trusted partners</li>
            </ul>
          </Typography>

          <Typography variant="h6" gutterBottom>
            4. Third-Party Services
          </Typography>
          <Typography paragraph>
            We use various third-party services that may set cookies:
            <ul>
              <li>Google Analytics for site usage analysis</li>
              <li>Payment processors for secure transactions</li>
              <li>Social media integration features</li>
            </ul>
          </Typography>

          <Typography variant="h6" gutterBottom>
            5. Updates to This Policy
          </Typography>
          <Typography paragraph>
            We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.
          </Typography>

          <Typography variant="h6" gutterBottom>
            6. Contact Us
          </Typography>
          <Typography paragraph>
            If you have any questions about our Cookie Policy, please contact us at privacy@taskmaster.com
          </Typography>
        </Box>
      </Paper>

      <Snackbar
        open={showSaveSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSaveSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setShowSaveSuccess(false)} 
          severity="success"
          sx={{ width: '100%' }}
        >
          Your cookie preferences have been saved successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default CookiePolicy; 