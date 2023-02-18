import { AxiosResponse } from "axios";
import useSWR from "swr";
import {privateBaseFetcher} from "../constants/axios";

export const useVotesData = (pollId: string) => {
    const { data } = useSWR<AxiosResponse<{
            data: { 
                aggregate: Array<unknown>;
                votes: Array<unknown>;
            }
        }
    >>(`/vote/results/sum/${pollId}`, privateBaseFetcher)
    const votesData = data?.data ? data?.data : []
    return { votesData }
}

export const useTotalVotes = (pollId: string) => {
    const { data } = useSWR<AxiosResponse<{
        data: string;
    }>>(`/vote/results/votes-per-user/count/${pollId}`, privateBaseFetcher)
    const totalVotes = data?.data ? data?.data : '0'
    return { totalVotes }
}