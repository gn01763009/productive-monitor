import { Box, Button, Modal, Typography } from '@mui/material';
import React, { useState } from 'react'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./style.css";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: (theme) => theme.palette.background.default,
  boxShadow: 24,
  borderRadius: 5,
  p: 4,
  color: 'white',
  fontSize: '14px',
  display: 'flex',
  flexDirection: 'column',
  gap: 1,
};

const Popup = ({startDate, setStartDate, endDate, setEndDate, setIsClick}) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    if(!startDate || !endDate)  return;
    setIsClick(true);
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography sx={{width: "100%"}} id="modal-modal-title" variant="h5" component="h2">
          選擇日期
        </Typography>
        <DatePicker className="picker" sx={{width: "100%"}} selected={startDate} onChange={(date) => setStartDate(date)} />
        <DatePicker className="picker" sx={{width: "100%"}} selected={endDate} onChange={(date) => setEndDate(date)} />
        <Button sx={{width: "100%"}} variant="contained" onClick={handleClose}>確定</Button>
      </Box>
    </Modal>
  )
}

export default Popup
