import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  Stack,
  Chip,
  IconButton,
  Tooltip,
  LinearProgress,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Search as SearchIcon,
  Assignment as TaskIcon,
  Payment as PaymentIcon,
  Security as SecurityIcon,
  AccountCircle as ProfileIcon,
  Help as HelpIcon,
  LiveHelp as SupportIcon,
  LocalShipping as MovingIcon,
  CleaningServices as CleaningIcon,
  Build as AssemblyIcon,
  Computer as TechIcon,
  Brush as PaintingIcon,
  Grass as GardeningIcon,
  Plumbing as PlumbingIcon,
  ElectricBolt as ElectricalIcon,
  PlayCircleFilled as PlayCircleIcon,
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
  Groups as CommunityIcon,
  TipsAndUpdates as TipsIcon,
  Lightbulb as LightbulbIcon,
  Forum as ForumIcon,
} from '@mui/icons-material';

const commonQuestions = [
  {
    question: "How do I post a task?",
    answer: "Click the 'Post a Task' button in the navigation bar. Fill in your task details including description, budget, and location. Add any relevant photos or documents, then submit your task to receive offers from skilled professionals.",
    category: "Tasks"
  },
  {
    question: "How does payment work?",
    answer: "We use a secure payment system. Your payment is held safely in escrow until the task is completed. Once you confirm the task is done to your satisfaction, the payment is released to the tasker.",
    category: "Payments"
  },
  {
    question: "What if I'm not satisfied with the work?",
    answer: "If you're not satisfied, please discuss your concerns with the tasker first. If you can't reach a resolution, our support team can help mediate. We offer a satisfaction guarantee and will work to make things right.",
    category: "Tasks"
  },
  {
    question: "How are taskers verified?",
    answer: "All taskers go through a verification process that includes ID verification, skills assessment, and background checks where applicable. We also maintain a review system for quality assurance.",
    category: "Safety"
  },
  {
    question: "Can I cancel a task?",
    answer: "Yes, you can cancel a task before it's accepted by a tasker. If a tasker has already accepted, you should contact them first. Cancellation fees may apply depending on the circumstances.",
    category: "Tasks"
  },
  {
    question: "How do I become a tasker?",
    answer: "To become a tasker, click on 'Become a Tasker' in your profile menu. Complete your profile, verify your identity, list your skills, and set your availability. Our team will review your application within 48 hours.",
    category: "Account"
  },
  {
    question: "What payment methods are accepted?",
    answer: "We accept major credit/debit cards, PayPal, and bank transfers. All payments are processed securely through our platform to protect both taskers and clients.",
    category: "Payments"
  },
  {
    question: "How do I report an issue?",
    answer: "If you encounter any issues, click the 'Report' button on the task page or contact our support team. For urgent matters, use the emergency contact option in our Support section.",
    category: "Safety"
  },
  {
    question: "Can I get a refund?",
    answer: "Refund eligibility depends on various factors including task status and circumstances. Contact support with your request, and we'll review each case individually according to our refund policy.",
    category: "Payments"
  },
  {
    question: "How do I edit my profile?",
    answer: "Go to your profile page by clicking your avatar in the top right. Click 'Edit Profile' to update your information, including contact details, skills, and availability.",
    category: "Account"
  }
];

const helpCategories = [
  {
    title: "Tasks",
    icon: <TaskIcon fontSize="large" />,
    description: "Learn about posting tasks, accepting offers, and task completion",
    color: "#4CAF50",
    subcategories: ["Posting Tasks", "Finding Tasks", "Task Management", "Reviews"]
  },
  {
    title: "Payments",
    icon: <PaymentIcon fontSize="large" />,
    description: "Information about payments, refunds, and our secure payment system",
    color: "#2196F3",
    subcategories: ["Payment Methods", "Refunds", "Fees", "Disputes"]
  },
  {
    title: "Safety",
    icon: <SecurityIcon fontSize="large" />,
    description: "Safety guidelines and best practices for tasks",
    color: "#FF9800",
    subcategories: ["Guidelines", "Verification", "Insurance", "Reporting"]
  },
  {
    title: "Account",
    icon: <ProfileIcon fontSize="large" />,
    description: "Managing your profile, settings, and notifications",
    color: "#9C27B0",
    subcategories: ["Profile Settings", "Notifications", "Privacy", "Verification"]
  }
];

const popularServices = [
  { icon: <MovingIcon />, name: "Moving" },
  { icon: <CleaningIcon />, name: "Cleaning" },
  { icon: <AssemblyIcon />, name: "Assembly" },
  { icon: <TechIcon />, name: "Tech Help" },
  { icon: <PaintingIcon />, name: "Painting" },
  { icon: <GardeningIcon />, name: "Gardening" },
  { icon: <PlumbingIcon />, name: "Plumbing" },
  { icon: <ElectricalIcon />, name: "Electrical" }
];

