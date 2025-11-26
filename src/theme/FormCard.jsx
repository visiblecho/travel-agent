import { Paper, Box } from '@mui/material'

const FormCard = ({children, width = 400}) => { // reusable form wrapper 
    return (
        <Paper 
        elevation={3}
        sx={{
            p: 4,
            width: { xs: "90%", sm: width },
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
        }}
        >
            {children}
        </Paper>
    )
}

export default FormCard 