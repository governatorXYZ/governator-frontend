import type { NextPage } from 'next'
import Head from 'next/head'
import {
  Box,
  Container,
  Text,
  Grid,
  Image,
  Button,
  Flex,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import SVGWall from 'components/SVGWall'
import {
  FaChartBar,
  FaDiscord,
  FaSignInAlt,
  FaUserShield,
  FaEthereum,
} from 'react-icons/fa'
import { AiOutlineTrophy } from 'react-icons/ai'
import { MdLoop } from 'react-icons/md'

import { useEffect, useState } from 'react'
import { sample } from 'lodash'
import { useRouter } from 'next/router'
import { Footer, StyledBox } from 'components/common'
import { writableLoadableAtom } from 'atoms'
import { useAtom } from 'jotai'
import utils from '../constants/utils'

const votes = [
  'Pineapple on pizza? 🍍 or 👎',
  '🐶 or 🐱',
  'Approve this proposal? 👍 or 👎',
  'Get to tha choppah? ✅ or ❌',
]

const Quote: React.FC = () => {
  const [sentence, setSentence] = useState(votes[0])

  const tick = () => {
    setSentence(sample(votes) as string)
  }

  useEffect(() => {
    const timerID = setInterval(() => tick(), 5000)
    return () => {
      clearInterval(timerID)
    }
  }, [])

  return <Box>&quot;{sentence}&quot;</Box>
}

const HeroButton = () => {
  const [loadable] = useAtom(writableLoadableAtom)
  const router = useRouter()

  return utils.isAuthenticated(loadable) ? (
    <Button
      color='gray.700'
      leftIcon={<FaChartBar />}
      onClick={() => router.push('/dashboard')}>
      Dashboard
    </Button>
  ) : (
    <Button
      color='gray.700'
      leftIcon={<FaSignInAlt />}
      onClick={() => ''}>
      Login
    </Button>
  )
}

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Governator.xyz</title>
      </Head>
      <StyledBox
        minH='calc(100vh - 60px)'
        pt='8rem'
        overflowX='hidden'
        color='gray.100'
      >
        <Container maxW='container.xl'>
          <Grid
            templateColumns={{ base: '1fr', lg: '350px 1fr' }}
            columnGap='4rem'
            rowGap={{
              base: '4rem',
              lg: '0'
            }}
            mx='auto'
            maxW='max-content'
            gridAutoFlow={{
              base: 'row',
            }}>
            <Box
              w={{
                base: 'calc(100vw - 2rem)',
              }}
              maxW='350px'
              maxH='350px'
              border='1px solid'
              borderColor='transparent'
              borderRadius='10px'
              backgroundColor='white'
              pos='relative'
              overflow='hidden'>
              <motion.div
                initial={{
                  position: 'relative',
                }}
                animate={{
                  x: [-200, -5, -10],
                  opacity: [0.25, 1, 1],
                }}
                transition={{ duration: 4 }}>
                <Image
                  src='./images/gov-bot.jpeg'
                  alt='gov-bot'
                  border='1px solid'
                  borderColor='transparent'
                  borderRadius='10px'
                />
                <motion.div
                  className='roboto-mono'
                  initial={{
                    zIndex: 2,
                    position: 'absolute',
                    top: 35,
                    width: '360px',
                    display: 'flex',
                    alignItems: 'center',
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  transition={{
                    delay: 2,
                  }}>
                  <Text
                    as='span'
                    display='block'
                    color='gray.800'
                    fontSize='sm'
                    mx='auto'>
                    <Quote />
                  </Text>
                </motion.div>
              </motion.div>
            </Box>
            <Box>
              <Box
                w={{
                  base: 'calc(100vw - 2rem)',
                }}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 1.5, delay: 0.5 },
                  }}>
                  <Text
                    as='span'
                    fontSize={'4xl'}
                    display='block'
                    className='roboto-mono'
                    maxW='30ch'>
                    Token Voting in Discord
                  </Text>

                  <Text
                    as='p'
                    mt='1rem'
                    fontSize='lg'
                  >
                    Easy to use, token-enabled, shielded polls right in your
                    server.
                  </Text>
                </motion.div>
              </Box>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 1, delay: 0.75 },
                }}>
                <Flex
                  direction={{ base: 'column', md: 'row' }}
                  gap='1rem'
                  mt='4rem'
                >
                  <Button
                    colorScheme='purple'
                    leftIcon={<FaDiscord />}
                    isDisabled>
                    Add to Discord (soon)
                  </Button>

                  {<HeroButton />}
                </Flex>
              </motion.div>
            </Box>
          </Grid>
        </Container>
        <Box mt='10rem' mb='8rem'>
          <SVGWall />
          <Grid backgroundColor='black' placeItems='center' h='100px'>
            <Flex
              direction={{
                base: 'column',
                md: 'row',
              }}
              maxW='max-content'
              className='roboto-mono'
              pt='0.5rem'
            >
              <Text as='span' display='block' mt='-1px' mr='6px'>
                Built in the forges of
              </Text>
              <Image src='./images/bankless-dao.png' alt='BanklessDAO' />
            </Flex>
          </Grid>
          <SVGWall />
        </Box>
        <Container maxW='container.xl' mb='12rem'>
          <Flex>
            <Text
              as='span'
              className='roboto-mono'
              display='block'
              mx='auto'
              fontSize='3xl'
              borderBottom='1px solid'
              borderColor='gray.400'>
              What does it do?
            </Text>
          </Flex>
          <Grid
            templateColumns={{
              base: '1fr',
              md: 'repeat(2, 450px)'
            }}
            gap='4rem'
            maxW='max-content'
            mx='auto'
            mt='6rem'>
            <Flex
              direction='column'
              alignItems='center'
              justifyItems='center'
              backgroundColor='gray.800'
              p='2rem'
              borderRadius='6px'>
              <Box color='gray.300'>
                <FaUserShield fontSize='60px' />
              </Box>
              <Text
                as='span'
                display='block'
                mt='1rem'
                maxW='30ch'
                textAlign='center'>
                Post shielded, role-gated polls to Discord.
              </Text>
            </Flex>
            <Flex
              direction='column'
              alignItems='center'
              justifyItems='center'
              backgroundColor='gray.800'
              p='2rem'
              borderRadius='6px'>
              <Box color='gray.300'>
                <FaEthereum fontSize='60px' />
              </Box>
              <Text
                as='span'
                display='block'
                mt='0.5rem'
                maxW='40ch'
                textAlign='center'>
                Vote with on-chain balances in a single click.
              </Text>
            </Flex>
            <Flex
              direction='column'
              alignItems='center'
              justifyItems='center'
              backgroundColor='gray.800'
              p='2rem'
              borderRadius='6px'>
              <Box color='gray.300'>
                <AiOutlineTrophy fontSize='60px' />
              </Box>
              <Text
                as='span'
                display='block'
                mt='0.5rem'
                maxW='40ch'
                textAlign='center'>
                Tallies, calculates, and announces the outcome for everyone
                transparently - exactly on time.
              </Text>
            </Flex>
            <Flex
              direction='column'
              alignItems='center'
              justifyItems='center'
              backgroundColor='gray.800'
              p='2rem'
              borderRadius='6px'>
              <Box color='gray.300'>
                <MdLoop fontSize='60px' />
              </Box>
              <Text
                as='span'
                display='block'
                mt='0.5rem'
                maxW='40ch'
                textAlign='center'>
                Improve voter turnout and authentic voting!
              </Text>
            </Flex>
          </Grid>
        </Container>
        <Footer />
      </StyledBox>
    </>
  )
}

export default Home