const videoTutorials = [
  {
    title: "Getting Started with TaskMaster",
    duration: "3:45",
    thumbnail: "getting-started-thumb.jpg",
    views: "2.5K",
    description: "Learn the basics of using TaskMaster to post and find tasks."
  },
  {
    title: "How to Become a Successful Tasker",
    duration: "5:20",
    thumbnail: "successful-tasker-thumb.jpg",
    views: "1.8K",
    description: "Tips and strategies for maximizing your earnings as a tasker."
  },
  {
    title: "Payment System Explained",
    duration: "4:15",
    thumbnail: "payment-system-thumb.jpg",
    views: "3.1K",
    description: "Understanding TaskMaster's secure payment and escrow system."
  },
  {
    title: "Safety Guidelines & Best Practices",
    duration: "6:30",
    thumbnail: "safety-guidelines-thumb.jpg",
    views: "2.2K",
    description: "Essential safety tips for both taskers and clients."
  }
];

const quickTips = [
  {
    tip: "Add clear photos to your task posting for better responses",
    category: "Tasks",
    icon: <LightbulbIcon />
  },
  {
    tip: "Always verify tasker reviews and ratings before accepting offers",
    category: "Safety",
    icon: <SecurityIcon />
  },
  {
    tip: "Keep all communication within the TaskMaster platform",
    category: "Safety",
    icon: <ForumIcon />
  },
  {
    tip: "Set up instant notifications to never miss an update",
    category: "Account",
    icon: <TipsIcon />
  }
];

