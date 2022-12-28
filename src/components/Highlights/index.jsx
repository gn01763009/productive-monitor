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
		case 'CLICKED':
			stateCopy.forEach((card) => {
				card.id === action.payload
					? (card.isClick = true)
					: (card.isClick = false);
			});
			return stateCopy;
		case 'UPDATE_STATE':
			action.payload.forEach((cardData) => {
				let { result, id } = cardData;
				stateCopy.forEach((card) => {
					if (card.id === id) {
						card.num = result;
					}
				});
			});
			// stateCopy.forEach(card => {
			// 	if (card.id === id) {card.num = result};
			// if (card.icon === 'group') {card.num = action.payload.totalGroup};
			// if (card.icon === 'assignmentTurnedIn') {card.num = action.payload.assignmentTurnedIn};
			// if (card.icon === 'emojiEvents') {card.num = action.payload.bestGroup};
			// if (card.icon === 'functions') {card.num = action.payload.totalProductive};
			// });
			return stateCopy;
		default:
			return;
	}
};

const getCompletedCount = (data, groupName) => {
	let completedCount = 0;
	groupName.forEach((groupName) => {
		let rowData = data[groupName];
		let newestData = rowData[rowData.length - 1];
		if (newestData.PRD_QT / newestData.EXP_QT >= 1) {
			completedCount++;
		}
	});
	let payload = { result: completedCount, id: 'completed_grps' };
	return payload;
};

const getBestGroup = (data, groupName) => {
	let score = null;
	let bestGroup;
	groupName.forEach((groupName) => {
		let rowData = data[groupName];
		let newestData = rowData[rowData.length - 1];
		if (newestData.PRD_QT / newestData.EXP_QT >= score) {
			score = newestData.PRD_QT / newestData.EXP_QT;
			bestGroup = groupName;
		}
	});
	let payload = { result: bestGroup, id: 'best_grp' };
	return payload;
};

const getTotalProductive = (data, groupName) => {
	let sum_PRD_QT = 0;
	let sum_EXP_QT = 0;
	groupName.forEach((groupName) => {
		let rowData = data[groupName];
		let newestData = rowData[rowData.length - 1];
		sum_PRD_QT = sum_PRD_QT + newestData.PRD_QT;
		sum_EXP_QT = sum_EXP_QT + newestData.EXP_QT;
	});
	let result = ((sum_PRD_QT / sum_EXP_QT) * 100).toFixed(2).toString() + '%';
	let payload = { result, id: 't_prd' };
	return payload;
};

const Highlights = ({ groupData }) => {
	const [state, dispatch] = useReducer(
		highlightDataReducer,
		initialHighlightData
	);

	useEffect(() => {
		let groupName = Object.keys(groupData);
		dispatch({
			type: 'UPDATE_STATE',
			payload: [
				{
					result: groupName.length,
					id: 't_grps',
				},
				getCompletedCount(groupData, groupName),
				getBestGroup(groupData, groupName),
				getTotalProductive(groupData, groupName),
			],
		});
		// 	totalGroup: groupName.length,
		// 	assignmentTurnedIn: getCompletedCount(groupData, groupName),
		// 	bestGroup: getBestGroup(groupData, groupName),
		// 	totalProductive: getTotalProductive(groupData, groupName),
		// }})
	}, []);

	const clickHandler = (id) => {
		dispatch({ type: 'CLICKED', payload: id });
	};

	return (
		<Box
			sx={{
				width: '100%',
				overflowX: 'auto',
				backgroundColor: 'rgba(0, 0, 0, 0.2)',
				px: '20px',
				boxSizing: 'border-box',
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
