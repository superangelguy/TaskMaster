import React, { useState, useRef } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Avatar,
  Grid,
  TextField,
  Button,
  Tab,
  Tabs,
  IconButton,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  CircularProgress,
} from '@mui/material';
import {
  Person as PersonIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  PhotoCamera as PhotoCameraIcon,
  DeleteForever as DeleteForeverIcon,
  ZoomIn as ZoomInIcon,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, updateUser, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState(user?.profilePicture || null);
  const fileInputRef = useRef(null);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    bio: user?.bio || '',
    location: user?.location || '',
    skills: user?.skills || '',
  });
  const [isUploading, setIsUploading] = useState(false);
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setProfileData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      bio: user?.bio || '',
      location: user?.location || '',
      skills: user?.skills || '',
    });
  };

  const handleSave = () => {
    // Validate required fields
    if (!profileData.name || !profileData.email) {
      setMessage({
        type: 'error',
        text: 'Name and email are required fields'
      });
      return;
    }

    // Update user data in context
    updateUser({
      ...user,
      ...profileData
    });

    setIsEditing(false);
    setMessage({
      type: 'success',
      text: 'Profile updated successfully'
    });

    // Clear message after 3 seconds
    setTimeout(() => {
      setMessage({ type: '', text: '' });
    }, 3000);
  };

  const handleDeleteAccount = () => {
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    // Here you would typically make an API call to delete the user's account
    logout(); // Log the user out
    setDeleteDialogOpen(false);
    setSnackbarOpen(true);
    setShowSuccessMessage(true);
    setTimeout(() => {
      navigate('/'); // Redirect to home page after a brief delay
    }, 1500);
  };

  const handleProfilePictureClick = () => {
    fileInputRef.current?.click();
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check file size (limit to 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setMessage({
          type: 'error',
          text: 'Image size is too large. Please choose an image under 10MB.'
        });
        return;
      }

      // Check file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        setMessage({
          type: 'error',
          text: 'Please upload a valid image file (JPEG, PNG, GIF, or WebP)'
        });
        return;
      }

      setIsUploading(true);
      const reader = new FileReader();
      
      reader.onloadend = () => {
        // Simulate network delay for better UX
        setTimeout(() => {
          const newProfilePicture = reader.result;
          setProfilePicture(newProfilePicture);
          
          // Update user data with new profile picture using updateUser
          updateUser({
            ...user,
            profilePicture: newProfilePicture
          });

          setMessage({
            type: 'success',
            text: '✨ Profile picture updated! Looking good!'
          });
          setIsUploading(false);

          // Clear success message after 3 seconds
          setTimeout(() => {
            setMessage({ type: '', text: '' });
          }, 3000);
        }, 800);
      };

      reader.onerror = () => {
        setIsUploading(false);
        setMessage({
          type: 'error',
          text: 'Failed to read the image file. Please try again.'
        });
      };

      reader.readAsDataURL(file);
    }
  };

  const handleAvatarClick = (event) => {
    if (profilePicture) {
      setPreviewDialogOpen(true);
    } else {
      handleProfilePictureClick();
    }
  };

  const TabPanel = ({ children, value, index }) => (
    <Box role="tabpanel" hidden={value !== index} sx={{ py: 3 }}>
      {value === index && children}
    </Box>
  );

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          {message.text && (
            <Alert 
              severity={message.type} 
              sx={{ 
                mb: 2,
                '& .MuiAlert-message': {
                  fontSize: '1rem'
                }
              }}
              onClose={() => setMessage({ type: '', text: '' })}
            >
              {message.text}
            </Alert>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Box sx={{ position: 'relative' }}>
              <Avatar
                src={profilePicture}
                sx={{
                  width: 130,
                  height: 130,
                  bgcolor: 'primary.main',
                  fontSize: '3.5rem',
                  cursor: 'pointer',
                  border: '4px solid #fff',
                  boxShadow: 3,
                  transition: 'all 0.3s ease-in-out',
                  filter: isUploading ? 'brightness(0.8)' : 'none',
                  '&:hover': {
                    opacity: 0.9,
                    transform: 'scale(1.05)',
                    boxShadow: 6,
                  },
                }}
                onClick={handleAvatarClick}
              >
                {isUploading ? (
                  <Box sx={{ 
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'rgba(0, 0, 0, 0.3)',
                    borderRadius: '50%'
                  }}>
                    <CircularProgress size={40} color="inherit" />
                  </Box>
                ) : !profilePicture && (
                  profileData.name ? (
                    <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
                      {profileData.name[0].toUpperCase()}
                    </Typography>
                  ) : (
                    <PersonIcon sx={{ fontSize: '3.5rem' }} />
                  )
                )}
              </Avatar>
              <input
                type="file"
                ref={fileInputRef}
                accept=".jpg,.jpeg,.png,.gif,.webp"
                style={{ display: 'none' }}
                onChange={handleProfilePictureChange}
              />
              <IconButton
                sx={{
                  position: 'absolute',
                  bottom: -8,
                  right: -8,
                  bgcolor: 'background.paper',
                  boxShadow: 3,
                  border: '2px solid #fff',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    bgcolor: 'primary.light',
                    color: 'white',
                    transform: 'scale(1.1)',
                  },
                }}
                size="medium"
                onClick={handleProfilePictureClick}
                disabled={isUploading}
              >
                <PhotoCameraIcon />
              </IconButton>
              {profilePicture && (
                <IconButton
                  sx={{
                    position: 'absolute',
                    bottom: -8,
                    left: -8,
                    bgcolor: 'background.paper',
                    boxShadow: 3,
                    border: '2px solid #fff',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      bgcolor: 'primary.light',
                      color: 'white',
                      transform: 'scale(1.1)',
                    },
                  }}
                  size="medium"
                  onClick={() => setPreviewDialogOpen(true)}
                >
                  <ZoomInIcon />
                </IconButton>
              )}
            </Box>
            <Box sx={{ ml: 3 }}>
              <Typography variant="h4" gutterBottom>
                {profileData.name || 'User Profile'}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {profileData.email}
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  mt: 1,
                  color: 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  fontWeight: 500,
                }}
              >
                <PhotoCameraIcon fontSize="small" />
                {profilePicture ? 'Click to view or update photo' : 'Click to add a profile picture'}
              </Typography>
            </Box>
          </Box>

          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab label="Profile Information" />
            <Tab label="Tasks" />
            <Tab label="Settings" />
          </Tabs>

          <TabPanel value={activeTab} index={0}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                  {!isEditing ? (
                    <Button
                      startIcon={<EditIcon />}
                      onClick={handleEdit}
                      variant="outlined"
                    >
                      Edit Profile
                    </Button>
                  ) : (
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        startIcon={<CancelIcon />}
                        onClick={handleCancel}
                        variant="outlined"
                        color="error"
                      >
                        Cancel
                      </Button>
                      <Button
                        startIcon={<SaveIcon />}
                        onClick={handleSave}
                        variant="contained"
                      >
                        Save Changes
                      </Button>
                    </Box>
                  )}
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={profileData.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  required
                  type="email"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Location"
                  name="location"
                  value={profileData.location}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Skills"
                  name="skills"
                  value={profileData.skills}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="e.g. Plumbing, Electrical, Carpentry"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Bio"
                  name="bio"
                  value={profileData.bio}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  multiline
                  rows={4}
                  placeholder="Tell us about yourself..."
                />
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={activeTab} index={1}>
            <Typography variant="h6" gutterBottom>
              My Tasks
            </Typography>
            <Typography color="textSecondary">
              No tasks available yet.
            </Typography>
          </TabPanel>

          <TabPanel value={activeTab} index={2}>
            <Typography variant="h6" gutterBottom>
              Account Settings
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Typography variant="body1" color="error" paragraph>
                Danger Zone
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Once you delete your account, there is no going back. Please be certain.
              </Typography>
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteForeverIcon />}
                onClick={handleDeleteAccount}
              >
                Delete Account
              </Button>
            </Box>
          </TabPanel>

          {/* Delete Account Confirmation Dialog */}
          <Dialog
            open={deleteDialogOpen}
            onClose={() => setDeleteDialogOpen(false)}
            maxWidth="xs"
            fullWidth
          >
            <DialogTitle sx={{ pb: 1 }}>
              Delete Account
            </DialogTitle>
            <DialogContent>
              <Typography variant="body1" paragraph>
                Are you sure you want to delete your account? This action cannot be undone.
              </Typography>
              <Typography variant="body2" color="error">
                All your data will be permanently deleted.
              </Typography>
            </DialogContent>
            <DialogActions sx={{ p: 2, pt: 1 }}>
              <Button
                onClick={() => setDeleteDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={handleConfirmDelete}
              >
                Delete Account
              </Button>
            </DialogActions>
          </Dialog>

          {/* Success Snackbar */}
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={2000}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert 
              severity="success" 
              variant="filled"
              sx={{ width: '100%' }}
            >
              Successfully deleted account
            </Alert>
          </Snackbar>

          {/* Image Preview Dialog */}
          <Dialog
            open={previewDialogOpen}
            onClose={() => setPreviewDialogOpen(false)}
            maxWidth="md"
            PaperProps={{
              sx: {
                borderRadius: 2,
                overflow: 'hidden',
              }
            }}
          >
            <DialogTitle sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              bgcolor: 'primary.main',
              color: 'white'
            }}>
              Profile Picture
              <IconButton
                onClick={() => setPreviewDialogOpen(false)}
                sx={{ color: 'white' }}
              >
                <CancelIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent sx={{ p: 0 }}>
              <Box
                component="img"
                src={profilePicture}
                alt="Profile Picture"
                sx={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '70vh',
                  objectFit: 'contain',
                }}
              />
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <Button
                startIcon={<PhotoCameraIcon />}
                onClick={() => {
                  setPreviewDialogOpen(false);
                  handleProfilePictureClick();
                }}
              >
                Change Picture
              </Button>
            </DialogActions>
          </Dialog>

          <Snackbar
            open={showSuccessMessage}
            autoHideDuration={6000}
            onClose={() => setShowSuccessMessage(false)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert 
              onClose={() => setShowSuccessMessage(false)} 
              severity="success"
              sx={{ width: '100%' }}
            >
              Successfully deleted
            </Alert>
          </Snackbar>
        </Paper>
      </Box>
    </Container>
  );
};

export default Profile; 