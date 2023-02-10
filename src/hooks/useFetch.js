//useFetch.js
import { useEffect, useState } from 'react';
import $ from 'jquery';

function useFetch(url, startDate, endDate, isClick) {
	const [isLoading, setIsLoading] = useState(false);
	const [isCompleted, setIsCompleted] = useState(false);
	const [fecthData, setFecthData] = useState('');
	const [error, setError] = useState('');

	useEffect(() => {
		setIsLoading(true);
		if (!startDate || !endDate) return;
		$.ajax({
			url: url,
			method: 'GET',
			processData: false,
			contentType: false,
			dataType: 'text',
			async: true,
			data: {startDate, endDate},
			success: function (res) {
				const resReplace = res.replaceAll(`'`, `"`);
				console.log('resReplace from useFetch', resReplace);
				const resJson = JSON.parse(resReplace);
				setFecthData(resJson);
				setIsLoading(false);
				setIsCompleted(true);
			},
			error: function (err) {
				setError(err);
				console.error(err);
			},
		});
	}, [isClick]);

	return { fecthData, error, isLoading, isCompleted };
}

export default useFetch;
