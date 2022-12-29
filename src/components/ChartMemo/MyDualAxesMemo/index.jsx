import React, { useMemo } from 'react';
import { DualAxes } from '@ant-design/plots';
import { Box } from '@mui/material';

const getChartData = (rowData) => {
	const chartData = [];
	rowData.forEach((row) => {
		chartData.push({
			time: row.EFF_DT.slice(5, 10),
			PRD_QT: row.PRD_QT,
			EXP_QT: row.EXP_QT,
		});
	});
	return chartData;
};

const MyDualAxes = ({ rowData, width, height, isLegend, isLabel }) => {
	console.log('rowData', rowData);
	const chartData = useMemo(() => getChartData(rowData), [rowData]);
	const config = {
		data: [chartData, chartData],
		xField: 'time',
		yField: ['PRD_QT', 'EXP_QT'],
		yAxis: {
			PRD_QT: {},
			EXP_QT: {},
		},
		legend: !isLegend
			? false
			: {
					custom: true,
					items: [
						{
							name: 'value',
							marker: {
								symbol: 'square',
							},
						},
						{
							name: 'count',
							marker: {
								symbol: 'hyphen',
								style: {
									stroke: 'red',
								},
							},
						},
					],
			  },
		tooltip: {
			itemTpl:
				"<li class='custom-tooltip-marker-for-{name}'><span style='width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;'></span>{name}: {value}</li>",
			domStyles: {
				'g2-tooltip-list': {
					paddingBottom: '8px',
				},
			},
		},
		geometryOptions: [
			{
				geometry: 'column',
			},
			{
				geometry: 'line',
				lineStyle: {
					lineWidth: 2,
					stroke: '#ff0000',
				},
				smooth: true,
			},
		],
	};

	if (!isLabel) {
		console.log('config', config);
		config.yAxis['PRD_QT'].label = null;
		config.yAxis['EXP_QT'].label = null;
	}

	return (
		<Box
			sx={{
				width: width ? width : '100%',
				height: height,
				py: '4px',
				'li.custom-tooltip-marker-for-PRD_QT > span': { background: '#6294F9' },
				'li.custom-tooltip-marker-for-EXP_QT > span': { background: 'red' },
			}}>
			<DualAxes {...config} rendered='svg' />
		</Box>
	);
};

const MyDualAxesMemo = React.memo(MyDualAxes);

export default MyDualAxesMemo;
