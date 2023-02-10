import React, { useState } from 'react';
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

const getFactories = (groupData) => {
  let factories = [];
  let totalDates = groupData["A01"].length;
  for (let idx = 0; idx < totalDates; idx++) {
    let factoriesData = [];
    Object.entries(groupData).forEach(([key, value]) =>{
      const data = value[idx];
      const myArray = key.split("")[0];
      if (!factoriesData[myArray]) return factoriesData[myArray] = [data];
      factoriesData[myArray].push(data);
    });
    Object.entries(factoriesData).forEach(([key, value]) =>{
      let data = {};
      value.forEach((val) => {
        Object.entries(val).forEach(([key, da]) => {
          if(typeof da === 'number') {
            const newValue = da/value.length;
            data[key] = (data[key] ? data[key]: 0) + (newValue);
            if(data[key]){
              data[key] = Math.round(data[key] * 10) / 10;
            }
          } else if (key === 'EFF_DT') {
            data[key] = da;
          } else {
            data[key] = "";
          }
        })
        return data;
      })
      if (!factories[key]) return factories[key] = [data];
      factories[key].push(data);
    });
  }
  return factories;
};

const NavBar = ({groupData, setGroupData, data, setIsMulti, setDataType, dates}) => {
  const [value, setValue] = useState(0);
  const [dateFilter, setDateFilter] = useState({
    num:10,
    dateType: "D",
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const [isGroup, setIsGroup] = useState(true);
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
    let numberOfDate = 0;
    let dateTime = new Date(dates[dates.length - 1]);
    let dataHandle = isGroup ? data : getFactories(data);
    let isALL = false;
    if(dateType === "D"){
      numberOfDate = num;
      dateTime = dateTime.setDate(dateTime.getDate() - numberOfDate );
      dateTime = new Date(dateTime);
    } else if (dateType === "M") {
      numberOfDate = num;
      dateTime = dateTime.setDate(dateTime.getDate() - numberOfDate );
      dateTime = new Date(dateTime);
    } else {
      isALL = true
    }
    setDateFilter({num,dateType});
    if(dateType === "D"){
      numberOfDate = num;
      dateTime = dateTime.setDate(dateTime.getDate() - numberOfDate );
      dateTime = new Date(dateTime);
    } else if (dateType === "M") {
      numberOfDate = num;
      dateTime = dateTime.setDate(dateTime.getDate() - numberOfDate );
      dateTime = new Date(dateTime);
    } else {
      isALL = true
    }
    let newData = {};
    const names = Object.keys(dataHandle);
    if(isALL) return setGroupData(dataHandle);
    names.forEach(groupName => {
      newData = {...newData, [groupName]: dataHandle[groupName].filter(ele => new Date(ele.EFF_DT).getTime() >= dateTime)}
    })
    setGroupData(newData);
  };

  const clickHandler = (isCMT, type) => {
    let dataType = "";
    switch (type) {
      case "PRO/EXP":
        setIsMulti(true);
        return;
      case "person":
        dataType = isCMT ? "CMT_P" : "FOB_P";
        break;
      case "group":
        dataType = isCMT ? "CMT_G" : "FOB_G";
        break;
      default:
        break;
    }
    setIsMulti(false);
    setDataType(dataType);
  };

  const clickFactoryHandler = (FOG) => {
    const {num, dateType} = dateFilter;
    let numberOfDate = 0;
    let dataHandle = FOG ? data : getFactories(data);
    var dateTime = new Date(dates[dates.length - 1]);
    let isALL = false;
    if(dateType === "D"){
      numberOfDate = num;
      dateTime = dateTime.setDate(dateTime.getDate() - numberOfDate );
      dateTime = new Date(dateTime);
    } else if (dateType === "M") {
      numberOfDate = num;
      dateTime = dateTime.setDate(dateTime.getDate() - numberOfDate );
      dateTime = new Date(dateTime);
    } else {
      isALL = true
    }
    setIsGroup(FOG);
    let newData = {};
    const names = Object.keys(dataHandle);
    if(isALL) return setGroupData(dataHandle);
    names.forEach(groupName => {
      newData = {...newData, [groupName]: dataHandle[groupName].filter(ele => new Date(ele.EFF_DT).getTime() >= dateTime)}
    })
    setGroupData(newData);
  }

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
            <Tab
              id="fade-button"
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              wrapped
              label="FOB" 
              {...a11yProps(2)}
              sx={{color: 'white',}}
            />
            <Tab
              id="fade-button"
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              wrapped
              label="Factory/Group" 
              {...a11yProps(3)}
              sx={{color: 'white',}}
            />
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
            <Chip sx={Customechip} label="PRO/EXP" onClick={(e)=> clickHandler(true, "PRO/EXP")} clickable/>
            <Chip sx={Customechip} label="Person" onClick={(e)=> clickHandler(true, "person")} clickable/>
            <Chip sx={Customechip} label="Group" onClick={(e)=> clickHandler(true, "group")} clickable/>          </MenuBar>
        </Menu>
        <Menu
          id="menu-fob"
          MenuListProps={{'aria-labelledby': 'fade-button',}}
          anchorEl={anchorEl}
          open={open["full-width-tabpanel-2"] ? true : false}
          anchorOrigin={{vertical: 'top',horizontal: 'left',}}
          transformOrigin={{vertical: 'bottom',horizontal: 'left',}}
          TransitionComponent={Fade}
          onClose={handleClose}
          >
          <MenuBar title={"FOB"} customStyles={{color: 'white',width: '300px', border: 'none', boxShadow: 'none'}} >
            <Chip sx={Customechip} label="Person" onClick={(e)=> clickHandler(false, "person")} clickable/>
            <Chip sx={Customechip} label="Group" onClick={(e)=> clickHandler(false, "group")} clickable/>          </MenuBar>
        </Menu>
        <Menu
          id="menu-FOG"
          MenuListProps={{'aria-labelledby': 'fade-button',}}
          anchorEl={anchorEl}
          open={open["full-width-tabpanel-3"] ? true : false}
          anchorOrigin={{vertical: 'top',horizontal: 'left',}}
          transformOrigin={{vertical: 'bottom',horizontal: 'left',}}
          TransitionComponent={Fade}
          onClose={handleClose}
          >
          <MenuBar title={"FOG"} customStyles={{color: 'white',width: '300px', border: 'none', boxShadow: 'none'}} >
            <Chip sx={Customechip} label="Group" onClick={(e)=> clickFactoryHandler(true)} clickable/>
            <Chip sx={Customechip} label="Factory" onClick={(e)=> clickFactoryHandler(false)} clickable/>
          </MenuBar>
        </Menu>
      </Box>
    );
}

const NavBarMemo = React.memo(NavBar);

export default NavBarMemo;