import { Box } from '@mui/material';
import React, { useMemo } from 'react';
import DataTable from 'react-data-table-component';
import ChartMemo from '../ChartMemo';
import BackgroundColorText from './BackgroundColorText';
import { css, keyframes } from '@emotion/react';

const percentageHandler = (arg1, arg2 = 1) => {
	const num = arg1 / arg2;
	if (isNaN(num)) {
		return '－－';
	}
	return Math.round(num * 1000) / 10 + '%';
};

const tableCustomStyles = {
	table: {
		style: {
			background: '#56657F !important',
		},
	},
	headCells: {
		style: {
			background: '#212936',
			color: 'white',
			fontSize: '12px !important',
			paddingLeft: '2px',
			paddingRight: '2px',
			overflow: 'auto',
			'@media (min-width: 392px)': {
				fontSize: '14px !important',
			},
		},
	},
	headRow: {
		style: {
			marginBottom: '5px !important',
			borderBottomWidth: '0 !important',
			'@media (min-width: 392px)': {
				marginBottom: '15px !important',
				borderRadius: '8px',
				'& div:nth-child(1)': {
					borderTopLeftRadius: '8px',
					borderBottomLeftRadius: '8px',
				},
				'& div:nth-child(4)': {
					borderTopRightRadius: '8px',
					borderBottomRightRadius: '8px',
				},
			},
		},
	},
	cells: {
		style: {
			paddingLeft: '0px',
			paddingRight: '0px',
			background: '#212936',
			color: 'white',
		},
	},
	rows: {
		style: {
			marginBottom: '5px !important',
			borderBottomWidth: '0 !important',
			transition: '',
			'@media (min-width: 392px)': {
				marginBottom: '15px !important',
				borderRadius: '8px',
				'& div:nth-child(1)': {
					borderTopLeftRadius: '8px',
					borderBottomLeftRadius: '8px',
				},
				'& div:nth-child(4)': {
					borderTopRightRadius: '8px',
					borderBottomRightRadius: '8px',
				},
			},
		},
	},
};

const conditionalRowStyles = [
	{
		when: (row) => true,
		style: (row) => {
			return {
				animationName: `fadeIn`,
				animationDuration: `${row.idx * 750}ms`,
			};
		},
	},
];

export const underIdText = 'DV9340';
export const underFobText = 169;

const Content = ({ groupData, dates, isMulti, dataType }) => {
	const groupNames = useMemo(() => Object.keys(groupData), [groupData]);
	const groupFirst = useMemo(
		() => groupNames.map((groupName, idx) => ({ idx, groupName })),
		[groupData]
	);

	const columns = [
		{
			name: 'Group',
			minWidth: '50px',
			center: true,
			selector: (group) => group.groupName,
			cell: (group) => (
				<div>
					<div style={{ fontSize: '20px' }}>{group.groupName}</div>
					<div style={{ marginTop: '4px' }}>{underIdText}</div>
				</div>
			),
		},
		{
			name: 'Trend',
			minWidth: '180px',
			center: true,
			cell: (group) => (
				<ChartMemo
					rowData={groupData[group.groupName]}
					isMulti={isMulti}
					dataType={dataType}
				/>
			),
		},
		{
			name: 'CMT',
			minWidth: '40px',
			center: true,
			sortable: true,
			// selector: (group) => groupData[group][groupData[group].length - 1].CMT_MY,
			selector: (group) =>
				groupData[group.groupName][groupData[group.groupName].length - 1]
					.PRD_QT /
				groupData[group.groupName][groupData[group.groupName].length - 1]
					.EXP_QT,
			cell: (group) => (
				<div>
					<div style={{ fontSize: '12px' }}>
						{Math.round(
							groupData[group.groupName][groupData[group.groupName].length - 1]
								.CMT_MY * 1000
						) / 1000}
					</div>
					<BackgroundColorText
						prd={
							groupData[group.groupName][groupData[group.groupName].length - 1]
								.PRD_QT
						}
						exp={
							groupData[group.groupName][groupData[group.groupName].length - 1]
								.EXP_QT
						}>
						{percentageHandler(
							groupData[group.groupName][groupData[group.groupName].length - 1]
								.PRD_QT,
							groupData[group.groupName][groupData[group.groupName].length - 1]
								.EXP_QT
						)}
					</BackgroundColorText>
				</div>
			),
		},
		{
			name: 'FOB/QTY',
			minWidth: '78px',
			center: true,
			sortable: true,
			selector: (group) =>
				groupData[group.groupName][groupData[group.groupName].length - 1]
					.FOB_MY,
			cell: (group) => (
				<div style={{ borderBottomRightRadius: '8px !important' }}>
					<div>
						{Math.round(
							groupData[group.groupName][groupData[group.groupName].length - 1]
								.FOB_MY * 1000
						) / 1000}
					</div>
					<div style={{ marginTop: '4px' }}>{underFobText}</div>
				</div>
			),
		},
	];

	return (
		<Box
			sx={{
				mt: '20px',
				mb: '48px',
			}}>
			<style>
				{`@keyframes fadeIn {
				0% {
					opacity: 0;
				} 
				100% {
					opacity: 1;
				}
			}`}
			</style>
			<DataTable
				columns={columns}
				data={groupFirst}
				customStyles={tableCustomStyles}
				conditionalRowStyles={conditionalRowStyles}
			/>
		</Box>
	);
};

export default Content;
