import { ReactElement } from 'react'
import Head from 'next/head'
import Layout from 'components/community/Layout'
import { NextPageWithLayout } from 'pages/_app'
import CommunityPageHeader from 'components/community/CommunityPageHeader'
import CommunityPollLists from 'components/community/CommunityPollLists'
import { useCommunities } from 'contexts/CommunitiesContext'

const Dashboard: NextPageWithLayout = () => {
  const {
    currentServer,
    livePolls,
    closedPolls,
  } = useCommunities();

  const serverImg = `https://cdn.discordapp.com/icons/${currentServer?.id}/${currentServer?.icon}.png`

  return (
      <>
        <Head>
          <title>Goverator | Server Polls</title>
        </Head>
        <CommunityPageHeader icon={serverImg} name={currentServer?.name} />
        <CommunityPollLists livePolls={livePolls} closedPolls={closedPolls} />
      </>
  )
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>)
}

export default Dashboard
