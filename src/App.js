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

const theme = createTheme({ ...themeOptions });

const initDates = (data) => {
  let dates = [];
  console.log('data', data);
  data.forEach(ele => {
    if (dates.find(date => date === moment(ele.EFF_DT).format("YYYY-MM-DD"))) return;
    dates.push(moment(ele.EFF_DT).format("YYYY-MM-DD"));
  })
  console.log('dates', dates)
  return dates;
}

function App() {
  const [data, setData] = useState({});
  const [dates, setDates] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //fetching API data
    setData(originData)
    setDates(initDates(originData))
    setLoading(false);
  }, [])

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        {!loading ? (
          <Container>
            <Header />
            <Content originData={data} dates={dates} />
            <NavBar originData={data} dates={dates} />
          </Container>
        ) : (
          <Loading />
        )}
      </ThemeProvider>
    </div>
  );
}

export default App;
