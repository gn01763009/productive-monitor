import './App.css';
import { Container, ThemeProvider, createTheme } from '@mui/material';
import { themeOptions } from './assets/theme';
import { useEffect, useState } from 'react';
import { originData } from './assets/data';
import moment from 'moment';

//components
import HeaderMemo from './components/HeaderMemo';
import Content from './components/Content';
import NavBarMemo from './components/NavBarMemo';
import Loading from './components/Loading';
import Highlights from './components/Highlights';

const theme = createTheme({ ...themeOptions });

const initDates = (data) => {
  let dates = [];
  data.forEach((ele) => {
    if (dates.find((date) => date === moment(ele.EFF_DT).format('YYYY-MM-DD')))
      return;
    dates.push(moment(ele.EFF_DT).format('YYYY-MM-DD'));
  });
  return dates;
};

// groups = {
//   "A01": [
//       {"SEQ_NO":"100","WEE_ID":2,"EFF_DT":"2022-07-18T00:00:00.000Z","WRK_HR":11,"GRP_ID":"A01","CMT_MY":5921.95,"FOB_MY":43979,"PRD_QT":85,"EXP_QT":42,"WRK_QQ":330.05499999999995,"EMP_QT":23,"EMP_QQ":35.3,"I_E_QT":2.27,"CMT_EXP":null},
//       {"SEQ_NO":"100","WEE_ID":2,"EFF_DT":"2022-07-18T00:00:00.000Z","WRK_HR":11,"GRP_ID":"A01","CMT_MY":5921.95,"FOB_MY":43979,"PRD_QT":85,"EXP_QT":42,"WRK_QQ":330.05499999999995,"EMP_QT":23,"EMP_QQ":35.3,"I_E_QT":2.27,"CMT_EXP":null},
//     ]
// }

const getGroups = (originData) => {
  let groups = [];
  originData.forEach((rowData) => {
    const groupData = {
      ...rowData,
      "CMT_P": Math.round((rowData["CMT_MY"] / rowData["EMP_QT"] / rowData["WRK_HR"]) * 1000) / 1000,
      "CMT_G": Math.round((rowData["CMT_MY"] / rowData["WRK_HR"]) * 1000) / 1000,
    }
    if (!groups[rowData.GRP_ID]) {
      groups[rowData.GRP_ID] = [groupData];
      return;
    }
    groups[rowData.GRP_ID].push(groupData);
  });
  return groups;
};

function App() {
  const [data, setData] = useState({});
  const [dates, setDates] = useState({});
  const [loading, setLoading] = useState(true);
  const [groupData, setGroupData] = useState(null);
  const [isMulti, setIsMulti] = useState(true);
  const [dataType, setDataType] = useState("");

  useEffect(() => {
    //fetching API data
    setData(getGroups(originData));
    setDates(initDates(originData));
    //categorizing by groups
    setGroupData(getGroups(originData));
    setLoading(false);
  }, []);

  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <Container
          sx={{
            backgroundColor: (theme) => theme.palette.background.default,
            px: 0,
          }}>
          {!loading ? (
            <>
              <HeaderMemo />
              <Highlights data={data} />
              <Content groupData={groupData} dates={dates} isMulti={isMulti} dataType={dataType} />
              <NavBarMemo groupData={groupData} setGroupData={setGroupData} data={data} setIsMulti={setIsMulti} setDataType={setDataType} dates={dates} />
            </>
          ) : (
            <Loading />
          )}
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
