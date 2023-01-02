import React from 'react'
import { Card, Typography } from '@mui/material';

const BackgroundColorText = ({prd, exp, children}) => {
  return (
    <Card sx={{backgroundColor: () => prd > exp ? "green": "red", p:0.5}}>
      <Typography color="white">
        {children}
      </Typography>
    </Card>
  )
}

export default BackgroundColorText
