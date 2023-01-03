import { Box } from '@mui/material';
import React, { useMemo } from 'react';
import DataTable from 'react-data-table-component';
import ChartMemo from '../ChartMemo';
import BackgroundColorText from './BackgroundColorText';

const percentageHandler = (arg1) => {
	if (!arg1) {
		return '- -';
	}
	return arg1;
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
				// animation: `fadeInUp .3s ease-in-out ${row.idx * 300}ms forwards`
				animationName: `fadeInUp`,
				animationDuration: `800ms`,
				animationDelay: `${row.idx * 100}ms`,
			};
		},
	},
];

export const underIdText = 'DV9340';
export const underFobText = 169;

const Content = ({ groupData, isMulti, dataType }) => {
	const groupNames = useMemo(() => Object.keys(groupData), [groupData]);
	const groupFirst = useMemo(() => groupNames.map((groupName, idx) => {
		const data = groupData[groupName];
		const EFF = data[data.length - 1]["EFF"] || 0;
		return {
			idx,
			groupName,
			EFF
		};
	}),[groupData]);

	const columns = [
		{
			name: 'Group',
			minWidth: '50px',
			center: true,
			sortable: true,
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
			selector: (group) =>(group.EFF),
			cell: (group) => (
				<div>
					<div style={{ fontSize: '12px' }}>
						{Math.round(groupData[group.groupName][groupData[group.groupName].length - 1].CMT_MY * 1000) / 1000}
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
						{percentageHandler(group.EFF)+ "%"}
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
				{`@keyframes fadeInUp {
					from { 
							opacity: 0;
							-webkit-transform: translate3d(0, 100%, 0);
							transform: translate3d(0, 100%, 0);
					}
					to {
							opacity: 1;
							-webkit-transform: none;
							transform: none;
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
