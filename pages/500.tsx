import { Container, Grid, Box, Flex, Button, Image, Heading } from "@chakra-ui/react";
import SVGWall from "components/SVGWall";
import { motion } from "framer-motion";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaDiscord } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";


export default function Custom500() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Governator.xyz</title>
      </Head>
      <Flex
        bg="#29303a"
        direction='column'
        justify='space-between'
        h='calc(100vh - 60px)'
      >
        <Container maxW='container.xl'>
          <Grid
            my='4rem'
            templateColumns='1fr'
            columnGap='4rem'
            rowGap='2rem'
            mx='auto'
            maxW='max-content'
          >
            <Box
              color='whiteAlpha.900'
              alignSelf={{ base: 'center', md: 'start' }}
            >
              <Heading
                fontSize='6rem'
                textAlign={'center'}
              >500</Heading>
            </Box>
            <Box
              h='auto'
              gridRow={2}
              alignSelf={{ base: 'center', md: 'start' }}
              w='350px'
              border='1px solid'
              borderColor='transparent'
              borderRadius='10px'
              backgroundColor='white'
              margin='auto'
              pos='relative'
              overflow='hidden'>
                <Image
                  src='images/moloch-chippi.png'
                  alt='Moloch Chippi'
                />
            </Box>
            <Box
              gridRow={3}
              color='whiteAlpha.900'
              textAlign={'center'}
            >
                <Heading mb='2rem'>Moloch Chippi Is Angry That There Was A Server Error</Heading>
                <Button
                  colorScheme={'red'}
                  fontSize='2rem'
                  p={8}
                  onClick={() => {
                    router.push('/')
                  }}
                >Flee Moloch</Button>
            </Box>
          </Grid>
        </Container>
        <Box
          overflowX='hidden'
        >
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
        </Box>
      </Flex>
    </>
  )
}