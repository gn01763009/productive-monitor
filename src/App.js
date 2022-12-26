import './App.css';
import { Container, ThemeProvider, createTheme } from '@mui/material';
import { themeOptions } from './assets/theme';
import { useEffect, useState } from 'react';
import { originData } from './assets/data';
import moment from 'moment';

//components
import Header from './components/Header';
import Content from './components/Content';
import NavBar from './components/NavBar';
import Loading from './components/Loading';
import Highlights from './components/Highlights';

const theme = createTheme({ ...themeOptions });

const initDates = (data) => {
  let dates = [];
  console.log('data', data);
  data.forEach((ele) => {
    if (dates.find((date) => date === moment(ele.EFF_DT).format('YYYY-MM-DD')))
      return;
    dates.push(moment(ele.EFF_DT).format('YYYY-MM-DD'));
  });
  console.log('dates', dates);
  return dates;
};

const getGroups = (originData) => {
  let groups = [];
  for (let i = 0; i < originData.length; i++) {
    if (i === 0) {
      groups.push({
        GRP_ID: originData[i].GRP_ID,
        data: [],
      });
    } else {
      if (originData[i - 1].GRP_ID !== originData[i].GRP_ID) {
        groups.push({
          GRP_ID: originData[i].GRP_ID,
          data: [],
        });
      }
    }
  }
  groups.forEach((group) => {
    group.data = originData.filter((data) => data.GRP_ID === group.GRP_ID);
  });
  console.log(groups, 'groups');
  return groups;
};

function App() {
  const [data, setData] = useState({});
  const [dates, setDates] = useState({});
  const [loading, setLoading] = useState(true);
  const [groupData, setGroupData] = useState(null);

  useEffect(() => {
    //fetching API data
    setData(originData);
    setDates(initDates(originData));
    setLoading(false);
    //categorizing by groups
    setGroupData(getGroups(originData));
  }, []);

  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <Container
          sx={{
            backgroundColor: (theme) => theme.palette.background.default,
          }}>
          {!loading ? (
            <>
              <Header />
              <Highlights groupData={groupData} />
              <Content originData={data} dates={dates} />
              <NavBar originData={data} dates={dates} />
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
