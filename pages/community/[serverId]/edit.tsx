import type { NextPage } from 'next';
import { Box, Container } from '@chakra-ui/react';
import { StyledBox } from 'components/common';
import Head from 'next/head';
import { useSession } from 'next-auth/react';
import useServers from 'hooks/useServers';
import useServer from 'hooks/useServer';

const EditCommunity: NextPage = () => {
  const { data: session } = useSession();
  const { channels, loading: isLoadingChannels } = useServer();

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
