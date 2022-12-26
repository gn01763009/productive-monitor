import React from 'react';
import { CircularProgress } from '@mui/material';

const Loading = () => {
  return (
    <CircularProgress
      size={48}
      sx={{
        display: 'block',
        mt: '8px',
        mb: '4px',
        ml: 'auto',
        mr: 'auto',
        color: (theme) => theme.palette.background.default,
      }}
    />
  )
}

export default Loading
