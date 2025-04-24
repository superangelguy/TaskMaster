import React, { useState } from 'react';
import {
  Container,
  TextField,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  InputAdornment,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CategoryIcon from '@mui/icons-material/Category';
import TaskDetails from '../components/TaskDetails';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// Mock data for tasks
const mockTasks = [
  {
    id: 1,
    title: 'Help Moving Furniture',
    description: 'Need help moving furniture from one room to another. Heavy lifting required.',
    location: 'Downtown',
    price: 50,
    category: 'Moving',
    urgency: 'Urgent',
    postedTime: '2 hours ago',
    status: 'Open',
  },
  {
    id: 2,
    title: 'Garden Maintenance',
    description: 'Looking for someone to help with garden maintenance, including mowing, weeding, and pruning.',
    location: 'Suburbs',
    price: 75,
    category: 'Gardening',
    urgency: 'Flexible',
    postedTime: '5 hours ago',
    status: 'Open',
  },
  {
    id: 3,
    title: 'Computer Setup',
    description: 'Need help setting up a new computer and installing software. Knowledge of Windows required.',
    location: 'Tech District',
    price: 100,
    category: 'Tech Support',
    urgency: 'Today',
    postedTime: '1 hour ago',
    status: 'Open',
  },
  {
    id: 4,
    title: 'House Cleaning',
    description: 'Deep cleaning needed for a 3-bedroom house. All cleaning supplies will be provided.',
    location: 'Residential Area',
    price: 120,
    category: 'Cleaning',
    urgency: 'This Week',
    postedTime: '3 hours ago',
    status: 'Open',
  },
  {
    id: 5,
    title: 'Paint Living Room',
    description: 'Need help painting living room walls. Paint and supplies provided. Experience preferred.',
    location: 'North Side',
    price: 200,
    category: 'Painting',
    urgency: 'Next Week',
    postedTime: '6 hours ago',
    status: 'Open',
  },
  {
    id: 6,
    title: 'Fix Leaking Faucet',
    description: 'Kitchen faucet is leaking. Need a plumber or handyman to fix it.',
    location: 'East Side',
    price: 80,
    category: 'Plumbing',
    urgency: 'Urgent',
    postedTime: '30 minutes ago',
    status: 'Open',
  },
  {
    id: 7,
    title: 'Assemble IKEA Furniture',
    description: 'Need help assembling a bed frame and dresser from IKEA. Tools required.',
    location: 'West End',
    price: 90,
    category: 'Assembly',
    urgency: 'Tomorrow',
    postedTime: '4 hours ago',
    status: 'Open',
  },
  {
    id: 8,
    title: 'Move Boxes to Storage',
    description: 'Help needed moving boxes from apartment to storage unit. Vehicle required.',
    location: 'City Center',
    price: 150,
    category: 'Moving',
    urgency: 'This Week',
    postedTime: '1 day ago',
    status: 'Open',
  },
];

const categories = [
  'All Categories',
  'Moving',
  'Gardening',
  'Tech Support',
  'Cleaning',
  'Painting',
  'Plumbing',
  'Assembly',
];

const urgencyColors = {
  'Urgent': 'error',
  'Today': 'warning',
  'Tomorrow': 'info',
  'This Week': 'success',
  'Next Week': 'default',
  'Flexible': 'primary',
};

function BrowseTasks() {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedTask, setSelectedTask] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleViewDetails = (task) => {
    setSelectedTask(task);
    setIsDetailsOpen(true);
  };

  const handleContactTasker = (task) => {
    if (!isAuthenticated) {
      setSnackbar({
        open: true,
        message: 'Please log in to contact the tasker',
        severity: 'warning'
      });
      setTimeout(() => navigate('/login'), 2000);
      return;
    }
    
    setSnackbar({
      open: true,
      message: 'Message sent to the tasker!',
      severity: 'success'
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const filteredTasks = mockTasks
    .filter((task) => {
      const matchesSearch = 
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = 
        selectedCategory === 'All Categories' || task.category === selectedCategory;
      const matchesLocation =
        !location || task.location.toLowerCase().includes(location.toLowerCase());
      return matchesSearch && matchesCategory && matchesLocation;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return -1;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'price-low') return a.price - b.price;
      return 0;
    });

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Search tasks"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Location"
              variant="outlined"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOnIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Category</InputLabel>
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                label="Category"
                startAdornment={
                  <InputAdornment position="start">
                    <CategoryIcon />
                  </InputAdornment>
                }
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                label="Sort By"
              >
                <MenuItem value="newest">Newest First</MenuItem>
                <MenuItem value="price-high">Price: High to Low</MenuItem>
                <MenuItem value="price-low">Price: Low to High</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {filteredTasks.map((task) => (
          <Grid item xs={12} sm={6} md={4} key={task.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {task.title}
                  </Typography>
                  <Chip
                    label={task.urgency}
                    color={urgencyColors[task.urgency]}
                    size="small"
                  />
                </Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: 2,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {task.description}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LocationOnIcon fontSize="small" sx={{ mr: 1 }} />
                  <Typography variant="body2">{task.location}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <AttachMoneyIcon fontSize="small" sx={{ mr: 1 }} />
                  <Typography variant="body2">${task.price}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AccessTimeIcon fontSize="small" sx={{ mr: 1 }} />
                  <Typography variant="body2">{task.postedTime}</Typography>
                </Box>
              </CardContent>
              <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
                <Button
                  size="small"
                  onClick={() => handleViewDetails(task)}
                >
                  View Details
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => handleContactTasker(task)}
                >
                  Contact Tasker
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <TaskDetails
        task={selectedTask}
        open={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        onContactTasker={handleContactTasker}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default BrowseTasks; 