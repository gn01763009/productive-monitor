import React, { useState } from 'react';
import { ButtonBase } from '@mui/material';
import ChartModal from './ChartModal';
import MyDualAxesMemo from './MyDualAxesMemo';
import MyAxesMemo from './MyAxesMemo';

const Chart = ({ rowData, isMulti, dataType }) => {
	const [isOpen, setIsOpen] = useState(false);

	const modalPopUpHabdler = () => setIsOpen(true);

	return (
		<>
			<ButtonBase
				onClick={modalPopUpHabdler}
				sx={{ width: '100%', cursor: 'pointer' }}>
				{isMulti ? <MyDualAxesMemo rowData={rowData} height={'125px'} /> : 
				<MyAxesMemo rowData={rowData} dataType={dataType} height={'125px'} />
				}
			</ButtonBase>
			<ChartModal isOpen={isOpen} setIsOpen={setIsOpen} rowData={rowData} isMulti={isMulti} dataType={dataType} />
		</>
	);
};

const ChartMemo = React.memo(Chart);

export default ChartMemo;
