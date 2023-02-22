import type { NextPage } from 'next'
import {
  Box,
  Container,
} from '@chakra-ui/react'
import { StyledBox } from 'components/common'
import Head from 'next/head'

const EditCommunity: NextPage = () => {
  return (
      <Box bg='dark-2' minH='calc(100vh - 60px)' pt='4rem' pb='8rem'>
        <Head>
          <title>Goverator | Create Community</title>
        </Head>
        <StyledBox>
          <Container maxW='container.xl'>
            
          </Container>
        </StyledBox>
      </Box>
  )
}

export default EditCommunity
