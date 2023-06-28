import { governatorWCredentialsFetcher } from 'constants/axios'
import { DiscordUser, Session } from 'interfaces';
import { useState, useEffect } from 'react'
import utils from '../constants/utils'
import { writableLoadableAtom } from "atoms";
import { useAtom } from "jotai";

const useSession = () => {
  const [loadable] = useAtom(writableLoadableAtom);
  const [session, setSession] = useState<{
    id: string;
    user: DiscordUser;
  }>();

  useEffect(() => {
    if (utils.isAuthenticated(loadable)) {
      governatorWCredentialsFetcher<Session>('/auth/session')
        .then(res => res.data)
        .then((data) => {
        setSession({
          id: data.governatorId,
          user: data.oauthProfile,
        });
      }).catch((err) => {
        console.log(err)
      });
    } 
  }, [loadable])

  return { session }
}

export default useSession;
