import React from 'react';
import { Container, Grid, Paper, Typography, Box } from '@mui/material';
import {
  Handyman as RepairIcon,
  CleaningServices as CleaningIcon,
  LocalShipping as MovingIcon,
  Build as AssemblyIcon,
  Weekend as FurnitureIcon,
  Computer as TechIcon,
  Brush as PaintingIcon,
  Grass as GardeningIcon,
  Plumbing as PlumbingIcon,
  ElectricBolt as ElectricalIcon,
  Pets as PetCareIcon,
  LocalLaundryService as LaundryIcon,
  CarRepair as AutoIcon,
  School as TutoringIcon,
  Restaurant as CateringIcon,
  PhotoCamera as PhotographyIcon
} from '@mui/icons-material';

const services = [
  { icon: <RepairIcon />, name: 'Home Repairs', description: 'General repairs and maintenance' },
  { icon: <CleaningIcon />, name: 'Cleaning', description: 'House and office cleaning services' },
  { icon: <MovingIcon />, name: 'Moving', description: 'Residential & commercial moving' },
  { icon: <AssemblyIcon />, name: 'Assembly', description: 'Furniture & equipment assembly' },
  { icon: <FurnitureIcon />, name: 'Furniture', description: 'Furniture moving & arrangement' },
  { icon: <TechIcon />, name: 'Tech Help', description: 'Computer & device support' },
  { icon: <PaintingIcon />, name: 'Painting', description: 'Interior & exterior painting' },
  { icon: <GardeningIcon />, name: 'Gardening', description: 'Lawn care & landscaping' },
  { icon: <PlumbingIcon />, name: 'Plumbing', description: 'Repairs & installations' },
  { icon: <ElectricalIcon />, name: 'Electrical', description: 'Electrical repairs & installations' },
  { icon: <PetCareIcon />, name: 'Pet Care', description: 'Pet sitting & dog walking' },
  { icon: <LaundryIcon />, name: 'Laundry', description: 'Wash, dry & fold services' },
  { icon: <AutoIcon />, name: 'Auto Care', description: 'Basic car maintenance' },
  { icon: <TutoringIcon />, name: 'Tutoring', description: 'Academic & skill tutoring' },
  { icon: <CateringIcon />, name: 'Catering', description: 'Event food services' },
  { icon: <PhotographyIcon />, name: 'Photography', description: 'Event & portrait photography' }
];

function AllServices() {
  return (
    <Box sx={{ py: 8, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          align="center"
          color="primary"
          gutterBottom
          sx={{
            mb: 6,
            fontWeight: 600,
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -16,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 100,
              height: 4,
              bgcolor: 'primary.main',
              borderRadius: 2,
            }
          }}
        >
          All Services
        </Typography>

        <Grid container spacing={3}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 3,
                    '& .MuiSvgIcon-root': {
                      color: 'primary.main',
                      transform: 'scale(1.2)',
                    }
                  }
                }}
              >
                <Box
                  sx={{
                    mb: 2,
                    p: 2,
                    borderRadius: '50%',
                    bgcolor: 'primary.light',
                    color: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    '& .MuiSvgIcon-root': {
                      fontSize: 40,
                      transition: 'all 0.3s ease',
                    }
                  }}
                >
                  {service.icon}
                </Box>
                <Typography
                  variant="h6"
                  component="h3"
                  gutterBottom
                  sx={{ fontWeight: 600 }}
                >
                  {service.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ flexGrow: 1 }}
                >
                  {service.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default AllServices; 