import { Box, Typography } from "@mui/material"

const FormRow = ({label, children, labelWidth = 120}) => {
    return (
        <Box display='flex' alignItems='center' gap={2}>
            <Typography
            sx={{ width: labelWidth, textAlign: 'right', flexShrink: 0 }}
            >
                {label}
            </Typography>
            <Box flex={1}>{children}</Box>
        </Box>
    )
}

export default FormRow