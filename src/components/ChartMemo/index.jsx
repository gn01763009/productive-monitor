import React, { useState } from 'react';
import { Box, ButtonBase } from '@mui/material';
import ChartModal from './ChartModal';
import MyDualAxesMemo from './MyDualAxesMemo';

const Chart = ({ rowData }) => {
	// const [isOpen, setIsOpen] = useState(false);

	// const modalPopUpHabdler = () => setIsOpen(!isOpen);

	return (
		<Box sx={{ width: '100%' }}>
			<MyDualAxesMemo rowData={rowData} height={'125px'} />
			{/* <ChartModal isOpen={isOpen} setIsOpen={setIsOpen} rowData={rowData} /> */}
		</Box>
	);
};

const ChartMemo = React.memo(Chart);

export default ChartMemo;
