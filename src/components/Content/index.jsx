import { Box } from '@mui/material';
import React, { useMemo } from 'react';
import DataTable from 'react-data-table-component';
import ChartMemo from '../ChartMemo';
import BackgroundColorText from './BackgroundColorText';

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
			borderRadius: '8px',
			'@media (min-width: 392px)': {
				marginBottom: '15px !important',
			},
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
			borderRadius: '8px',
			'@media (min-width: 392px)': {
				marginBottom: '15px !important',
			},
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
};

export const underIdText = 'DV9340';
export const underFobText = 169;

const Content = ({ groupData, dates, isMulti, dataType }) => {
	const groupNames = useMemo(() => Object.keys(groupData), [groupData]);

	const columns = [
		{
			name: 'Group',
			minWidth: '50px',
			center: true,
			sortable: true,
			selector: (group) => group,
			cell: (group) => (
				<div>
					<div style={{ fontSize: '20px' }}>{group}</div>
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
					rowData={groupData[group]}
					isMulit={isMulit}
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
				groupData[group][groupData[group].length - 1].PRD_QT /
				groupData[group][groupData[group].length - 1].EXP_QT,
			cell: (group) => (
				<div>
					<div style={{ fontSize: '12px' }}>
						{Math.round(
							groupData[group][groupData[group].length - 1].CMT_MY * 1000
						) / 1000}
					</div>
					<BackgroundColorText
						prd={groupData[group][groupData[group].length - 1].PRD_QT}
						exp={groupData[group][groupData[group].length - 1].EXP_QT}>
						{percentageHandler(
							groupData[group][groupData[group].length - 1].PRD_QT,
							groupData[group][groupData[group].length - 1].EXP_QT
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
			selector: (group) => groupData[group][groupData[group].length - 1].FOB_MY,
			cell: (group) => (
				<div style={{ borderBottomRightRadius: '8px !important' }}>
					<div>
						{Math.round(
							groupData[group][groupData[group].length - 1].FOB_MY * 1000
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
			<DataTable
				columns={columns}
				data={groupNames}
				customStyles={tableCustomStyles}
			/>
		</Box>
	);
};

export default Content;
