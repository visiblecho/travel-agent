import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Box, Paper } from '@mui/material'
import Thailand from '../../assets/Thailand.avif'
import Greece from '../../assets/Greece.avif'
import Venice from '../../assets/Venice.jpeg'

const PhotoSlider = () => {
    const settings = {
        infinite: true, 
        speed: 500, 
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '80px',
        responsive: [
            { 
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    centerPadding: '20px',
                },
            },
        ],
    }
    const slides = [Thailand, Greece, Venice]
return (
    <Slider {...settings}>
        {slides.map((img, i) => (
            <Box key={i} sx={{ px: 1 }}>
            <Paper 
            elevation={3}
            sx={{
                height: 150,
                borderRadius: 3,
                overflow: 'hidden',
                transition: '0.3s',
                // filter: 'grayscale(50%)',
            }}
            className='photo-slide'
            >
            <img 
            src={img}
            alt={`Slide ${i + 1}`}
            style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
            }}
            />
            </Paper>
            </Box>
        ))}
    </Slider>
)
}

export default PhotoSlider