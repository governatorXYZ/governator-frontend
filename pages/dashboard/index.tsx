import { Box, Flex } from '@chakra-ui/react'
import { NextPageWithLayout } from 'pages/_app'
import { ReactElement } from 'react'
import Layout from 'components/community/Layout'
import CommunityPageHeader from 'components/community/CommunityPageHeader'
import { useCommunities } from 'contexts/CommunitiesContext'
import CommunityPollLists from 'components/community/CommunityPollLists'

const ServerSelect: NextPageWithLayout = () => {
  const { livePolls, closedPolls } = useCommunities();



  return (
    <Flex direction='column'>
      <Box>
        <CommunityPageHeader name={"Communities"} />
      </Box>
      <CommunityPollLists livePolls={livePolls} closedPolls={closedPolls} />
    </Flex>
  )
}

ServerSelect.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>)
}


export default ServerSelect
