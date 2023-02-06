import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';

export default function MenuBar({title, children}) {
  return (
    <Card sx={{color: 'white',width: '300px', border: 'none', boxShadow: 'none', m:1}}>
      <CardContent sx={{pb:0}}>
        <Typography sx={{ fontSize: 14 }} color="white" gutterBottom>
          {title}
        </Typography>
      </CardContent>
      <Stack direction="row" spacing={1} sx={{ml:1}}>
        {children}
      </Stack>
    </Card>
  );
}