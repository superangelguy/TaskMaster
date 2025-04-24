import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Switch,
  Paper,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import CookieIcon from '@mui/icons-material/Cookie';

function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [cookiePreferences, setCookiePreferences] = useState({
    essential: true,
    functional: true,
    analytics: true,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already made a cookie choice
    const cookieChoice = localStorage.getItem('cookieConsent');
    if (!cookieChoice) {
      // Show the consent dialog immediately if no choice has been made
      setOpen(true);
    }
  }, []); // Empty dependency array means this runs once when component mounts

  const handleAcceptAll = () => {
    localStorage.setItem('cookieConsent', 'all');
    localStorage.setItem('cookiePreferences', JSON.stringify({
      essential: true,
      functional: true,
      analytics: true,
      marketing: true,
    }));
    setOpen(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'essential');
    localStorage.setItem('cookiePreferences', JSON.stringify({
      essential: true,
      functional: false,
      analytics: false,
      marketing: false,
    }));
    setOpen(false);
  };

  const handleCustomize = () => {
    setPreferencesOpen(true);
  };

  const handleClosePreferences = () => {
    setPreferencesOpen(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookieConsent', 'custom');
    localStorage.setItem('cookiePreferences', JSON.stringify(cookiePreferences));
    setPreferencesOpen(false);
    setOpen(false);
  };

  const handlePreferenceChange = (name) => (event) => {
    setCookiePreferences({
      ...cookiePreferences,
      [name]: event.target.checked,
    });
  };

  return (
    <>
      {/* Main Cookie Consent Dialog */}
      <Dialog
        open={open}
        maxWidth="sm"
        fullWidth
        disableEscapeKeyDown
        disableBackdropClick
        aria-labelledby="cookie-consent-dialog"
      >
        <DialogTitle id="cookie-consent-dialog" sx={{ pb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CookieIcon color="primary" />
            <Typography variant="h6">Cookie Settings</Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography paragraph>
            Welcome to TaskMaster! We use cookies to enhance your experience and analyze our traffic. Please choose your cookie preferences below.
          </Typography>
          <Typography paragraph color="text.secondary" variant="body2">
            Essential cookies are always enabled as they are required for the website to function properly.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center', mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAcceptAll}
              startIcon={<CookieIcon />}
            >
              Accept All Cookies
            </Button>
            <Button
              variant="outlined"
              onClick={handleCustomize}
            >
              Customize Settings
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={handleReject}
            >
              Reject Non-Essential
            </Button>
          </Box>
          <Box sx={{ mt: 3 }}>
            <Typography variant="body2" color="text.secondary" align="center">
              By clicking "Accept All Cookies", you agree to the storing of cookies on your device to enhance site navigation, analyze site usage, and assist in our marketing efforts. Read more in our{' '}
              <RouterLink to="/cookie-policy" onClick={() => setOpen(false)}>
                Cookie Policy
              </RouterLink>
              .
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Customize Preferences Dialog */}
      <Dialog
        open={preferencesOpen}
        onClose={handleClosePreferences}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CookieIcon color="primary" />
            <Typography variant="h6">Cookie Preferences</Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography paragraph>
            Customize your cookie preferences below. Essential cookies are required for basic site functionality and cannot be disabled.
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={<Switch checked={cookiePreferences.essential} disabled />}
              label={
                <Box>
                  <Typography variant="body1">Essential Cookies</Typography>
                  <Typography variant="body2" color="text.secondary">Required for the website to work properly</Typography>
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
                  <Typography variant="body1">Functional Cookies</Typography>
                  <Typography variant="body2" color="text.secondary">For enhanced functionality and personalization</Typography>
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
                  <Typography variant="body1">Analytics Cookies</Typography>
                  <Typography variant="body2" color="text.secondary">Help us understand how visitors use our site</Typography>
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
                  <Typography variant="body1">Marketing Cookies</Typography>
                  <Typography variant="body2" color="text.secondary">Used for targeted advertising</Typography>
                </Box>
              }
            />
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePreferences}>Cancel</Button>
          <Button onClick={handleSavePreferences} variant="contained" color="primary">
            Save Preferences
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CookieConsent; 