//useFetch.js
import { useEffect, useState } from 'react';
import $ from 'jquery';

function useFetch(url) {
	const [isLoading, setIsLoading] = useState(false);
	const [isCompleted, setIsCompleted] = useState(false);
	const [fecthData, setFecthData] = useState('');
	const [error, setError] = useState('');

	useEffect(() => {
		setIsLoading(true);
		$.ajax({
			url: url,
			method: 'GET',
			processData: false,
			contentType: false,
			dataType: 'text',
			async: true,
			success: function (res) {
				const resReplace = res.replaceAll(`'`, `"`);
				console.log('resReplace from useFetch', resReplace);
				const resJson = JSON.parse(resReplace);
				// const resJson = JSON.parse(res.replaceAll(`'`, `"`));
				// const resJson = JSON.parse(res);
				setFecthData(resJson);
				setIsLoading(false);
				setIsCompleted(true);
			},
			error: function (err) {
				setError(err);
				console.error(err);
			},
		});
		// fetch(url, {
		//   headers: {
		//     'Content-Type': 'text/html; charset=UTF-8',
		//     // 'Content-Type': 'application/x-www-form-urlencoded',
		//     'Access-Control-Allow-Origin': '*'
		//   },
		//   referrerPolicy: 'strict-origin-when-cross-origin', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		// })
		//   .then((res) => res.json())
		//   .then((json) => setFecthData(json))
		//   .catch((err) => {
		//     setError(err);
		//     console.log('err', err)
		//   })
		//   .finally(() => {
		//     setIsLoading(false);
		//     setIsCompleted(true);
		//   })
	}, [url]);

	return { fecthData, error, isLoading, isCompleted };
}

export default useFetch;