const communityResources = [
  {
    title: "Tasker Community Forum",
    description: "Connect with other taskers, share experiences, and get advice",
    members: "5.2K",
    topics: "1.2K"
  },
  {
    title: "Client Success Stories",
    description: "Read about successful task completions and happy clients",
    stories: "320",
    likes: "2.1K"
  },
  {
    title: "Monthly Webinars",
    description: "Join our educational sessions on various topics",
    upcoming: "3",
    registered: "180"
  }
];

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [helpfulRatings, setHelpfulRatings] = useState({});

  const filteredQuestions = commonQuestions.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleHelpfulRating = (questionId, isHelpful) => {
    setHelpfulRatings(prev => ({
      ...prev,
      [questionId]: isHelpful
    }));
  };

  return (
    <Box sx={{ py: 8, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h2"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: 'text.primary',
              mb: 2
            }}
          >
            How can we help you?
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'text.secondary',
              mb: 4,
              maxWidth: '600px',
              mx: 'auto'
            }}
          >
            Find answers to common questions and learn how to make the most of TaskMaster
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search for help articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              maxWidth: '600px',
              bgcolor: 'background.paper',
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Popular Services */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
            Popular Services
          </Typography>
          <Grid container spacing={2}>
            {popularServices.map((service, index) => (
              <Grid item xs={6} sm={3} md={1.5} key={index}>
                <Paper
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 3,
                    }
                  }}
                >
                  {service.icon}
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {service.name}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Quick Tips Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h5" gutterBottom sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
            <TipsIcon color="primary" />
            Quick Tips
          </Typography>
          <Grid container spacing={2}>
            {quickTips.map((tip, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper
                  sx={{
                    p: 2,
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    bgcolor: 'primary.light',
                    color: 'primary.contrastText',
                  }}
                >
                  {tip.icon}
                  <Box>
                    <Typography variant="body1">{tip.tip}</Typography>
                    <Chip
                      label={tip.category}
                      size="small"
                      sx={{ mt: 1, bgcolor: 'rgba(255,255,255,0.2)' }}
                    />
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Video Tutorials Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h5" gutterBottom sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
            <PlayCircleIcon color="primary" />
            Video Tutorials
          </Typography>
          <Grid container spacing={3}>
            {videoTutorials.map((video, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ height: '100%' }}>
                  <Box
                    sx={{
                      position: 'relative',
                      paddingTop: '56.25%', // 16:9 aspect ratio
                      bgcolor: 'grey.200',
                      cursor: 'pointer',
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      <PlayCircleIcon sx={{ fontSize: 48, color: 'white' }} />
                    </Box>
                    <Typography
                      sx={{
                        position: 'absolute',
                        bottom: 8,
                        right: 8,
                        bgcolor: 'rgba(0,0,0,0.75)',
                        color: 'white',
                        px: 1,
                        borderRadius: 1,
                      }}
                    >
                      {video.duration}
                    </Typography>
                  </Box>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {video.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {video.description}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                      {video.views} views
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Help Categories */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {helpCategories.map((category) => (
            <Grid item xs={12} sm={6} md={3} key={category.title}>
              <Paper
                sx={{
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 3,
                  }
                }}
                onClick={() => setSelectedCategory(category.title)}
              >
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                    color: category.color,
                    bgcolor: `${category.color}15`,
                  }}
                >
                  {category.icon}
                </Box>
                <Typography variant="h6" gutterBottom>
                  {category.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {category.description}
                </Typography>
                <Box sx={{ mt: 'auto' }}>
                  <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                    {category.subcategories.map((sub, index) => (
                      <Chip
                        key={index}
                        label={sub}
                        size="small"
                        sx={{ bgcolor: `${category.color}15`, color: category.color }}
                      />
                    ))}
                  </Stack>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Category Filter */}
        <Box sx={{ mb: 4 }}>
          <Stack direction="row" spacing={1}>
            <Chip
              label="All"
              onClick={() => setSelectedCategory('all')}
              color={selectedCategory === 'all' ? 'primary' : 'default'}
              variant={selectedCategory === 'all' ? 'filled' : 'outlined'}
            />
            {helpCategories.map((category) => (
              <Chip
                key={category.title}
                label={category.title}
                onClick={() => setSelectedCategory(category.title)}
                color={selectedCategory === category.title ? 'primary' : 'default'}
                variant={selectedCategory === category.title ? 'filled' : 'outlined'}
              />
            ))}
          </Stack>
        </Box>

        {/* Community Resources Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h5" gutterBottom sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
            <CommunityIcon color="primary" />
            Community Resources
          </Typography>
          <Grid container spacing={3}>
            {communityResources.map((resource, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper sx={{ p: 3, height: '100%' }}>
                  <Typography variant="h6" gutterBottom>
                    {resource.title}
                  </Typography>
                  <Typography color="text.secondary" sx={{ mb: 2 }}>
                    {resource.description}
                  </Typography>
                  <Stack direction="row" spacing={2}>
                    {resource.members && (
                      <Chip
                        label={`${resource.members} members`}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    )}
                    {resource.topics && (
                      <Chip
                        label={`${resource.topics} topics`}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    )}
                    {resource.upcoming && (
                      <Chip
                        label={`${resource.upcoming} upcoming`}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    )}
                  </Stack>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Enhanced FAQ Section with Feedback */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
            Frequently Asked Questions
          </Typography>
          {filteredQuestions.map((faq, index) => (
            <Accordion key={index} sx={{ mb: 1 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{ '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.02)' } }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography variant="h6" sx={{ fontSize: '1.1rem' }}>
                    {faq.question}
                  </Typography>
                  <Chip
                    label={faq.category}
                    size="small"
                    sx={{
                      bgcolor: `${helpCategories.find(cat => cat.title === faq.category)?.color}15`,
                      color: helpCategories.find(cat => cat.title === faq.category)?.color
                    }}
                  />
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Typography color="text.secondary" sx={{ mb: 2 }}>
                  {faq.answer}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Was this helpful?
                  </Typography>
                  <Tooltip title="Yes, this was helpful">
                    <IconButton
                      size="small"
                      onClick={() => handleHelpfulRating(index, true)}
                      color={helpfulRatings[index] === true ? 'primary' : 'default'}
                    >
                      <ThumbUpIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="No, this wasn't helpful">
                    <IconButton
                      size="small"
                      onClick={() => handleHelpfulRating(index, false)}
                      color={helpfulRatings[index] === false ? 'error' : 'default'}
                    >
                      <ThumbDownIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>

        {/* Enhanced Contact Support Section */}
        <Card
          sx={{
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            borderRadius: 2,
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Grid container alignItems="center" spacing={4}>
              <Grid item xs={12} md={8}>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                  <SupportIcon fontSize="large" />
                  <Typography variant="h4">Still need help?</Typography>
                </Stack>
                <Typography variant="body1" sx={{ mb: 2, opacity: 0.9 }}>
                  Our support team is here to help you with any questions or concerns you may have.
                  We typically respond within 24 hours.
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
                    Current support response time:
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={70}
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.2)',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: 'white',
                      },
                      borderRadius: 1,
                      height: 8,
                      width: '200px',
                    }}
                  />
                  <Typography variant="caption" sx={{ display: 'block', mt: 0.5 }}>
                    Average response time: 2-4 hours
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4} sx={{ textAlign: { md: 'right' } }}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: 'white',
                    color: 'primary.main',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.9)',
                    },
                  }}
                  startIcon={<HelpIcon />}
                >
                  Contact Support
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default HelpCenter; 