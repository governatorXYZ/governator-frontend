import type { NextPage } from 'next'
import {
  Container,
  Box,
} from '@chakra-ui/react'
import { StyledBox } from 'components/common'
import Head from 'next/head'
import { CommunityAdministratorBase, CommunityClientConfigBase, CommunityCreateDto } from 'governator-sdk';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import yup from 'yup';

const schema = yup.object({
  name: yup.string().required('Community name is required.'),
  administrators: yup.array<CommunityAdministratorBase>().required('At least one administrator is required.'),
  client_config: yup.mixed<CommunityClientConfigBase>().required('Client config is required.')
}).required();

const CreateCommunity: NextPage = () => {
  const {
    register,
    handleSubmit,
    control,
    clearErrors,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<CommunityCreateDto>({
    resolver: yupResolver(schema),
  })
  
  return (
      <Box bg='dark-2' minH='calc(100vh - 60px)'>
        <Head>
          <title>Goverator | Create Community</title>
        </Head>
        <StyledBox
          overflowX='hidden'
          color='gray.100'
        >
          <Container maxW='container.xl'>

          </Container>
        </StyledBox>
      </Box>
  )
}

export default CreateCommunity;
