import React, { useState } from 'react';
import { ButtonBase } from '@mui/material';
import ChartModal from './ChartModal';
import MyDualAxesMemo from './MyDualAxesMemo';

const Chart = ({ rowData }) => {
	const [isOpen, setIsOpen] = useState(false);

	const modalPopUpHabdler = () => setIsOpen(!isOpen);

	return (
		<ButtonBase
			onClick={modalPopUpHabdler}
			sx={{ width: '100%', cursor: 'pointer' }}>
			<MyDualAxesMemo rowData={rowData} height={'125px'} />
			<ChartModal isOpen={isOpen} setIsOpen={setIsOpen} rowData={rowData} />
		</ButtonBase>
	);
};

const ChartMemo = React.memo(Chart);

export default ChartMemo;
