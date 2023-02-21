import useSWR, { KeyedMutator } from "swr";
import { pollFetcher } from "../constants/axios";

export type VoteData = {
    aggregate: Array<unknown>;
    votes: Array<unknown>;
};

export type UseVoteData = {
    data: VoteData;
    error: Error;
    mutate: KeyedMutator<VoteData>;
}

export const useVotesData = (pollId: string): UseVoteData => {
    const { data, mutate, error } = useSWR(`/vote/results/sum/${pollId}`, pollFetcher);
    return { data, mutate, error }
}

export const useTotalVotes = (pollId: string) => {
    const { data, mutate, error } = useSWR(`/vote/results/votes-per-user/count/${pollId}`, pollFetcher)
    return { data, mutate, error }
}