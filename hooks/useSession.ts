import {privateBaseAxios, privateBaseFetcher, governatorApiAxios} from "../constants/axios";
import {useAtom} from "jotai";
import {sessionAtom} from "../atoms";
import {useCallback, useEffect} from "react";

export const useSession = () => {

    const [session, setSession] = useAtom(sessionAtom);

    const getSession = useCallback(async () => {

        const sessionResponse = await governatorApiAxios.get(
            `/auth/session`, { withCredentials: true }
        )

        setSession({session: sessionResponse.data});

    }, [setSession]);

    useEffect(() => {
        getSession()
    }, [getSession])

    return session;
}