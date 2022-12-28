import React from 'react';
import DataTable from 'react-data-table-component';
import ChartMemo from '../ChartMemo';

const percentageHandler = (arg1, arg2 = 1) => {
	const num = arg1 / arg2;
	return Math.round(num * 100) / 100;
};

const tableCustomStyles = {
	headCells: {
		style: {
			background: '#184059',
			color: 'white',
			paddingLeft: '8px',
			paddingRight: '8px',
		},
	},
	cells: {
		style: {
			paddingLeft: '8px',
			paddingRight: '8px',
		},
	},
};

export const underIdText = 'DV9340';
export const underFobText = 169;

const Content = ({ groupData, dates }) => {
	let groupName = Object.keys(groupData);

	const columns = [
		{
			name: 'Group',
			minWidth: '65px',
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
			// selector: group => group.time,
			minWidth: '155px',
			center: true,
			cell: (group) => <ChartMemo rowData={groupData[group]} />,
		},
		{
			name: 'CMT',
			minWidth: '65px',
			center: true,
			selector: (group) => groupData[group][groupData[group].length - 1].CMT_MY,
			cell: (group) => (
				<div>
					<div>
						{percentageHandler(
							groupData[group][groupData[group].length - 1].CMT_MY
						)}
					</div>
					<div>
						{percentageHandler(
							groupData[group][groupData[group].length - 1].PRD_QT,
							groupData[group][groupData[group].length - 1].EXP_QT
						)}
					</div>
				</div>
			),
		},
		{
			name: 'FOB/QTY',
			minWidth: '65px',
			center: true,
			selector: (group) => groupData[group][groupData[group].length - 1].FOB_MY,
			cell: (group) => (
				<div>
					<div>
						{percentageHandler(
							groupData[group][groupData[group].length - 1].FOB_MY
						)}
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
				data={groupName}
				customStyles={tableCustomStyles}
			/>
		</div>
	);
};

export default Content;
