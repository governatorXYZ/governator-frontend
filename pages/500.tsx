import { Container, Grid, Box, Flex, Button, Text } from "@chakra-ui/react";
import SVGWall from "components/SVGWall";
import { motion } from "framer-motion";
import Head from "next/head";
import Link from "next/link";
import { AiOutlineTrophy } from "react-icons/ai";
import { FaDiscord, FaUserShield, FaEthereum } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";
import { MdLoop } from "react-icons/md";

export default function Custom500() {
  return (
    <>
      <Head>
        <title>Governator.xyz</title>
      </Head>
        <Container maxW='container.xl'>
          <Grid
            templateColumns='350px 1fr'
            columnGap='4rem'
            mx='auto'
            maxW='max-content'>
            <Box
              h='350px'
              w='350px'
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
                transition={{ duration: 2 }}>
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
                </motion.div>
              </motion.div>
            </Box>
            <Box>
              <Box>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 1.5, delay: 0.5 },
                  }}>
                </motion.div>
              </Box>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 1, delay: 0.75 },
                }}>
                <Flex gap='1rem' mt='4rem'>
                  <Button
                    colorScheme='purple'
                    leftIcon={<FaDiscord />}
                    isDisabled>
                    Add to Discord (soon)
                  </Button>
                </Flex>
              </motion.div>
            </Box>
          </Grid>
        </Container>
        <Box mt='10rem' mb='8rem'>
          <SVGWall />
          <Grid backgroundColor='black' placeItems='center' h='100px'>
            <Flex maxW='max-content' className='roboto-mono' pt='0.5rem'>
            </Flex>
          </Grid>
          <SVGWall />
        </Box>
        <Container maxW='container.xl' mb='12rem'>
          <Flex>
          </Flex>
          <Grid
            templateColumns='repeat(2, 450px)'
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
        <SVGWall />
        <Flex
          backgroundColor='black'
          h='240px'
          alignItems='center'
          justifyContent='space-between'
          p='40px'
          px='60px'>
          <Flex gap='8px'>
            <Link href='https://discord.com/invite/bankless'>
              <a>
                <Button
                  variant='ghost'
                  _hover={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
                  <FaDiscord fontSize='20px' />
                </Button>
              </a>
            </Link>
            <Link href='https://twitter.com/governatorxyz'>
              <a>
                <Button
                  variant='ghost'
                  _hover={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
                  <FiTwitter fontSize='20px' />
                </Button>
              </a>
            </Link>
          </Flex>
        </Flex>
    </>
  )
}