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

// groups = {
//   "A01": [
//       {"SEQ_NO":"100","WEE_ID":2,"EFF_DT":"2022-07-18T00:00:00.000Z","WRK_HR":11,"GRP_ID":"A01","CMT_MY":5921.95,"FOB_MY":43979,"PRD_QT":85,"EXP_QT":42,"WRK_QQ":330.05499999999995,"EMP_QT":23,"EMP_QQ":35.3,"I_E_QT":2.27,"CMT_EXP":null},
//       {"SEQ_NO":"100","WEE_ID":2,"EFF_DT":"2022-07-18T00:00:00.000Z","WRK_HR":11,"GRP_ID":"A01","CMT_MY":5921.95,"FOB_MY":43979,"PRD_QT":85,"EXP_QT":42,"WRK_QQ":330.05499999999995,"EMP_QT":23,"EMP_QQ":35.3,"I_E_QT":2.27,"CMT_EXP":null},
//     ]
// }

const getGroups = (originData) => {
	let groups = [];
	originData.forEach((rowData) => {
		if (!groups[rowData.GRP_ID]) {
			groups[rowData.GRP_ID] = [rowData];
			return;
		}
		groups[rowData.GRP_ID].push(rowData);
	});
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
		//categorizing by groups
		setGroupData(getGroups(originData));
		setLoading(false);
	}, []);

	return (
		<div className='App'>
			<ThemeProvider theme={theme}>
				{!loading ? (
					<Container>
						<Header />
						<Highlights groupData={groupData} />
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
