import type { NextPage } from 'next'
import {
  FormErrorMessage,
  FormControl,
  Container,
  FormLabel,
  Heading,
  Select,
  Button,
  chakra,
  HStack,
  Input,
  Image,
  Text,
  Flex,
  Box,
  useToast,
  Spinner,
  Link,
} from '@chakra-ui/react'
import Head from 'next/head'
import {
  CommunityAdministratorBase,
  CommunityClientConfigBase,
} from 'governator-sdk';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useFieldArray,
  useForm,
} from 'react-hook-form';
import * as yup from 'yup';
import { useSession } from 'next-auth/react';
import { discordAxios, privateBaseAxios, privateBaseFetcher } from 'constants/axios';
import React, { useCallback, useState, useEffect } from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';


const schema = yup.object({
  name: yup.string().required('Community name is required.'),
  administrators: yup
    .array<CommunityAdministratorBase>()
    .required('At least one administrator is required.'),
  client_config: yup
    .mixed<CommunityClientConfigBase>()
    .required('Client config is required.'),
  server: yup.mixed().required('Server is required.'),
  channel: yup.mixed(),
}).required();

const CreateCommunity: NextPage = () => {
  const { data: session } = useSession();
  const [servers, setServers] = useState<Array<any>>();
  const [noBot, setNoBot] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();

  useEffect(() => {
    discordAxios(session?.accessToken as string).get(
      '/users/@me/guilds'
    ).then((res) => {
      setServers(res.data);
    });
  }, [session?.accessToken]);

  const onChangeFetchChannels = async (event: any) => {
    try {
      setNoBot(false);
      setLoading(true);
      const ADMIN_PERM = 2147483647;

      if (event.target.value === '---') {
        setError('server', {
          type: 'required',
          message: 'Server is required',
        });
        return;
      }
      
      const server = servers?.find((server) => server.id === event.target.value);    
      if (server.permissions !== ADMIN_PERM) {
        setError('server', {
          type: 'validate',
          message: 'User is not an administrator of this server',
        });
        return;
      }
      
      const res = await privateBaseFetcher(
        `/client/discord/${event.target.value}/channels/${session?.discordId}`
      );
      return res.data;
    } catch(e) {
      setNoBot(true);
      setError('server', {
        type: 'validate',
        message: '',
      });
    } finally {
      setLoading(false);
    }
  };

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: {
      errors,
      isSubmitting
    },
    setError
  } = useForm<any>({
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
                isInvalid={!!errors.server}
                mb='2em'
                color='white'
              >
                <FormLabel>Server</FormLabel>
                { servers ? (<Select
                  {...register('server', {
                    onChange: onChangeFetchChannels
                  })}
                  isDisabled={servers.length === 0}
                >
                  <chakra.option
                      color='black'
                      value={undefined}
                  >
                      ---
                  </chakra.option>
                  {servers.map((server) => (
                    <chakra.option
                      key={server.id}
                      color='black'
                      value={server.id}
                    >
                      { server.name }
                    </chakra.option>
                  ))}
                </Select>) : (<Spinner size='md' color='white' />)}
                <FormErrorMessage>{errors.server?.message}</FormErrorMessage>
                { noBot && (<FormErrorMessage><Text>Bot does not appear to be installed on your server. Click <Link color='blue.500' href='#'>here</Link> to add Governator to your server.</Text></FormErrorMessage>)}
              </FormControl>
              {/* <FormControl
                mb='2em'
              >
                <FormLabel>Channels</FormLabel>
                <Select
                  {...register('channel')}
                >
                  {channels.map((channel, index) => (
                    <chakra.option key={index}>Option</chakra.option>
                  ))}
                </Select>
              </FormControl> */}
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
                { fields.map((field) => (<Input key={field.id} defaultValue={field.provider_id} />)) }
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
