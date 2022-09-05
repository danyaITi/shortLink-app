import { useState } from "react";
import $api from "../api";
import { IStatistics } from "../models/authResp";

export const useStatistics = () => {
	const [statistics, setStatistics] = useState<IStatistics[]>([]);

	const fetchStatistics = async () => {
		const statistics = await $api.get<IStatistics[]>('/statistics')
		setStatistics(statistics.data);
	}


	const addStatistics = (statistic: IStatistics) => {
		setStatistics(old => [...old, statistic]);
	}

	return {
		statistics,
		addStatistics,
		fetchStatistics
	}
}