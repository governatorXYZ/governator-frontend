import {governatorApiWithSessionCredentials} from "../constants/axios";
import {useAtom} from "jotai";
import {sessionAtom} from "../atoms";
import {useCallback, useEffect} from "react";
import { Session } from "interfaces";

export const useSession = (): Session => {

    const [session, setSession] = useAtom(sessionAtom);

    const getSession = useCallback(async () => {

        const sessionResponse = await governatorApiWithSessionCredentials.get(
            `/auth/session`
        )

        setSession(sessionResponse.data as Session);

    }, [setSession]);

    useEffect(() => {
        getSession()
    }, [getSession])

    return session;
}