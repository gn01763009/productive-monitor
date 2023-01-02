import { Button } from '@mui/material';
import React, { useMemo } from 'react';
import DataTable from 'react-data-table-component';
import ChartMemo from '../ChartMemo';
import BackgroundColorText from './BackgroundColorText';

const percentageHandler = (arg1, arg2 = 1) => {
	const num = arg1 / arg2;
	return Math.round(num * 1000) / 10;
};

const tableCustomStyles = {
	headCells: {
		style: {
			background: '#184059',
			color: 'white',
			paddingLeft: '2px',
			paddingRight: '2px',
			overflow: 'auto',
		},
	},
	cells: {
		style: {
			paddingLeft: '0px',
			paddingRight: '0px',
		},
	},
};

export const underIdText = 'DV9340';
export const underFobText = 169;

const Content = ({ groupData, dates, isMulit, dataType }) => {
	const groupNames = useMemo(() => Object.keys(groupData), [groupData]);

	const columns = [
		{
			name: 'Group',
			minWidth: '50px',
			center: true,
			selector: (group) => group,
			cell: (group) => (
				<div>
					<div>{group}</div>
					<div>{underIdText}</div>
				</div>
			),
		},
		{
			name: 'Trend',
			minWidth: '180px',
			center: true,
			cell: (group) => <ChartMemo rowData={groupData[group]} isMulit={isMulit} dataType={dataType} />,
		},
		{
			name: 'CMT',
			minWidth: '40px',
			center: true,
			sortable: true,
			selector: (group) => groupData[group][groupData[group].length - 1].CMT_MY,
			cell: (group) => (
				<div>
					<div>
						{Math.round(groupData[group][groupData[group].length - 1].CMT_MY * 1000) / 1000}
					</div>
					<BackgroundColorText prd={groupData[group][groupData[group].length - 1].PRD_QT} exp={groupData[group][groupData[group].length - 1].EXP_QT} >
						{percentageHandler(
							groupData[group][groupData[group].length - 1].PRD_QT,
							groupData[group][groupData[group].length - 1].EXP_QT
						) + "%"}
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
				<div>
					<div>
						{Math.round(groupData[group][groupData[group].length - 1].FOB_MY * 1000) / 1000}
					</div>
					<div>{underFobText}</div>
				</div>
			),
		},
	];

	return (
		<div>
			<DataTable
				columns={columns}
				data={groupNames}
				customStyles={tableCustomStyles}
			/>
		</div>
	);
};

export default Content;
