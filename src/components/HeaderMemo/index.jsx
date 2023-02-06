import React from 'react'
import { Typography } from '@mui/material'

const Header = () => {
  return (
    <Typography variant="h4" sx={{color: '#AFBDD1', textAlign:'left', p:2}} component="h2" >
      EAG
    </Typography>
  )
}

const HeaderMemo = React.memo(Header);

export default HeaderMemo;
