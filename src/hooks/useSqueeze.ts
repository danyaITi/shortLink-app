import $api from "../api"
import {IStatistics} from "../types/IStatistics";

export const useSqueeze = () => {

	const squeeze = async (link:string) => {
		return await $api.post<IStatistics>(`/squeeze?link=${link}`)
	}

	return {
		squeeze
	}
}
