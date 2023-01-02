import React, { useState } from 'react';
import { ButtonBase } from '@mui/material';
import ChartModal from './ChartModal';
import MyDualAxesMemo from './MyDualAxesMemo';

const Chart = ({ rowData, isMulit, dataType }) => {
	const [isOpen, setIsOpen] = useState(false);

	const modalPopUpHabdler = () => setIsOpen(true);

	return (
		<>
			<ButtonBase
				onClick={modalPopUpHabdler}
				sx={{ width: '100%', cursor: 'pointer' }}>
				{isMulit ? <MyDualAxesMemo rowData={rowData} height={'125px'} /> : 
				<MyDualAxesMemo rowData={rowData} dataType={dataType} height={'125px'} />
				}
			</ButtonBase>
			<ChartModal isOpen={isOpen} setIsOpen={setIsOpen} rowData={rowData} />
		</>
	);
};

const ChartMemo = React.memo(Chart);

export default ChartMemo;
