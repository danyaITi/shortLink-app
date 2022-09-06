import { useEffect, useState } from "react";
import $api from "../api";
import { IStatistics } from "../models/authResp";

export const useStatistics = () => {
	const [statistics, setStatistics] = useState<IStatistics[]>([]);


	const fetchStatistics = async (offset: number, sort: string = "asc_short", withUpdate: boolean = false) => {
		const statistics = await $api.get<IStatistics[]>(`/statistics?order=${sort}&offset=${offset}&limit=20`);
		if(withUpdate){
			setStatistics([...statistics.data]);
		} else {
			setStatistics(old => [...old, ...statistics.data]);
		}
		return statistics.data.length;
	}


	const selectSort = (sortOrder: string) => {
		fetchStatistics(0, sortOrder,true)
	}


	return {
		statistics,
		fetchStatistics,
		selectSort
	}
}
