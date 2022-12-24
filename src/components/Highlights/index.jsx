import { Box, Card, CardActionArea, Typography } from '@mui/material';
import React, { useReducer } from 'react';
import IconSelector from '../IconSelector';

const initialHighlightData = [
	{
		icon: 'group',
		num: 'TEST',
		text: 'Total groups',
		id: 't_grps',
		isClick: true,
	},
	{
		icon: 'assignmentTurnedIn',
		num: 'TEST',
		text: 'Completed among',
		id: 'completed_grps',
		isClick: false,
	},
	{
		icon: 'emojiEvents',
		num: 'TEST',
		text: 'Best group',
		id: 'best_grp',
		isClick: false,
	},
	{
		icon: 'functions',
		num: 'TEST',
		text: '總生產 %',
		id: 't_prd',
		isClick: false,
	},
];

const highlightDataReducer = (state, action) => {
	let stateCopy = [...state];
	switch (action.type) {
		case 'TOTAL_GRP_ISCLICKED':
			stateCopy.forEach(card => {
				(card.icon === 'group') ? card.isClick = true : card.isClick = false ;
			});
			return stateCopy;
		case 'COMPLETED_GRP_ISCLICKED':
			stateCopy.forEach(card => {
				(card.icon === 'assignmentTurnedIn') ? card.isClick = true : card.isClick = false ;
			});
			return stateCopy;
		case 'TROPHY_ISCLICKED':
			stateCopy.forEach(card => {
				(card.icon === 'emojiEvents') ? card.isClick = true : card.isClick = false ;
			});
			return stateCopy;
		case 'TOTAL_PRD_ISCLICKED':
			stateCopy.forEach(card => {
				(card.icon === 'functions') ? card.isClick = true : card.isClick = false ;
			});
			return stateCopy;
		default:
			return;
	}
};

const Highlights = () => {
	const [state, dispatch] = useReducer(
		highlightDataReducer,
		initialHighlightData
	);

	const clickHandler = (id) => {
		if (id === 't_grps') {dispatch({ type: 'TOTAL_GRP_ISCLICKED' })};
		if (id === 'completed_grps') {dispatch({ type: 'COMPLETED_GRP_ISCLICKED' })};
		if (id === 'best_grp') {dispatch({ type: 'TROPHY_ISCLICKED' })};
		if (id === 't_prd') {dispatch({ type: 'TOTAL_PRD_ISCLICKED' })};
	};

	return (
		<Box
			sx={{
				width: '100%',
				overflowX: 'auto',
				backgroundColor: 'rgba(0, 0, 0, 0.2)',
			}}>
			<Box
				sx={{
					display: 'flex',
					width: '684px',
					height: '198px',
					gap: '20px',
					alignItems: 'center',
					justifyContent: 'center',
					overflowY: 'hidden',
					mx: 'auto',
				}}>
				{state.map((card) => {
					return (
						<CardActionArea onClick={() => clickHandler(card.id)} key={card.id}>
							<Card
								sx={{
									width: 156,
									height: 140,
									borderRadius: '10px',
									textAlign: 'center',
									backgroundColor: !card.isClick
										? (theme) => theme.palette.background.card
										: (theme) => theme.palette.primary.main,
									'& .MuiSvgIcon-root': {
										color: !card.isClick
											? (theme) => theme.palette.background.default
											: 'white',
									},
								}}>
								<Box
									sx={{
										mt: '16px',
									}}>
										<IconSelector id={card.icon} />
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
									<Typography
										variant='caption'
										sx={{
											display: 'block',
											width: '100%',
											mt: 0,
											mb: 4,
											fontSize: '12px',
											color: !card.isClick
												? (theme) => theme.palette.background.default
												: 'white',
										}}>
										{card.text}
									</Typography>
								</Box>
							</Card>
						</CardActionArea>
					);
				})}
			</Box>
		</Box>
	);
};

export default Highlights;
