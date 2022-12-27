import { Box, Modal, Typography } from '@mui/material';
import React from 'react';
import { MyDualAxesMemo } from '..';
import { underFobText, underIdText } from '../../Content';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	minWidth: '362px',
	minHeight: '302px',
	maxWidth: '724px',
	maxHeight: '604px',
	backgroundColor: '#2B3648',
	borderRadius: '8px',
	boxShadow: '1px 4px 6px rgba(0, 0, 0, 0.25)',
};

const ChartModal = ({ isOpen, setIsOpen, rowData }) => {
	const modalCloseHandler = () => setIsOpen(!isOpen);

	return (
		<Modal open={isOpen} onClose={modalCloseHandler}>
			<Box sx={style}>
				<Box
					sx={{
						mt: '20px',
						mr: '20px',
						mb: '20px',
						ml: '20px',
						width: {
							md: '95%',
						},
					}}>
					<Typography
						variant='h3'
						fontSize={'20px'}
						sx={{
							width: '100%',
							height: '36px',
							color: 'white',
							display: 'inline-block',
						}}>
						{rowData[rowData.length - 1].GRP_ID}
					</Typography>
					<Typography
						variant='body1'
						fontSize={'12px'}
						sx={{
							width: '100%',
							mb: '15px',
							color: 'rgba(255, 255, 255, 0.7)',
							display: 'inline-block',
						}}>
						{underIdText}
					</Typography>
					<MyDualAxesMemo rowData={rowData} height={'150px'} />
					<Box
						sx={{
							display: 'inline-block',
							textAlign: 'center',
							width: '50%',
							mt: '15px',
							color: 'white',
						}}>
						<Typography variant='body1' fontSize={'12px'}>
							{rowData[rowData.length - 1].CMT_MY}
						</Typography>
						<Typography variant='body1' fontSize={'12px'} sx={{ mt: '4px' }}>
							{(
								rowData[rowData.length - 1].PRD_QT /
								rowData[rowData.length - 1].EXP_QT
							).toFixed(2) *
								100 +
								'%'}
						</Typography>
					</Box>
					<Box
						sx={{
							display: 'inline-block',
							textAlign: 'center',
							width: '50%',
							mt: '15px',
							color: 'white',
						}}>
						<Typography variant='body1' fontSize={'12px'}>
							{rowData[rowData.length - 1].FOB_MY.toFixed(2)}
						</Typography>
						<Typography variant='body1' fontSize={'12px'} sx={{ mt: '4px' }}>
							{underFobText}
						</Typography>
					</Box>
				</Box>
			</Box>
		</Modal>
	);
};

export default ChartModal;
