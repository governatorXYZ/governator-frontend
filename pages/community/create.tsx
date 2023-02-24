import type { NextPage } from 'next'
import {
  FormErrorMessage,
  FormControl,
  Container,
  FormLabel,
  Heading,
  Button,
  HStack,
  Input,
  Flex,
  Box,
} from '@chakra-ui/react'
import { StyledBox } from 'components/common'
import Head from 'next/head'
import {
  CommunityAdministratorBase,
  CommunityClientConfigBase,
  CommunityCreateDto
} from 'governator-sdk';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useFieldArray,
  Controller,
  useForm,
} from 'react-hook-form';
import * as yup from 'yup';
import { useSession } from 'next-auth/react';
import { privateBaseAxios } from 'constants/axios';
import React from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';

const schema = yup.object({
  name: yup.string().required('Community name is required.'),
  administrators: yup.array<CommunityAdministratorBase>().required('At least one administrator is required.'),
  client_config: yup.mixed<CommunityClientConfigBase>().required('Client config is required.')
}).required();

const CreateCommunity: NextPage = () => {

  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: {
      errors,
      isSubmitting
    },
  } = useForm<CommunityCreateDto>({
    resolver: yupResolver(schema),
    defaultValues: {
      administrators: [
        {
          provider_id: (session?.user?.name ?? '') as string,
        }
      ],
    }
  });

  const {
    fields,
    append,
    remove
  } = useFieldArray({
    control,
    name: 'administrators'
  });

  if (session && session.user && session.user.name) {
    // setValue('administrators', [{ provider_id: session.user.name }])
    setValue('client_config', [{ provider_id: 'discord'}]);
  }

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log(data);
      const res = await privateBaseAxios.post('/community/create', data);
      console.log(res);
    } catch (e) {
      console.error(e);
    }
  });
  
  return (
      <Box bg='dark-2' minH='calc(100vh - 60px)'>
        <Head>
          <title>Goverator | Create Community</title>
        </Head>
        <Box
          overflowX='hidden'
          color='gray.100'
          minH='calc(100vh - 60px)'
          bg='dark-2'
        >
          <Container maxW='container.xl'>
            <Flex
              alignItems='center'
              direction='column'
              maxW='2xl'
              fontWeight='600'
              fontSize='2xl'
              bg='dark-1'
              p='2rem 3rem'
              mt='3rem'
              mx='auto'
            >
              <Heading
                mb='1em'
              >Create A Community</Heading>
              <FormControl
                isInvalid={!!errors.name}
                mb='2em'
              >
                <FormLabel>Name</FormLabel>
                <Input
                  {...register('name')}
                />
                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={!!errors.administrators}
                mb='2em'
              >
                <HStack
                  align={'center'}
                  mb='1em'
                >
                <FormLabel>Administrators</FormLabel>
                <Button
                    onClick={() => {
                      append({ provider_id: '' })
                    }}
                    variant='outline'
                    colorScheme={'green'}
                    size='sm'
                    fontSize='13px'
                    leftIcon={<FiPlus />}
                    fontWeight='400'
                    mr='8px'
                    disabled={fields.length > 8}
                  >
                    Add Administrator
                  </Button>
                <Button
                  onClick={() => {
                    remove(fields.length - 1);
                  }}
                  variant='outline'
                  colorScheme={'red'}
                  size='sm'
                  fontSize='13px'
                  leftIcon={<FiMinus />}
                  fontWeight='400'
                  mr='8px'
                  disabled={fields.length <= 1}
                >
                  Remove Administrator
                </Button>
                </HStack>
                { fields.map((field, index) => (<Input key={field.id} defaultValue={field.provider_id} />)) }
                <FormErrorMessage>{
                  errors.administrators && "Must provide at least one administrator."
                }</FormErrorMessage>
              </FormControl>
              <Button
                colorScheme='green'
                onClick={onSubmit}
                isLoading={isSubmitting}
                alignSelf='flex-end'
              >
                Create Community
              </Button>
            </Flex>
          </Container>
        </Box>
      </Box>
  )
}

export default CreateCommunity;
