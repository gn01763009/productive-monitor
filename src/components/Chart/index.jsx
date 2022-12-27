import React from 'react';
import { DualAxes } from '@ant-design/plots';
import { Box } from '@mui/material';

const Chart = ({ rowData }) => {
	console.log('rowData', rowData);
	const chartData = [];
	rowData.forEach((row) => {
		chartData.push({
			time: row.EFF_DT.split('T')[0],
			PRD_QT: row.PRD_QT,
			EXP_QT: row.EXP_QT,
		});
	});

	const config = {
		data: [chartData, chartData],
		xField: 'time',
		yField: ['PRD_QT', 'EXP_QT'],
		geometryOptions: [
			{
				geometry: 'column',
			},
			{
				geometry: 'line',
				lineStyle: {
					lineWidth: 2,
				},
			},
		],
	};

	return (
		<Box sx={{ width: '100%', height: '125px' }}>
			<DualAxes {...config} />
		</Box>
	);
};

export default Chart;
