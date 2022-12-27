import React, { useState } from 'react';
import { DualAxes } from '@ant-design/plots';
import { Box, ButtonBase } from '@mui/material';
import ChartModal from './ChartModal';

const MyDualAxes = ({ rowData, height }) => {
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
		<Box sx={{ width: '100%', height: height }}>
			<DualAxes {...config} />
		</Box>
	);
};

export const MyDualAxesMemo = React.memo(MyDualAxes);

const Chart = ({ rowData }) => {
	// console.log('rowData', rowData);
	// const chartData = [];
	// rowData.forEach((row) => {
	// 	chartData.push({
	// 		time: row.EFF_DT.split('T')[0],
	// 		PRD_QT: row.PRD_QT,
	// 		EXP_QT: row.EXP_QT,
	// 	});
	// });

	// const config = {
	// 	data: [chartData, chartData],
	// 	xField: 'time',
	// 	yField: ['PRD_QT', 'EXP_QT'],
	// 	geometryOptions: [
	// 		{
	// 			geometry: 'column',
	// 		},
	// 		{
	// 			geometry: 'line',
	// 			lineStyle: {
	// 				lineWidth: 2,
	// 			},
	// 		},
	// 	],
	// };
  const [isOpen, setIsOpen] = useState(false);

  const modalPopUpHabdler = () => setIsOpen(!isOpen);

	return (
		<ButtonBase onClick={modalPopUpHabdler} sx={{ width: '100%' }}>
			<MyDualAxesMemo rowData={rowData} height={'125px'} />
      <ChartModal isOpen={isOpen} setIsOpen={setIsOpen}  rowData={rowData} />
		</ButtonBase>
	);
};

export default Chart;
