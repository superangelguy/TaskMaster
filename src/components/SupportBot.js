import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Paper,
  Fab,
  Slide,
  TextField,
  IconButton,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Snackbar,
  Alert,
  Button,
  Chip,
  CircularProgress,
} from '@mui/material';
import {
  HeadsetMic as SupportIcon,
  Close as CloseIcon,
  Send as SendIcon,
  SmartToy as BotIcon,
  Person as PersonIcon,
  SupportAgent as HumanSupportIcon,
  NotificationsActive as NotificationIcon,
  Help as HelpIcon,
  Assignment as TaskIcon,
  Payment as PaymentIcon,
  AccountCircle as AccountIcon,
} from '@mui/icons-material';

// Quick action buttons data
const quickActions = [
  { icon: <TaskIcon fontSize="small" />, label: 'Post Task', query: 'How do I post a task?' },
  { icon: <PaymentIcon fontSize="small" />, label: 'Payments', query: 'How do payments work?' },
  { icon: <AccountIcon fontSize="small" />, label: 'Account', query: 'How do I manage my account?' },
  { icon: <HelpIcon fontSize="small" />, label: 'Help', query: 'I need help' },
];

// Enhanced bot responses
const botResponses = {
  greeting: [
    "Hello! How can I help you today?",
    "Hi there! What can I assist you with?",
    "Welcome to TaskMaster! How may I help you?",
  ],
  task_posting: [
    "To post a task, follow these simple steps:\n1. Click 'Post a Task' in the navigation bar\n2. Fill in the task details and requirements\n3. Set your budget\n4. Choose a location\n5. Review and submit",
    "Creating a task is easy! Just click 'Post a Task' and provide clear details about what you need done. Make sure to include your budget and timeline.",
  ],
  payment: [
    "Here's how payments work:\n1. Your payment is securely held in escrow\n2. The tasker completes the work\n3. You review and approve the work\n4. Payment is released to the tasker\n\nWe accept credit/debit cards and PayPal.",
    "Your payment is secure and held in escrow until you're satisfied with the completed task. We support multiple payment methods for your convenience.",
  ],
  account: [
    "Managing your account is simple:\n1. Click your profile picture\n2. Select 'Edit Profile'\n3. Update your information\n4. Save changes\n\nYou can also manage your notifications and privacy settings here.",
    "To update your account, go to your profile page and click 'Edit Profile'. You can change your personal information, notification preferences, and security settings.",
  ],
  default: [
    "I'm not sure I understand. Would you like to:\n1. Speak with a human agent\n2. Browse our help center\n3. Try rephrasing your question",
    "That's a bit outside my expertise. Would you like me to connect you with a human support agent who can better assist you?",
  ],
  connect_to_human: "I'll connect you with a human support agent right away. Please wait a moment while I transfer you...",
  human_connected: "You're now connected with a human support agent. They will assist you shortly. Average response time is 2-3 minutes.",
};

// Helper function to get bot response
const getBotResponse = (message) => {
  const lowerMessage = message.toLowerCase();
  if (lowerMessage.includes('hi') || lowerMessage.includes('hello')) {
    return botResponses.greeting[Math.floor(Math.random() * botResponses.greeting.length)];
  } else if (lowerMessage.includes('post') || lowerMessage.includes('create task')) {
    return botResponses.task_posting[Math.floor(Math.random() * botResponses.task_posting.length)];
  } else if (lowerMessage.includes('pay') || lowerMessage.includes('payment')) {
    return botResponses.payment[Math.floor(Math.random() * botResponses.payment.length)];
  } else if (lowerMessage.includes('account') || lowerMessage.includes('profile')) {
    return botResponses.account[Math.floor(Math.random() * botResponses.account.length)];
  }
  return botResponses.default[Math.floor(Math.random() * botResponses.default.length)];
};

function SupportBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hello! I'm your TaskMaster assistant. How can I help you today?",
      sender: 'bot',
      time: new Date().toLocaleTimeString(),
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isConnectingToHuman, setIsConnectingToHuman] = useState(false);
  const [isHumanConnected, setIsHumanConnected] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const messagesEndRef = useRef(null);
  const audioRef = useRef(new Audio('https://www.myinstants.com/media/sounds/seatbelt-sign.mp3'));
  const [isTyping, setIsTyping] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Set initial volume
  useEffect(() => {
    audioRef.current.volume = 0.3; // Set volume to 30%
  }, []);

  // Initial notification effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        playNotificationSound();
        setShowNotification(true);
      }
    }, 3000); // Show notification after 3 seconds

    return () => clearTimeout(timer);
  }, []);

  const playNotificationSound = () => {
    try {
      audioRef.current.play().catch(error => {
        console.log('Audio playback failed:', error);
      });
    } catch (error) {
      console.log('Audio playback error:', error);
    }
  };

  const handleNotificationClose = () => {
    setShowNotification(false);
  };

  const handleOpenChat = () => {
    setIsOpen(true);
    setShowNotification(false);
  };

  const handleCloseChat = () => {
    setIsOpen(false);
    setIsConnectingToHuman(false);
    setIsHumanConnected(false);
  };

  const connectToHumanSupport = () => {
    setIsConnectingToHuman(true);
    setMessages(prev => [...prev, {
      text: botResponses.connect_to_human,
      sender: 'bot',
      time: new Date().toLocaleTimeString(),
    }]);

    // Simulate connection to human support after a delay
    setTimeout(() => {
      setIsHumanConnected(true);
      setMessages(prev => [...prev, {
        text: botResponses.human_connected,
        sender: 'bot',
        time: new Date().toLocaleTimeString(),
      }]);
    }, 2000);
  };

  const handleSend = () => {
    if (newMessage.trim()) {
      // Add user message
      setMessages(prev => [...prev, {
        text: newMessage,
        sender: 'user',
        time: new Date().toLocaleTimeString(),
      }]);

      // If already connecting to human or human is connected, don't send bot responses
      if (!isConnectingToHuman && !isHumanConnected) {
        setIsTyping(true);
        const botResponse = getBotResponse(newMessage);
        
        // Check if the response is about connecting to human support
        if (botResponse.toLowerCase().includes('human support agent')) {
          setTimeout(() => {
            setIsTyping(false);
            connectToHumanSupport();
          }, 1500);
        } else {
          // Normal bot response
          setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [...prev, {
              text: botResponse,
              sender: 'bot',
              time: new Date().toLocaleTimeString(),
            }]);
          }, 1500);
        }
      }

      setNewMessage('');
    }
  };

  const handleQuickAction = (query) => {
    setNewMessage(query);
    handleSend();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 1000,
        }}
      >
        {/* Support Bot Chat Window */}
        <Slide direction="up" in={isOpen} mountOnEnter unmountOnExit>
          <Paper
            elevation={3}
            sx={{
              width: 360,
              height: 480,
              mb: 2,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              borderRadius: 2,
              position: 'absolute',
              bottom: '100%',
              right: 0,
            }}
          >
            {/* Chat Header */}
            <Box
              sx={{
                p: 2,
                bgcolor: 'primary.main',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <SupportIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Support Assistant</Typography>
              </Box>
              <IconButton
                size="small"
                onClick={handleCloseChat}
                sx={{ color: 'white' }}
              >
                <CloseIcon />
              </IconButton>
            </Box>

            {/* Quick Action Buttons */}
            <Box sx={{ p: 1, borderBottom: 1, borderColor: 'divider' }}>
              <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto', pb: 1 }}>
                {quickActions.map((action, index) => (
                  <Chip
                    key={index}
                    icon={action.icon}
                    label={action.label}
                    onClick={() => handleQuickAction(action.query)}
                    sx={{
                      '&:hover': {
                        bgcolor: 'primary.light',
                        color: 'white',
                      },
                    }}
                  />
                ))}
              </Box>
            </Box>

            {/* Messages Area */}
            <Box
              sx={{
                flex: 1,
                overflow: 'auto',
                p: 2,
              }}
            >
              <List>
                {messages.map((message, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      flexDirection: message.sender === 'user' ? 'row-reverse' : 'row',
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar 
                        sx={{ 
                          bgcolor: message.sender === 'user' 
                            ? 'primary.main' 
                            : (isHumanConnected ? 'secondary.main' : 'info.main')
                        }}
                      >
                        {message.sender === 'user' ? <PersonIcon /> : 
                          (isHumanConnected ? <HumanSupportIcon /> : <BotIcon />)}
                      </Avatar>
                    </ListItemAvatar>
                    <Paper
                      sx={{
                        p: 1.25,
                        bgcolor: message.sender === 'user' ? 'primary.light' : 'background.paper',
                        maxWidth: '80%',
                        borderRadius: 2,
                        boxShadow: 1,
                      }}
                    >
                      <ListItemText
                        primary={message.text}
                        secondary={message.time}
                        sx={{
                          '& .MuiListItemText-primary': {
                            color: message.sender === 'user' ? 'primary.contrastText' : 'text.primary',
                            whiteSpace: 'pre-line',
                            fontSize: '0.9rem',
                            lineHeight: 1.4,
                          },
                          '& .MuiListItemText-secondary': {
                            color: message.sender === 'user' ? 'primary.contrastText' : 'text.secondary',
                            fontSize: '0.75rem',
                            mt: 0.5,
                          },
                          margin: 0,
                        }}
                      />
                    </Paper>
                  </ListItem>
                ))}
                {isTyping && (
                  <ListItem sx={{ gap: 1 }}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'info.main' }}>
                        <BotIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <Paper
                      sx={{
                        p: 2,
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        boxShadow: 1,
                      }}
                    >
                      <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                        <CircularProgress size={10} />
                        <CircularProgress size={10} sx={{ animationDelay: '0.2s' }} />
                        <CircularProgress size={10} sx={{ animationDelay: '0.4s' }} />
                      </Box>
                    </Paper>
                  </ListItem>
                )}
                <div ref={messagesEndRef} />
              </List>
            </Box>

            <Divider />

            {/* Input Area */}
            <Box sx={{ p: 2.5, bgcolor: 'background.paper' }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder={isHumanConnected ? "Type your message to support..." : "Type your message..."}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                size="medium"
                InputProps={{
                  endAdornment: (
                    <IconButton 
                      color="primary" 
                      onClick={handleSend}
                      sx={{
                        '&:hover': {
                          transform: 'scale(1.1)',
                          transition: 'transform 0.2s',
                        },
                      }}
                    >
                      <SendIcon />
                    </IconButton>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                  },
                }}
              />
            </Box>
          </Paper>
        </Slide>

        {/* Support Bot Button */}
        <Fab
          color="primary"
          onClick={isOpen ? handleCloseChat : handleOpenChat}
          sx={{
            position: 'relative',
            animation: isOpen ? 'none' : showNotification ? 'pulse 2s infinite' : 'none',
            '@keyframes pulse': {
              '0%': {
                boxShadow: '0 0 0 0 rgba(76, 175, 80, 0.4)',
              },
              '70%': {
                boxShadow: '0 0 0 15px rgba(76, 175, 80, 0)',
              },
              '100%': {
                boxShadow: '0 0 0 0 rgba(76, 175, 80, 0)',
              },
            },
          }}
        >
          {isOpen ? <CloseIcon /> : <SupportIcon />}
        </Fab>

        {/* Notification Snackbar */}
        <Snackbar
          open={showNotification && !isOpen}
          autoHideDuration={10000}
          onClose={handleNotificationClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          sx={{ mb: 7 }}
        >
          <Alert
            icon={<NotificationIcon />}
            severity="info"
            onClick={handleOpenChat}
            sx={{
              cursor: 'pointer',
              width: '100%',
              '&:hover': {
                bgcolor: 'primary.light',
                color: 'white',
              },
            }}
          >
            Need help? Click to chat with our support assistant!
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
}

export default SupportBot; 