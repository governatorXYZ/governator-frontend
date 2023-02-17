import useSWR from "swr";
import { pollFetcher } from "../constants/axios";

export type VoteData = {
    aggregate: Array<unknown>;
    votes: Array<unknown>;
};

export type UseVoteData = {
    data: VoteData;
    error: Error;
}

export const useVotesData = (pollId: string): UseVoteData => {
    const { data, error } = useSWR(`/vote/results/sum/${pollId}`, pollFetcher);
    return { data, error }
}

export const useTotalVotes = (pollId: string) => {
    const { data, error } = useSWR(`/vote/results/votes-per-user/count/${pollId}`, pollFetcher)
    return { data, error }
}