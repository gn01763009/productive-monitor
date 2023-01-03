import React, { useMemo } from 'react';
import { Line } from '@ant-design/plots';
import { Box } from '@mui/material';
import moment from 'moment';

const getChartData = (rowData, dataType) => {
	const chartData = [];
	rowData.forEach((row) => {
		chartData.push({
			time: moment(row.EFF_DT).format("MM-DD"),
			[dataType]: row[dataType],
		});
	});
	return chartData;
};

const MyAxes = ({ rowData, width, height, dataType, isLabel }) => {
	const chartData = useMemo(() => getChartData(rowData, dataType), [rowData, dataType]);
	const label = isLabel ? {} : null;
	const config = {
		data: chartData,
		xField: 'time',
		yField: dataType,
		yAxis: {
      label,
    },
		legend: {
      position: 'top',
    },
		smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 3000,
      },
    },
	};

	return (
		<Box
			sx={{
				width: width ? width : '100%',
				height: height,
				py: '4px',
			}}>
			<Line {...config} rendered='svg' />
		</Box>
	);
};

const MyAxesMemo = React.memo(MyAxes);

export default MyAxesMemo;
