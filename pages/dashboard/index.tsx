import { Box, VStack, Image, Flex, Text, Grid, Spinner } from '@chakra-ui/react';
import { NextPageWithLayout } from 'pages/_app'
import { ReactElement, useEffect } from 'react'
import Layout from 'components/community/Layout'
import CommunityPageHeader from 'components/community/CommunityPageHeader'
import { useCommunities } from 'contexts/CommunitiesContext'
import CommunityPollLists from 'components/community/CommunityPollLists'
import { writableLoadableAtom } from 'atoms';
import { useAtom } from 'jotai';

const ServerSelect: NextPageWithLayout = () => {
  const { livePolls, closedPolls } = useCommunities();
  const [, refreshLoadable] = useAtom(writableLoadableAtom)
  useEffect(() => {
    refreshLoadable();
  },[refreshLoadable])

  return (
    <Flex direction='column'>
      <Box>
        <CommunityPageHeader name={"Your Timeline"} emoji={null}/>
      </Box>
      <CommunityPollLists livePolls={livePolls} closedPolls={closedPolls} />
    </Flex>
  )
}

ServerSelect.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout short={true}>
      {page}
    </Layout>)
}


export default ServerSelect
