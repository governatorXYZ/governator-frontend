import {
  privateBaseFetcher,
} from 'constants/axios'
import { useAtom } from 'jotai'
import { strategiesAtom } from 'atoms'
import { useCallback, useEffect } from 'react'

const useStrategies = () => {

  const [strategies, setStrategies] = useAtom(strategiesAtom);

  const getStrategies = useCallback(async () => {

    const strategiesResponse = await privateBaseFetcher(
      `/strategies/find/all`
    )

    const sortedStrategies = (
      strategiesResponse?.data
    )
      ?.map((c: { _id: string, name: string, strategy_type: string }) => {
        return { value: c._id, label: c.name, strategy_type: c.strategy_type }
      })
      .sort((curr: { label: { toLowerCase: () => number } }, next: { label: { toLowerCase: () => number } }) =>
        curr.label.toLowerCase() < next.label.toLowerCase() ? -1 : 1
      )

    setStrategies(sortedStrategies);

  }, [setStrategies])


  useEffect(() => {
    getStrategies()
  }, [getStrategies])

  return { strategies }

}

export default useStrategies;