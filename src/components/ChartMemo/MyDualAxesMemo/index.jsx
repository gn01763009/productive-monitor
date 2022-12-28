import React, { useMemo } from 'react';
import { DualAxes } from '@ant-design/plots';
import { Box } from '@mui/material';

const getChartData = (rowData) => {
	const chartData = [];
	rowData.forEach((row) => {
		chartData.push({
			time: row.EFF_DT.split('T')[0],
			PRD_QT: row.PRD_QT,
			EXP_QT: row.EXP_QT,
		});
	});
	return chartData;
};

const MyDualAxes = ({ rowData, width, height, isLegend }) => {
	console.log('rowData', rowData);
	const chartData = useMemo(() => getChartData(rowData), [rowData]);
	const config = {
		data: [chartData, chartData],
		xField: 'time',
		yField: ['PRD_QT', 'EXP_QT'],
		legend: isLegend ? true : false,
		geometryOptions: [
			{
				geometry: 'column',
			},
			{
				smooth: true,
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
		<Box sx={{ width: width ? width : '100%', height: height }}>
			<DualAxes {...config} rendered='svg' />
		</Box>
	);
};

const MyDualAxesMemo = React.memo(MyDualAxes);

export default MyDualAxesMemo;
