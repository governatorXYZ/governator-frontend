import {privateBaseAxios, privateBaseFetcher} from "../constants/axios";
import {useSession} from "next-auth/react";
import {useAtom} from "jotai";
import {governatorUserAtom, strategiesAtom} from "../atoms";
import {useCallback, useEffect} from "react";

export const useGovernatorUser = () => {

    const [governatorUser, setGovernatorUser] = useAtom(governatorUserAtom);
    const {data: session} = useSession();

    const getGovernatorUser = useCallback(async () => {

        const discordId = session?.discordId as string;
        const userResponse = await privateBaseFetcher(
            `/user/discord/${discordId}`
        )

        setGovernatorUser({userId: userResponse.data._id, discordId: discordId, discordUsername: session!.user!.name as string});

    }, [setGovernatorUser]);

    useEffect(() => {
        getGovernatorUser()
    }, [getGovernatorUser])

    return governatorUser;
}