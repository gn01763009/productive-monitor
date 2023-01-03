import { CircularProgress, Typography } from '@mui/material';
import React from 'react';

const HightlightNum = ({ card }) => {
	return (
		<>
			{card.num !== null ? (
				<Typography
					variant='body1'
					sx={{
						display: 'block',
						width: '100%',
						mt: '8px',
						mb: '4px',
						fontSize: '24px',
						color: !card.isClick
							? (theme) => theme.palette.background.default
							: 'white',
					}}>
					{card.num}
				</Typography>
			) : (
				<CircularProgress
					size={36}
					sx={{
						display: 'block',
						mt: '8px',
						mb: '4px',
						ml: 'auto',
						mr: 'auto',
						color: !card.isClick
							? (theme) => theme.palette.background.default
							: 'white',
					}}
				/>
			)}
		</>
	);
};

export default HightlightNum;
