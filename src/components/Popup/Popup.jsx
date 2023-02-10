import { Box, Button, Modal, Typography } from '@mui/material';
import React, { useState } from 'react'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

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
};

const Popup = () => {
  const [open, setOpen] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          選擇日期
        </Typography>
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
        <Button variant="contained" onClick={handleClose}>確定</Button>
      </Box>
    </Modal>
  )
}

export default Popup
