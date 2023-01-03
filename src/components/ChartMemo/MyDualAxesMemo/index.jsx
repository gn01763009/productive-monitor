import React, { useMemo } from 'react';
import { DualAxes } from '@ant-design/plots';
import { Box } from '@mui/material';
import moment from 'moment';

const getChartData = (rowData) => {
	const chartData = [];
	rowData.forEach((row) => {
		chartData.push({
			time: moment(row.EFF_DT).format('MM-DD'),
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
							name: 'Productivity',
							marker: {
								symbol: 'square',
							},
						},
						{
							name: 'Expectation',
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
			customItems: (originalItems) => {
				let customItems = originalItems;
				const EXP_QT = originalItems[0].data['EXP_QT'];
				const PRD_QT = originalItems[0].data['PRD_QT'];
				const percentageHandler = (arg1, arg2 = 1) => {
					const num = arg1 / arg2;
					const answer = Math.round(num * 1000) / 10 + '%';
					if (!arg2) return 'none';
					return arg1 < arg2 ? `(${answer})` : answer;
				};
				customItems.push({
					...originalItems[0],
					name: 'CMT',
					value: percentageHandler(PRD_QT, EXP_QT),
				});
				return originalItems;
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
				py: '8px',
				'li.custom-tooltip-marker-for-PRD_QT > span': { background: '#6294F9' },
				'li.custom-tooltip-marker-for-EXP_QT > span': { background: 'red' },
			}}>
			<DualAxes {...config} rendered='svg' />
		</Box>
	);
};

const MyDualAxesMemo = React.memo(MyDualAxes);

export default MyDualAxesMemo;
