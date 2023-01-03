import React from 'react';
import { Card, Typography } from '@mui/material';

const BackgroundColorText = ({ prd, exp, children }) => {
	return (
		<Card
			sx={{
				backgroundColor: () => (prd > exp ? '#0BC07A' : 'red'),
				p: 0.5,
				mt: '4px',
			}}>
			<Typography variant='body1' fontSize={12} color='white'>
				{children}
			</Typography>
		</Card>
	);
};

export default BackgroundColorText;
