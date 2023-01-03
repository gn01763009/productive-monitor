import React from 'react';
import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import './loading.css';

const Loading = () => {
  const refCount = React.useRef(0);

  refCount.current++;
  return (
    <Box sx={{ display: 'flex' }}>
      <div className="px-griditem">
        <div id="qt-loading-qtload008" className="qt-loading">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </Box>
  )
}

export default Loading;
