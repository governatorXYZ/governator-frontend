import { Container, Grid, Box, Flex, Button, Image, Heading } from "@chakra-ui/react";
import { Footer } from "components/common";
import Head from "next/head";
import { useRouter } from "next/router";



export default function Custom404() {
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
              >404</Heading>
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
                <Heading mb='2rem'>Moloch Chippi Is Angry That There Is No Page!</Heading>
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
          <Footer />
        </Box>
      </Flex>
    </>
  )
}