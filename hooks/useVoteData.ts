import useSWR from "swr";
import {privateBaseFetcher} from "../constants/axios";

export const useVotesData = (pollId: string) => {
    const { data } = useSWR(`/vote/results/sum/${pollId}`, privateBaseFetcher)
    const votesData = data?.data ? data?.data : []
    return { votesData }
}