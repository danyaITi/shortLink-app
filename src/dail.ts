import React from "react";
// interface IStatistics {
// 	count: number;
// 	short: string;
// 	id: ....
// 	....
// }

// const useStatistics = () => {
// 	const [statistics, setStatistics] = useState<IStatistics[]>([]);

// 	const fetchStatistics = async () => {
// 		const statistics = await $api.get('/statistics')
// 		setStatistics(statistics);
// 	}


// 	const addStatistics = (statistic: IStatistic) => {
// 		setStatistics(old => [...old, statistic]);
// 	}

// 	return {
// 		statistics,
// 		addStatistics,
// 		fetchStatistics
// 	}
// }


// const useSqueeze = () => {
	
// 	const squeeze = async () => {
// 		return await $api.post('/squeeze'....)
// 	}

// 	return {
// 		squeeze
// 	}
// }



// const Links = () => {
	
// 	const [link, setLink] = useState('');
// 	const [shortLink, setShortLink] = useState('')
// 	const { statistics, fetchStatistics, addStatistics } = useStatistics();
// 	const { squeeze } = useSqueeze();


// 	const shortLink = async () => {
// 		const squeezeLink = await squeeze(link)
// 		setShortLink(squeezeLink)


// 		const statistic = {
// 			short: squeezeLink.short,
// 			count: sqeezeLink.count,
// 			target: squeezeLink.target
// 		}
// 		addStatistics(statistic)

// 	}

// 	return (

// 		<div>

// 			<div class="link">
// 				<input onChange="...setLink(e)..." />
// 				<button click="shortLink()">Сократить ссылку</button>
// 			</div>



// 			<talbe>

// 			{statistics && <td>...<tr>.... }

// 			</table>

// 		</div>

		

// 	)

// }