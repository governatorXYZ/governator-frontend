import Head from 'next/head'
import { Container, ListItem, Heading, List, Text, Box } from '@chakra-ui/react'
import { Footer, StyledBox } from 'components/common'

export default function Privacy(): JSX.Element {
  return (
    <>
      <Head>
        <title>Governator | Privacy</title>
      </Head>
      <StyledBox pt='6em' color='gray.100'>
        <Container minW='40ch' maxW='80ch' mb='6em'>
          <Heading as='h1' fontSize='1.5em' mb='16px'>
            Privacy Policy
          </Heading>
          <Text>
            This Privacy Policy applies to the Governator.xyz website and all
            related services provided by GovernatorXYZ.
          </Text>
          <Heading as='h2' fontSize='1.25em' mb='1em' mt='1.5em'>
            Information Collection and Use
          </Heading>
          <Text mb='12px'>
            We collect information from users in a variety of ways, including:
          </Text>
          <List listStyleType={'unset'} pl='1.5em' mb='12px'>
            <ListItem mb='4px'>
              Information provided by users when creating an account or using
              our service
            </ListItem>
            <ListItem mb='4px'>
              Information automatically collected when users access the website,
              such as IP{' '}
            </ListItem>
            addresses and browser type
            <ListItem mb='4px'>
              Information collected through the use of cookies and other
              technologies
            </ListItem>
          </List>
          <Text>
            We use this information to provide and improve our service, to
            personalize content, and to analyze usage.
          </Text>
          <Heading as='h2' fontSize='1.25em' mb='1em' mt='1.5em'>
            Sharing of Information
          </Heading>
          <Text>
            We will not share any personally identifiable information with third
            parties without your consent, except as required by law.
          </Text>
          <Heading as='h2' fontSize='1.25em' mb='1em' mt='1.5em'>
            Security
          </Heading>
          <Text>
            We take appropriate security measures to protect against
            unauthorized access to or unauthorized alteration, disclosure, or
            destruction of data.
          </Text>
          <Heading as='h2' fontSize='1.25em' mb='1em' mt='1.5em'>
            Changes to this Policy
          </Heading>
          <Text>
            We reserve the right to make changes to this Privacy Policy at any
            time. If we make any changes, we will update the &qout;last
            updated&qout; date at the top of this policy.
          </Text>
          <Heading as='h2' fontSize='1.25em' mb='1em' mt='1.5em'>
            Contact Us
          </Heading>
          <Text>
            If you have any questions about this Privacy Policy, please contact
            us at governatorxyz@protonmail.com.
          </Text>
        </Container>
        <Box overflowX={'hidden'}>
          <Footer />
        </Box>
      </StyledBox>
    </>
  )
}
