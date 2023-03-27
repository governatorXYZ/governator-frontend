import type { NextPage } from 'next'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { AddIcon } from '@chakra-ui/icons'
import {
  Container,
  Spinner,
  Heading,
  Button,
  VStack,
  HStack,
  Image,
  Grid,
  Text,
  Flex,
  Box,
} from '@chakra-ui/react'
import Govcrumb from 'components/BreadCrumb'
import useServers from 'hooks/useServers'
import { FiBarChart } from 'react-icons/fi'
import DataTable from 'components/Datatable'
import SearchBox from 'components/SearchBox'
import * as luxon from 'luxon'
import DeletePoll from 'components/polls/DeletePoll'
import useSWR from 'swr'
import { privateBaseFetcher } from 'constants/axios'
import { useGovernatorUser } from 'hooks/useGovernatorUser'
import useServer from 'hooks/useServer'
import { Poll, RenderedPoll } from 'interfaces'
import { useState, useEffect, ReactNode, ReactElement } from 'react'
import Head from 'next/head'
import Layout from 'components/community/Layout'
import { NextPageWithLayout } from 'pages/_app'
import CommunityPageHeader from 'components/community/CommunityPageHeader'

const Dashboard: NextPageWithLayout = () => {
  const router = useRouter()
  const { loading, currentServer } = useServers()
  const { channels, loading: isLoadingChannels } = useServer()
  const governatorUser = useGovernatorUser()

  const serverImg = `https://cdn.discordapp.com/icons/${currentServer?.id}/${currentServer?.icon}.png`

  return (
      <>
        <Head>
          <title>Goverator | Server Polls</title>
        </Head>
        <CommunityPageHeader icon={serverImg} name={currentServer?.name} />
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
