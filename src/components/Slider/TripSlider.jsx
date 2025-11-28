import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Box, Paper, Typography } from '@mui/material'
import { useNavigate } from 'react-router'

const TripSlider = ({ trips }) => {
 const navigate = useNavigate()
const onTripSelect = (tripId) => {
    navigate(`/trips/${tripId}`)
}
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '50px',
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerPadding: '20px',
        },
      },
    ],
  }
  return (
    <Slider {...settings}>
      {trips.map((trip) => (
        <Box key={trip._id} sx={{ 
                    display: 'flex',
                    justifyContent: 'center',
                    px: 1, 
                    mb: 2,
         }}>
          <Paper
            elevation={3}
            onClick={() => onTripSelect(trip._id)}
sx={{
  width: '100%',
  maxWidth: 300,
  minHeight: 180,
  maxHeight: 180,
  p: 2,
  mt: 2,
  borderRadius: 4,
  bgcolor: '#f6f8f9ff',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  '&:hover': {
    transform: 'scale(1.05)',
    cursor: 'pointer',
    boxShadow: 2,
  },
}}

            className="trip-slide"
          >
            {/*Trip Info*/}
            <Box>
            <Typography  fontWeight='bold' fontSize='1.1rem' sx={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'wrap'}}>
            {trip.title}
             </Typography>
              {/* <Typography fontSize='0.9rem' sx={{ mt: 0.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {trip.description}
             </Typography>
              <Typography fontSize='0.9rem' sx={{ mt: 0.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {trip.location}
             </Typography> */}
              <Typography fontSize='0.80rem' sx={{ mt: 1, color: 'grey' }}>
            {new Date(trip.startDate).toLocaleDateString()}-{new Date(trip.endDate).toLocaleDateString()}
             </Typography>
            </Box>
          </Paper>
        </Box>
      ))}
    </Slider>
  )
}

export default TripSlider