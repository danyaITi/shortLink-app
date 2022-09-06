import { useEffect, useState } from "react";
import $api from "../api";
import { IStatistics } from "../models/authResp";

// interface ParamsType{
// 	selected:string,
// 	// offset:number,
// 	// limit:number
// }

export const useStatistics = () => {
	const [statistics, setStatistics] = useState<IStatistics[]>([]);


	const fetchStatistics = async (selected:string) => {
		// const {selected} = params
		// offset=${offset}&limit=${limit}&
		const statistics = await $api.get<IStatistics[]>(`/statistics?order=${selected}`)
		setStatistics(statistics.data);
	}



	const addStatistics = (statistic: IStatistics) => {
		setStatistics(old => [...old, statistic]);
	}


	return {
		statistics,
		addStatistics,
		fetchStatistics,
		setStatistics
	}
}