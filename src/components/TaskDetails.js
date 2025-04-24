import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
  Chip,
  Divider,
  Grid,
  Avatar,
} from '@mui/material';
import {
  LocationOn as LocationOnIcon,
  AttachMoney as AttachMoneyIcon,
  AccessTime as AccessTimeIcon,
  Category as CategoryIcon,
  Person as PersonIcon,
} from '@mui/icons-material';

const TaskDetails = ({ task, open, onClose, onContactTasker }) => {
  if (!task) return null;

  const urgencyColors = {
    'Urgent': 'error',
    'Today': 'warning',
    'Tomorrow': 'info',
    'This Week': 'success',
    'Next Week': 'default',
    'Flexible': 'primary',
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      scroll="paper"
      PaperProps={{
        sx: { borderRadius: 1 }
      }}
    >
      <DialogTitle sx={{ py: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" component="div" sx={{ fontWeight: 500 }}>
            {task.title}
          </Typography>
          <Chip
            label={task.urgency}
            color={urgencyColors[task.urgency]}
            size="small"
            sx={{ ml: 1, '& .MuiChip-label': { px: 1 } }}
          />
        </Box>
      </DialogTitle>
      <DialogContent dividers sx={{ py: 1.5 }}>
        <Grid container spacing={1.5}>
          <Grid item xs={12}>
            <Typography variant="body2" sx={{ mb: 1.5, color: 'text.secondary' }}>
              {task.description}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LocationOnIcon sx={{ fontSize: 18, mr: 0.5, color: 'action.active' }} />
                <Typography variant="body2" color="text.secondary">
                  {task.location}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AttachMoneyIcon sx={{ fontSize: 18, mr: 0.5, color: 'action.active' }} />
                <Typography variant="body2" color="text.secondary">
                  ${task.price}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CategoryIcon sx={{ fontSize: 18, mr: 0.5, color: 'action.active' }} />
                <Typography variant="body2" color="text.secondary">
                  {task.category}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccessTimeIcon sx={{ fontSize: 18, mr: 0.5, color: 'action.active' }} />
                <Typography variant="body2" color="text.secondary">
                  {task.postedTime}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 1 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <Avatar sx={{ width: 28, height: 28, mr: 1, bgcolor: 'primary.main' }}>
                <PersonIcon sx={{ fontSize: 16 }} />
              </Avatar>
              <Box>
                <Typography variant="body2">
                  Posted by John Doe
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Member since January 2024
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: 1, gap: 1 }}>
        <Button size="small" onClick={onClose}>
          Close
        </Button>
        <Button
          size="small"
          variant="contained"
          onClick={() => {
            onContactTasker(task);
            onClose();
          }}
        >
          Contact Tasker
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskDetails; 