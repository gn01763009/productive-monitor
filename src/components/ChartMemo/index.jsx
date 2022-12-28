import React from 'react';
import { Box } from '@mui/material';
import MyDualAxesMemo from './MyDualAxesMemo';

const Chart = ({ rowData }) => {
	// const [isOpen, setIsOpen] = useState(false);

	// const modalPopUpHabdler = () => setIsOpen(!isOpen);

	return (
		<Box sx={{ width: '100%' }}>
			<MyDualAxesMemo rowData={rowData} height={'125px'} isLabel={false} />
			{/* <ChartModal isOpen={isOpen} setIsOpen={setIsOpen} rowData={rowData} /> */}
		</Box>
	);
};

const ChartMemo = React.memo(Chart);

export default ChartMemo;
