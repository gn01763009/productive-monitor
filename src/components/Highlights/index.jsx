import { Box, Card, CardActionArea, Typography } from '@mui/material';
import React, { useEffect, useReducer } from 'react';
import IconSelector from '../IconSelector';
import HightlightNum from './HightlightNum';

const initialHighlightData = [
	{
		icon: 'group',
		num: null,
		text: 'Total groups',
		id: 't_grps',
		isClick: true,
	},
	{
		icon: 'assignmentTurnedIn',
		num: null,
		text: 'Completed among',
		id: 'completed_grps',
		isClick: false,
	},
	{
		icon: 'emojiEvents',
		num: null,
		text: 'Best group',
		id: 'best_grp',
		isClick: false,
	},
	{
		icon: 'functions',
		num: null,
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
		case 'UPDATE_STATE':
			stateCopy.forEach(card => {
				if (card.icon === 'group') {card.num = action.payload.totalGroup};
				if (card.icon === 'assignmentTurnedIn') {card.num = action.payload.assignmentTurnedIn};
				if (card.icon === 'emojiEvents') {card.num = action.payload.bestGroup};
				if (card.icon === 'functions') {card.num = action.payload.totalProductive};
			});
			return stateCopy;
		default:
			return;
	}
};

const getCompletedCount = (data) => {
	let completedCount = 0;
	data.forEach(group => {
		let data = group.data[group.data.length - 1];
		if (data.PRD_QT / data.EXP_QT >= 1) {completedCount ++};
	})
	return completedCount;
};

const getBestGroup = data => {
	let score = null;
	let bestGroup;
	data.forEach(group => {
		let data = group.data[group.data.length - 1];
		if (data.PRD_QT / data.EXP_QT >= score) {
			score = data.PRD_QT / data.EXP_QT;
			bestGroup = data.GRP_ID;
		}
	})
	return bestGroup;
};

const getTotalProductive = data => {
	let sum_PRD_QT = 0;
	let sum_EXP_QT = 0;
	data.forEach(group => {
		let data = group.data[group.data.length - 1];
		sum_PRD_QT = sum_PRD_QT + data.PRD_QT;
		sum_EXP_QT = sum_EXP_QT + data.EXP_QT;
	});
	return (sum_PRD_QT / sum_EXP_QT * 100).toFixed(2).toString() + '%';
};

const Highlights = ({ groupData }) => {
	const [state, dispatch] = useReducer(
		highlightDataReducer,
		initialHighlightData
	);

	useEffect(() => {
		dispatch({type: 'UPDATE_STATE', payload: {
			totalGroup: groupData.length,
			assignmentTurnedIn: getCompletedCount(groupData),
			bestGroup: getBestGroup(groupData),
			totalProductive: getTotalProductive(groupData),
		}})
	}, []);

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
										<HightlightNum card={card} />
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
