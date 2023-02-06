import React, { useMemo, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import Fade from '@mui/material/Fade';
import MenuBar from '../MenuBar';
import { Chip, Divider } from '@mui/material';

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const Customechip = {
  color: 'white',
  px: 1,
  backgroundColor: (theme) => theme.palette.background.default,
}

const NavBar = ({groupData, setGroupData, data, setIsMulti, setDataType, dates}) => {
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const groupNames = useMemo(() => Object.keys(groupData), [groupData]);
  const [open, setOpen] = useState({});

  const handleClick = (event) => {
    setOpen({[event.currentTarget.getAttribute('aria-controls')]: true})
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const clickDateHandler = (num, dateType) => {
    let newData = {};
    let numberOfDate = 0;
    var dateTime = new Date(dates[dates.length - 1]);
    switch (dateType) {
      case "D":
        numberOfDate = num;
        dateTime = dateTime.setDate(dateTime.getDate() - numberOfDate );
        dateTime = new Date(dateTime);
        break;
      case "M":
        numberOfDate = num * 30;
        dateTime = dateTime.setDate(dateTime.getDate() - numberOfDate );
        dateTime = new Date(dateTime);
        break;
      case "ALL":
        setGroupData(data);
        return;
      default:
        break;
    }
    groupNames.forEach(groupName => {
      newData = {...newData, [groupName]: data[groupName].filter(ele => new Date(ele.EFF_DT).getTime() >= dateTime)}
    })
    setGroupData(newData);
  };

  const clickCmtHandler = (type) => {
    let dataType = "";
    switch (type) {
      case "PRO/EXP":
        setIsMulti(true);
        return;
      case "person":
        dataType = "CMT_P";
        break;
      case "group":
        dataType = "CMT_G";
        break;
      default:
        break;
    }
    setIsMulti(false);
    setDataType(dataType);
  };

  const clickFobHandler = () => {
    setIsMulti(false);
    setDataType("FOB_MY");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ 
        top: 'auto',
        bottom: 0,
        backgroundColor:'#333333',
        }}>
          <Tabs value={value} variant="fullWidth" onChange={handleChange} aria-label="navbar">
            <Tab
              id="fade-button"
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              wrapped
              label="Date" 
              {...a11yProps(0)}
              sx={{color: 'white',}}
            />
            <Tab
              id="fade-button"
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              wrapped
              label="CMT" 
              {...a11yProps(1)}
              sx={{color: 'white',}}
            />
            <Tab label="FOB" {...a11yProps(3)} onClick={clickFobHandler} sx={{color: 'white',}} />
          </Tabs>
        </AppBar>
        <Menu
          id="menu-date"
          MenuListProps={{'aria-labelledby': 'fade-button',}}
          anchorEl={anchorEl}
          open={open["full-width-tabpanel-0"] ? true : false}
          anchorOrigin={{vertical: 'top',horizontal: 'left',}}
          transformOrigin={{vertical: 'bottom',horizontal: 'left',}}
          TransitionComponent={Fade}
          onClose={handleClose}
          >
          <MenuBar title={"天"} customStyles={{color: 'white',width: '300px', border: 'none', boxShadow: 'none'}} >
            <Chip sx={Customechip} label="7D" onClick={(e)=> clickDateHandler(7, "D")} clickable/>
            <Chip sx={Customechip} label="10D" onClick={(e)=> clickDateHandler(10, "D")} clickable/>
            <Chip sx={Customechip} label="20D" onClick={(e)=> clickDateHandler(20, "D")} clickable/>
            <Chip sx={Customechip} label="30D" onClick={(e)=> clickDateHandler(30, "D")} clickable/>
          </MenuBar>
          <Divider variant="middle" sx={{backgroundColor: (theme) => theme.palette.background.default,}} />
          <MenuBar title={"月"} customStyles={{color: 'white',width: '300px', border: 'none', boxShadow: 'none'}} >
            <Chip sx={Customechip} label="1M" onClick={(e)=> clickDateHandler(1, "M")} clickable/>
            <Chip sx={Customechip} label="2M" onClick={(e)=> clickDateHandler(2, "M")} clickable/>
            <Chip sx={Customechip} label="3M" onClick={(e)=> clickDateHandler(3, "M")} clickable/>
          </MenuBar>
          <Divider variant="middle" sx={{backgroundColor: (theme) => theme.palette.background.default,}} />
          <MenuBar title={"全部"} customStyles={{color: 'white',width: '300px', border: 'none', boxShadow: 'none'}} >
            <Chip sx={Customechip} label="全部" onClick={(e)=> clickDateHandler(0, "ALL")} clickable/>
          </MenuBar>
        </Menu>
        <Menu
          id="menu-cmt"
          MenuListProps={{'aria-labelledby': 'fade-button',}}
          anchorEl={anchorEl}
          open={open["full-width-tabpanel-1"] ? true : false}
          anchorOrigin={{vertical: 'top',horizontal: 'left',}}
          transformOrigin={{vertical: 'bottom',horizontal: 'left',}}
          TransitionComponent={Fade}
          onClose={handleClose}
          >
          <MenuBar title={"CMT"} customStyles={{color: 'white',width: '300px', border: 'none', boxShadow: 'none'}} >
          <Chip sx={Customechip} label="PRO/EXP" onClick={(e)=> clickCmtHandler("PRO/EXP")} clickable/>
          <Chip sx={Customechip} label="Person" onClick={(e)=> clickCmtHandler("person")} clickable/>
          <Chip sx={Customechip} label="Group" onClick={(e)=> clickCmtHandler("group")} clickable/>
          </MenuBar>
        </Menu>
      </Box>
    );
}

const NavBarMemo = React.memo(NavBar);

export default NavBarMemo;